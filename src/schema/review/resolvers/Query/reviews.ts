import type { QueryResolvers } from '../../../types.generated'

export const reviews: NonNullable<QueryResolvers['reviews']> = async (
  _parent,
  _arg,
  _ctx
) => {
  const review = await _ctx.dataSources.reviewsApi.getReview('1')
  return [`${review.__typename} ${review.id}`]
}
