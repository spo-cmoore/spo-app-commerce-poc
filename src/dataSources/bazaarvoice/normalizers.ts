import { BVReview, ProductReview } from './types'

export function productReview(review: BVReview): ProductReview {
  return {
    reviewId: review.Id,
    userNickname: review.UserNickname,
    rating: review.Rating,
    ratingRange: review.RatingRange,
    secondaryRatingsAveragesOrder: review.SecondaryRatingsOrder,
    secondaryRatings: review.SecondaryRatings,
    title: review.Title,
    submissionTime: review.SubmissionTime,
    reviewText: review.ReviewText,
    isRecommended: review.IsRecommended,
    videos: review.Videos,
    photos: review.Photos,
    totalPositiveFeedbackCount: review.TotalPositiveFeedbackCount,
    totalNegativeFeedbackCount: review.TotalNegativeFeedbackCount,
    productId: review.ProductId,
  }
}
