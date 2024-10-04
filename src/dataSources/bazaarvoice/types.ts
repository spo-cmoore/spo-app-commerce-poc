import { Maybe } from '../../util/typeUtil'

export interface ReviewsRefinement {
  page?: number
  sort?: {
    type: 'Relevency' | 'Rating' | 'Helpfulness' | 'SubmissionTime'
    direction: 'asc' | 'desc'
  }
  /**
   * The filter string | ie: 'SubmissionTime:lt:1257746400', 'Rating:lte:3,HasPhotos:eq:true'
   */
  filter?: string
  searchTerm?: string
}

// TODO
export type ReviewsFilters = { [key: string]: string | number | boolean | undefined }[]

export interface BVSecondaryRating {
  Id: string
  AverageRating: number
  MaxLabel: Maybe<number>
  MinLabel: Maybe<number>
  ValueRange: number
  DisplayType: string
  Label: string
}

export interface BVReviewStatistics {
  TotalReviewCount: number
  RecommendedCount: number
  NotRecommendedCount: number
  HelpfulVoteCount: number
  ContextDataDistributionOrder: string[]
  ContextDataDistribution: {
    [key: string]: {
      Id: string
      Values: { Count: number; Value: string; ValueLabel: string }[]
      Label: string
    }
  }
  RatingsOnlyReviewCount: number
  FirstSubmissionTime: string
  LastSubmissionTime: string
  NotHelpfulVoteCount: number
  RatingDistribution: { RatingValue: number; Count: number }[]
  AverageOverallRating: number
  FeaturedReviewCount: number
  SecondaryRatingsAveragesOrder: string[]
  SecondaryRatingsAverages: {
    [key: string]: BVSecondaryRating
  }
  OverallRatingRange: number
  TagDistribution: {
    [key: string]: unknown // TODO
  }
  TagDistributionOrder: string[]
}

export interface BVReview {
  Id: string
  CID: string
  SourceClient: string
  LastModeratedTime: string
  LastModificationTime: string
  ProductId: string
  CampaignId: string
  UserLocation: string
  AuthorId: string
  ContentLocale: string
  IsFeatured: boolean
  TotalInappropriateFeedbackCount: number
  TotalClientResponseCount: number
  TotalCommentCount: number
  Rating: number
  IsRatingsOnly: boolean
  IsRecommended: boolean
  TotalFeedbackCount: number
  TotalNegativeFeedbackCount: number
  TotalPositiveFeedbackCount: number
  ModerationStatus: string
  SubmissionId: string
  SubmissionTime: string
  ReviewText: string
  Title: string
  UserNickname: string
  UserEmailAddress: string
  // TODO
  // Badges: {}
  // Pros: null
  SecondaryRatingsOrder: string[]
  // AdditionalFields: {},
  // CommentIds: [],
  // InappropriateFeedbackList: [],
  // BadgesOrder: [],
  // ProductRecommendationIds: [],
  SecondaryRatings: { [key: string]: BVSecondaryRating }
  // Helpfulness: null,
  IsSyndicated: boolean
  // ContextDataValues: {},
  Photos: BVPhotoResponse[]
  // TagDimensions: {},
  Videos: BVVideoResponse[]
  // OriginalProductName: null,
  // TagDimensionsOrder: [],
  // ContextDataValuesOrder: [],
  // ClientResponses: [],
  // Cons: null,
  RatingRange: number
  // AdditionalFieldsOrder: []
}

export interface BVProduct {
  // TODO which fields here do we actually use
  Id: string
  CategoryId: string
  Active: boolean
  Disabled: boolean
  // "ProductPageUrl": null,
  // "Brand": {},
  // "Attributes": {},
  // "QuestionIds": [],
  // "ISBNs": [],
  // "UPCs": [],
  // "Name": null,
  ReviewIds: string[]
  // "FamilyIds": [],
  // "AttributesOrder": [],
  // "StoryIds": [],
  // "EANs": [],
  // "ManufacturerPartNumbers": [],
  // "Description": null,
  // "ImageUrl": null,
  // "ModelNumbers": [],
  // "BrandExternalId": null,
  ReviewStatistics: BVReviewStatistics
  TotalReviewCount: number
}

export interface BVReviewsResponse {
  Limit: number
  Offset: number
  TotalResults: number
  Locale: string
  Results: BVReview[]
  Includes: {
    Products: {
      [id: string]: BVProduct
    }
  }
}

export type ProductReviewsSnapshot = Partial<BVReviewStatistics> & {
  totalReviewCount?: number
}

export interface BVVideoResponse {
  VideoId: string
  VideoThumbnailUrl: string
  Caption: string
  VideoUrl: string
}

export interface BVPhotoResponse {
  Id: string
  Sizes: { normal: { Id: string; Url: string }; thumbnail: { Id: string; Url: string } }
}

export interface ProductReview {
  reviewId: string
  userNickname: string
  rating: number
  ratingRange: number
  secondaryRatingsAveragesOrder: string[]
  secondaryRatings: { [key: string]: unknown }
  title: string
  submissionTime: string // Or converted to Date?
  reviewText: string
  isRecommended: boolean
  videos: BVVideoResponse[]
  photos: BVPhotoResponse[]
  totalPositiveFeedbackCount: number
  totalNegativeFeedbackCount: number
  productId: string
}

export interface ProductReviewMedia {
  type: 'photo' | 'video'
  thumbnailUrl: string
  reviewId: string
}

export interface ProductReviewsResponse {
  totalResults: number
  limit: number
  offset: number
  snapshot: ProductReviewsSnapshot
  reviews: ProductReview[]
}
