import {
  CustomerLoyaltyResponse,
  PushSubscription,
  ShoppingStylePreferences,
  StylePreferencesResponse,
} from './types'
import { isArrayLike } from '../../util/isArrayLike'

export function assertFetchLoyaltyResponse(
  response: unknown
): asserts response is CustomerLoyaltyResponse {
  if (!response) {
    throw 'No response'
  }

  const resp = response as object

  if (
    'userId' in resp &&
    'loyaltyTierName' in resp &&
    'loyaltyTierId' in resp &&
    'availablePoints' in resp
  ) {
    return
  }

  throw 'Invalid response'
}

export function assertFetchPushSubscriptionResponse(
  response: unknown
): asserts response is PushSubscription[] {
  if (!response) {
    throw 'No response'
  }

  if (isArrayLike(response)) {
    if (response.length > 0) {
      const item = (response as PushSubscription[])[0]
      if (!('channelId' in item)) {
        throw 'Invalid response'
      }
    }
    return
  }

  throw 'Invalid response'
}

export function assertFetchStylePreferencesResponse(
  response: unknown
): asserts response is StylePreferencesResponse {
  if (!response) {
    throw 'No response'
  }

  if (isArrayLike(response)) {
    if (response.length > 0) {
      const item = (response as StylePreferencesResponse)[0]
      if (!('promptId' in item && 'values' in item)) {
        throw 'Invalid response'
      }
    }
    return
  }

  throw 'Invalid response'
}
