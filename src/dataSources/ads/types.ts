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
