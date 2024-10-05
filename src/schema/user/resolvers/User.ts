import type { PushPreferences, UserResolvers } from '../../types.generated'
import type { PartnerType } from '../../../dataSources'

export const User: UserResolvers = {
  emailPreferences: async (parent, args, context) => {
    if (!parent.email) {
      return {}
    }
    return await context.dataSources.notificationsApi.fetchEmailPreferences(parent.email)
  },
  favoriteBrands: async (parent, args, context) => {
    if (parent.customerId) {
      return await context.dataSources.favoritesApi.fetchFavoriteBrands(parent.customerId)
    }
    return []
  },
  favoriteProducts: async (parent, args, context) => {
    if (parent.customerId) {
      return await context.dataSources.favoritesApi.fetchFavoriteProducts(
        parent.customerId
      )
    }
    return []
  },
  loyaltyProfile: async (parent, args, context) => {
    if (parent.customerId) {
      const result = await context.dataSources.loyaltyApi.fetchCustomerLoyalty(
        parent.customerId
      )
      return {
        ...result,
        loyaltyEnrollDate: result.loyaltyEnrollTime,
      }
    }
    return {}
  },
  pushPreferences: async (parent, args, context) => {
    if (parent.customerId) {
      const push = await context.dataSources.notificationsApi.fetchPushSubscriptions(
        parent.customerId
      )
      // TODO Should these keys be dynamic?
      return {
        deals: push.find((p: PartnerType.PushSubscription) => p.channelId === 'deals'),
        orders: push.find((p: PartnerType.PushSubscription) => p.channelId === 'orders'),
        rewards: push.find(
          (p: PartnerType.PushSubscription) => p.channelId === 'rewards'
        ),
      }
    }
    return {
      deals: null,
      orders: null,
      rewards: null,
    }
  },
  stylePreferences: async (parent, args, context) => {
    // if (parent.customerId) {
    //   const prefs = await context.dataSources.personalizationApi.fetchStylePreferences(
    //     parent.customerId
    //   )
    //   return prefs
    // }

    // ?
    return {
      brands: [],
      colors: [],
      gender: [],
      bottomSizes: [],
      dressSizes: [],
      shoeSizes: [],
      styles: [],
      topSizes: [],
      additionalInterests: [],
      collectionsInterests: [],
    }
  },
}
