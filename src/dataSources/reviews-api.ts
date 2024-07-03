import { RESTDataSource } from '@apollo/datasource-rest'
import 'dotenv/config'
import { Review } from '../schema/types.generated'

export class ReviewsApi extends RESTDataSource {
  override baseURL = process.env.REVIEWS_API_URL

  async getReview(id: string): Promise<Review> {
    return { id }
  }
}
