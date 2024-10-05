import { RESTDataSource } from '@apollo/datasource-rest'
import 'dotenv/config'
import {
  BVReview,
  BVReviewsResponse,
  ProductReview,
  ProductReviewMedia,
  ProductReviewsResponse,
  ProductReviewsSnapshot,
  ReviewsFilters,
  ReviewsRefinement,
} from './types'
import { productReview } from './normalizers'

const REVIEWS_PAGE_SIZE = 10

enum CONTENT_TYPE {
  Photo = 'photo',
  Video = 'video',
}

enum FEEDBACK_TYPE {
  Helpfulness = 'helpfulness',
  Inappropriate = 'inappropriate',
}

export class ReviewsApi extends RESTDataSource {
  override baseURL = process.env.BAZAARVOICE_API_URL
  private apiVersion = process.env.BAZAARVOICE_API_VERSION
  private apiKey = process.env.BAZAARVOICE_API_KEY

  async parseFilters(queryString: string): Promise<Record<string, string>[]> {
    const filters: Record<string, string>[] = []

    const queryParams = queryString.split(',')
    queryParams.forEach(param => {
      const colonIndex = param.indexOf(':')
      const filterKey = param.slice(0, colonIndex)
      const filterValue = param.slice(colonIndex + 1)

      const filter: Record<string, string> = {}
      filter[filterKey] = filterValue
      filters.push(filter)
    })

    return filters
  }

  private getUrl(
    endpoint: string,
    additionalParams: Record<string, string>,
    filters: ReviewsFilters = []
  ) {
    const params: URLSearchParams = new URLSearchParams(additionalParams)

    if (this.apiKey) {
      params.append('apiKey', this.apiKey)
    }

    if (this.apiVersion) {
      params.append('apiVersion', this.apiVersion)
    }

    filters.forEach(filter =>
      Object.entries(filter).forEach(([key, value]) =>
        params.append('filter', `${key}:${value}`)
      )
    )

    return `data/${endpoint}.json?${params.toString()}`
  }

  /**
   * Fetches product reviews for a given product
   * @param {string} productId - The product ID
   * @param {ReviewsRefinement} refinements - The refinements object
   **/
  public async fetchProductReviews(
    productId: string,
    refinements: ReviewsRefinement = {}
  ): Promise<ProductReviewsResponse> {
    const params: Record<string, string> = {
      include: 'Products',
      stats: 'Reviews',
      secondaryRatingStats: 'true',
    }
    const filters: ReviewsFilters = [
      {
        ProductId: productId,
      },
    ]

    if (refinements?.page !== undefined) {
      params.limit = REVIEWS_PAGE_SIZE.toString()
      params.offset = ((refinements.page - 1) * REVIEWS_PAGE_SIZE).toString()
    }

    const sortType = refinements?.sort?.type ?? 'SubmissionTime'
    const sortDirection = refinements?.sort?.direction ?? 'desc'

    params.sort = `${sortType}:${sortDirection}`

    if (refinements?.filter) {
      const refinementFilters = await this.parseFilters(refinements.filter)
      filters.push(...refinementFilters)
    }

    if (refinements?.searchTerm) {
      params.search = refinements.searchTerm
    }

    const url = this.getUrl('reviews', params, filters)
    const data = await this.get<BVReviewsResponse>(url)

    const productStats = data.Includes?.Products?.[productId]
    let snapshot: ProductReviewsSnapshot = {}

    if (productStats) {
      snapshot.totalReviewCount = productStats.TotalReviewCount

      const reviewStatistics = productStats?.ReviewStatistics
      if (reviewStatistics) {
        snapshot = {
          ...snapshot,
          ...reviewStatistics,
        }
      }
    }

    return {
      totalResults: data.TotalResults,
      limit: data.Limit,
      offset: data.Offset,
      snapshot: snapshot,
      reviews: data.Results.map(productReview),
    }
  }

  public async fetchProductReviewsMedia(productId: string): Promise<{
    media: ProductReviewMedia[]
    reviews: Record<string, ProductReview>
  }> {
    const params = {
      secondaryRatingStats: 'true',
      sort: 'SubmissionTime:desc',
      limit: String(50),
    }
    const filters = [
      {
        ProductId: productId,
      },
      {
        HasMedia: true,
      },
    ]

    const url = this.getUrl('reviews', params, filters)
    const data = await this.get(url)

    return {
      media: data.Results.reduce((acc: ProductReviewMedia[], review: BVReview) => {
        const reviewMedia: ProductReviewMedia[] = []

        if (review.Videos) {
          for (const video of review.Videos) {
            reviewMedia.push({
              type: 'video',
              thumbnailUrl: video.VideoThumbnailUrl,
              reviewId: review.Id,
            })
          }
        }

        if (review.Photos) {
          for (const photo of review.Photos) {
            reviewMedia.push({
              type: 'photo',
              thumbnailUrl: photo.Sizes.thumbnail.Url,
              reviewId: review.Id,
            })
          }
        }

        return acc.concat(reviewMedia)
      }, []),
      reviews: data.Results.reduce(
        (acc: Record<string, ProductReview>, review: BVReview) => {
          acc[review.Id] = productReview(review)
          return acc
        },
        {}
      ),
    }
  }

  public async fetchProductStats(productId: string) {
    const params = {
      stats: 'Reviews',
    }
    const filters = [
      {
        ProductId: productId,
      },
    ]

    const url = this.getUrl('statistics', params, filters)
    const data = await this.get(url)

    if (!data.Results) {
      // throw new DataNotFoundException()
    }

    const {
      ProductStatistics: {
        ProductId,
        ReviewStatistics: { AverageOverallRating, TotalReviewCount, OverallRatingRange },
      },
    } = data.Results[0]

    return {
      productId: ProductId,
      reviewStatistics: {
        averageOverallRating: AverageOverallRating,
        totalReviewCount: TotalReviewCount,
        overallRatingRange: OverallRatingRange,
      },
    }
  }

  public async postProductReview(productId: string, review: ProductReview) {}

  public async submitFeedback(reviewId: string, type: FEEDBACK_TYPE, value?: string) {
    const params: Record<string, string> = {
      contentType: 'review',
      contentId: reviewId,
      feedbackType: type,
    }

    if (value) {
      params.vote = value
    }

    const url = this.getUrl('submitfeedback', params)
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const data = await this.post(url, { headers })

    if (data.Errors) {
      // TODO
      // throw new RemoteServerException(data.Errors[0].Message)
    }
  }

  public async postReviewFeedback(reviewId: string, feedback: string) {
    return this.submitFeedback(reviewId, FEEDBACK_TYPE.Helpfulness, feedback)
  }

  public async reportReview(reviewId: string) {
    return this.submitFeedback(reviewId, FEEDBACK_TYPE.Inappropriate)
  }

  public async uploadContent(type: string, content: string | Blob, name = '') {
    const formData = new FormData()
    if (this.apiKey) {
      formData.append('passkey', this.apiKey)
    }
    if (this.apiVersion) {
      formData.append('apiVersion', this.apiVersion)
    }
    formData.append('contenttype', 'review')
    formData.append(type, content, name)
    return this.post('submitcontent.json', { body: formData })
  }

  public async uploadPhoto(photo: Blob) {
    return this.uploadContent(
      CONTENT_TYPE.Photo,
      photo,
      'name' in photo && typeof photo.name === 'string' ? photo.name : ''
    )
  }

  public async uploadVideo(video: Blob) {
    return this.uploadContent(
      CONTENT_TYPE.Video,
      video,
      'name' in video && typeof video.name === 'string' ? video.name : ''
    )
  }
}
