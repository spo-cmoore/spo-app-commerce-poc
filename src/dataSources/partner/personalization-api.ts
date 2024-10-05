import { RESTDataSource } from '@apollo/datasource-rest'
import 'dotenv/config'
import { getCustomerResId } from '../../util/shopifyResource'

export class PersonalizationApi extends RESTDataSource {
  override baseURL = process.env.PARTNER_API_URL
  private headers = process.env.PARTNER_API_KEY
    ? {
        'Ocp-Apim-Subscription-Key': process.env.PARTNER_API_KEY,
      }
    : undefined

  public async fetchStylePreferences(userGid: string): Promise<void> {
    const [userId] = getCustomerResId(userGid)
    const response = await this.get(
      `/personalization/v1/users/${userId}/style-preferences`,
      {
        headers: this.headers,
      }
    )
    // TODO Assert type

    return response
  }
}
