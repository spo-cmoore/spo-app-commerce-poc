import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import { v4 } from '@as-integrations/azure-functions'
import { ApolloServer, BaseContext } from '@apollo/server'
import { typeDefs } from '../schema/typeDefs.generated'
import { resolvers } from '../schema/resolvers.generated'
import { AdsApi, ReviewsApi, SearchApi } from '../dataSources'

export async function SpoCommerceGql(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`)

  const name = request.query.get('name') || (await request.text()) || 'world'

  return { body: `Hello, ${name}!` }
}

const server = new ApolloServer<BaseContext>({
  logger: console,
  typeDefs,
  resolvers,
})

app.http('SpoCommerceGql', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: v4.startServerAndCreateHandler(server, {
    context: async ({ req }) => {
      const { cache } = server
      return {
        dataSources: {
          adsApi: new AdsApi(),
          reviewsApi: new ReviewsApi(),
          searchApi: new SearchApi(),
        },
      }
    },
  }),
})
