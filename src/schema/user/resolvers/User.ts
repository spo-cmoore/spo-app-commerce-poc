import type {
  PushPreferences,
  StylePreferences,
  UserResolvers,
} from '../../types.generated'
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
  orders: async (parent, args, context) => {
    return [] // TODO
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
  stylePreferences: async (parent, args, context): Promise<StylePreferences> => {
    const initialMap: Record<StyleQuizPromptId, string[]> = {
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
    if (parent.customerId) {
      const prefs: PartnerType.StylePreferencesResponse =
        await context.dataSources.personalizationApi.fetchStylePreferences(
          parent.customerId
        )
      return prefs.reduce<StylePreferences>((acc, curr) => {
        if (curr.promptId in initialMap) {
          const id = curr.promptId as StyleQuizPromptId
          const values = curr.values.reduce<string[]>((acc, v) => {
            if (v.selected) {
              acc.push(v.optionId)
            }
            return acc
          }, [])
          acc[id] = values
        }
        return acc
      }, initialMap)
    }

    return initialMap
  },
}

type StyleQuizPromptId =
  | 'gender'
  | 'brands'
  | 'additionalInterests'
  | 'styles'
  | 'collectionsInterests'
  | 'shoeSizes'
  | 'dressSizes'
  | 'bottomSizes'
  | 'topSizes'
  | 'colors'
