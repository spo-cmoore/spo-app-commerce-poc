import { RESTDataSource } from '@apollo/datasource-rest'
import { PartnerType } from '.'
import { getCustomerResId } from '../../util/shopifyResource'
import { assertFetchLoyaltyResponse } from './validate-response'

export class LoyaltyApi extends RESTDataSource {
  override baseURL = process.env.PARTNER_API_URL
  private headers = process.env.PARTNER_API_KEY
    ? {
        'Ocp-Apim-Subscription-Key': process.env.PARTNER_API_KEY,
      }
    : undefined

  public async fetchCustomerLoyalty(
    customerId: string
  ): Promise<PartnerType.CustomerLoyaltyResponse> {
    const [userId] = getCustomerResId(customerId)
    const response = await this.get(`/partner/users/${userId}/loyalty`, {
      headers: this.headers,
    })
    assertFetchLoyaltyResponse(response)
    return response
  }
}
