import { RESTDataSource } from '@apollo/datasource-rest'
import type { PartnerType } from '.'
import { getCustomerResId } from '../../util/shopifyResource'
import { assertFetchPushSubscriptionResponse } from './validate-response'

export class NotificationsApi extends RESTDataSource {
  override baseURL = process.env.PARTNER_API_URL
  private headers = process.env.PARTNER_API_KEY
    ? {
        'Ocp-Apim-Subscription-Key': process.env.PARTNER_API_KEY,
      }
    : undefined

  public async fetchPushSubscriptions(
    userGid: string
  ): Promise<PartnerType.PushSubscription[]> {
    const [userId] = getCustomerResId(userGid)

    const response = await this.get(
      `partner/customers/push-notifications/${userId}?idType=user`,
      { headers: this.headers }
    )
    assertFetchPushSubscriptionResponse(response)
    return response
  }

  public async fetchEmailPreferences(
    email: string
  ): Promise<PartnerType.CommunicationPreferences> {
    const response = await this.get('/partner/customers/communication-preferences', {
      headers: this.headers,
      params: {
        email,
      },
    })
    // TODO Assert response

    return response
  }
}
