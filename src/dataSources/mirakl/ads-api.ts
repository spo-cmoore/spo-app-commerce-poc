import { RESTDataSource } from '@apollo/datasource-rest'
import 'dotenv/config'
import { AdsFetchResponse, MiraklPageType, MiraklScreenToPageIdMap } from './types'

export class AdsApi extends RESTDataSource {
  override baseURL = process.env.MIRAKL_API_URL
  subscriptionKey = process.env.MIRAKL_API_KEY

  async getAds(handle = '', page: string = MiraklPageType.SEARCH, numProducts?: number) {
    if (page === MiraklPageType.SEARCH && numProducts === 0) {
      page = MiraklPageType.SEARCH_EMPTY
    }

    const pageId = MiraklScreenToPageIdMap[page]?.toString()

    return this.get<AdsFetchResponse>('/SPO-Prod/ShopPoMiraklAdsFetch', {
      params: {
        'subscription-key': this.subscriptionKey,
        customerId: '',
        handle,
        pageId,
      },
    })
  }
}
