import {
  FavoriteBrandResponseData,
  FavoriteProductResponseData,
  FavoritesApiResponse,
  FavoriteSavedForLaterResponseData,
} from './types'

export function assertFavoriteProductsResponse(
  response: unknown
): asserts response is FavoritesApiResponse<FavoriteProductResponseData> {
  // TODO
  return
}

export function assertFavoriteBrandsResponse(
  response: unknown
): asserts response is FavoritesApiResponse<FavoriteBrandResponseData> {
  // TODO
  return
}

export function assertSavedForLaterResponse(
  response: unknown
): asserts response is FavoritesApiResponse<FavoriteSavedForLaterResponseData> {
  // TODO
  return
}
