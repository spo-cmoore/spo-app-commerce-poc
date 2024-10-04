export enum FavoriteCommand {
  GET = 'get',
  ADD = 'add',
  REMOVE = 'remove',
}

export enum FavoriteType {
  PRODUCT = 'product',
  BRAND = 'brand',
  SAVE_FOR_LATER = 'saveForLater',
}

export enum FavoriteSourceLocation {
  PDP = 'pdp',
  PIP = 'plp',
  Storefront = 'storefront',
  BrandDirectory = 'brandDirectory',
  DiscoverFeed = 'discoverFeed',
  Cart = 'cart',
}

export interface BaseFavoritePayload {
  command: FavoriteCommand
  type: FavoriteType
  customerId: string
  id?: string
}

export type AddFavoritePayload = BaseFavoritePayload & {
  location: FavoriteSourceLocation
  command: FavoriteCommand.ADD
  id: string
  title?: string
  brand?: string
  handle?: string
  productType?: string
}

export type RemoveFavoritePayload = BaseFavoritePayload & {
  command: FavoriteCommand.REMOVE
  type: FavoriteType.BRAND | FavoriteType.PRODUCT
  id: string
}

export type FetchFavoritesPayload = BaseFavoritePayload & {
  command: FavoriteCommand.GET
  type: FavoriteType.BRAND | FavoriteType.PRODUCT | FavoriteType.SAVE_FOR_LATER
}

export type SaveForLaterPayload = BaseFavoritePayload & {
  productId: string
  variantId: string
}

export type FavoritePayload =
  | AddFavoritePayload
  | FetchFavoritesPayload
  | RemoveFavoritePayload
  | SaveForLaterPayload

export interface FavoriteProductResponse {
  productId: string
  title: string
  timestamp: string
  handle?: string
  brand?: string
  productType?: string
}

export interface FavoriteBrandResponse {
  brandId: string
  originalName: string
  timestamp: string
}

export interface SaveForLaterResponse {
  customerId: string
  productIdVariantId: string
  variantId: string
  productId: string
  timestamp: string
}

export type FavoriteBrandResponseData = FavoriteBrandResponse[]
export type FavoriteProductResponseData = FavoriteProductResponse[]
export type FavoriteSavedForLaterResponseData = SaveForLaterResponse[]

export interface FavoritesApiResponse<
  T extends
    | FavoriteBrandResponseData
    | FavoriteProductResponseData
    | FavoriteSavedForLaterResponseData,
> {
  status: string
  data: T
}
