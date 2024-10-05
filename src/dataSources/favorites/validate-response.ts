import {
  FavoriteBrandResponse,
  FavoriteBrandResponseData,
  FavoriteProductResponse,
  FavoriteProductResponseData,
  FavoritesApiResponse,
  FavoriteSavedForLaterResponseData,
  SaveForLaterResponse,
} from './types'
import { isArrayLike } from '../../util/isArrayLike'

export function assertFavoriteProductsResponse(
  response: unknown
): asserts response is FavoritesApiResponse<FavoriteProductResponseData> {
  if (!response) {
    throw 'No response'
  }

  const resp = response as object
  if (
    'status' in resp &&
    resp.status === 'success' &&
    'data' in resp &&
    isArrayLike(resp.data)
  ) {
    if (resp.data.length > 0) {
      const item = (resp.data as FavoriteProductResponse[])[0]
      if (!('productId' in item)) {
        throw 'Invalid response'
      }
    }
    return
  }

  throw 'Invalid response'
}

export function assertFavoriteBrandsResponse(
  response: unknown
): asserts response is FavoritesApiResponse<FavoriteBrandResponseData> {
  if (!response) {
    throw 'No response'
  }

  const resp = response as object
  if (
    'status' in resp &&
    resp.status === 'success' &&
    'data' in resp &&
    isArrayLike(resp.data)
  ) {
    if (resp.data.length > 0) {
      const item = (resp.data as FavoriteBrandResponse[])[0]
      if (!('brandId' in item)) {
        throw 'Invalid response'
      }
    }
    return
  }

  throw 'Invalid response'
}

export function assertSavedForLaterResponse(
  response: unknown
): asserts response is FavoritesApiResponse<FavoriteSavedForLaterResponseData> {
  if (!response) {
    throw 'No response'
  }

  const resp = response as object
  if (
    'status' in resp &&
    resp.status === 'success' &&
    'data' in resp &&
    isArrayLike(resp.data)
  ) {
    if (resp.data.length > 0) {
      const item = (resp.data as SaveForLaterResponse[])[0]
      if (!('productIdVariantId' in item)) {
        throw 'Invalid response'
      }
    }
    return
  }

  throw 'Invalid response'
}
