import { RESTDataSource } from '@apollo/datasource-rest'
import 'dotenv/config'
import { MiraklAdsFetchResponse, MiraklPageType, MiraklScreenToPageIdMap } from './types'

export class AdsApi extends RESTDataSource {
  override baseURL = process.env.ADS_API_URL
  subscriptionKey = process.env.ADS_API_KEY

  async getAds(handle = '', page: string = MiraklPageType.SEARCH, numProducts?: number) {
    if (page === MiraklPageType.SEARCH && numProducts === 0) {
      page = MiraklPageType.SEARCH_EMPTY
    }

    const pageId = MiraklScreenToPageIdMap[page]?.toString()

    return this.get<MiraklAdsFetchResponse>('/SPO-Prod/ShopPoMiraklAdsFetch', {
      params: {
        'subscription-key': this.subscriptionKey,
        customerId: '',
        handle,
        pageId,
      },
    })
  }
}
