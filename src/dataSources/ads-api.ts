import { RESTDataSource } from '@apollo/datasource-rest'
import 'dotenv/config'

export const MiraklPageType = {
  CART: 'cart',
  CHECKOUT: 'cart/checkout',
  COLLECTION: 'collection',
  HOME: 'home',
  PRODUCT: 'product',
  SEARCH: 'shop',
  SEARCH_EMPTY: `shop/empty`,
}

export enum MiraklPageId {
  CART = 1600,
  CHECKOUT = 2400,
  COLLECTION = 1400,
  HOME = 1000,
  PRODUCT = 1200,
  SEARCH = 2000,
  SEARCH_EMPTY = 3400,
}

export const MiraklScreenToPageIdMap = {
  [MiraklPageType.CART]: MiraklPageId.CART,
  [MiraklPageType.CHECKOUT]: MiraklPageId.CHECKOUT,
  [MiraklPageType.COLLECTION]: MiraklPageId.COLLECTION,
  [MiraklPageType.HOME]: MiraklPageId.HOME,
  [MiraklPageType.PRODUCT]: MiraklPageId.PRODUCT,
  [MiraklPageType.SEARCH]: MiraklPageId.SEARCH,
  [MiraklPageType.SEARCH_EMPTY]: MiraklPageId.SEARCH_EMPTY,
}

export interface MiraklAdsFetchResponse {
  value: any[]
}

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
