import { ApolloServer, BaseContext } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { v4 } from '@as-integrations/azure-functions'
import { app } from '@azure/functions'
import { typeDefs } from '../schema/typeDefs.generated'
import { resolvers } from '../schema/resolvers.generated'
import {
  AdsApi,
  FavoritesApi,
  LoyaltyApi,
  PersonalizationApi,
  ReviewsApi,
  SearchApi,
} from '../dataSources'
import { NotificationsApi } from '../dataSources/partner/notifications-api'

const schema = buildSubgraphSchema([{ typeDefs, resolvers }])
const server = new ApolloServer<BaseContext>({
  logger: console,
  schema,
})

app.http('ShopSimon', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: v4.startServerAndCreateHandler(server, {
    context: async ({ req }) => {
      const { cache } = server
      // TODO authenticate with req.headers
      // TODO pass cache to data sources
      return {
        dataSources: {
          adsApi: new AdsApi(),
          favoritesApi: new FavoritesApi(),
          loyaltyApi: new LoyaltyApi(),
          notificationsApi: new NotificationsApi(),
          personalizationApi: new PersonalizationApi(),
          reviewsApi: new ReviewsApi(),
          searchApi: new SearchApi(),
        },
      }
    },
  }),
})
