import 'dotenv/config'
import type { QueryResolvers, User } from '../../../types.generated'

export const me: NonNullable<QueryResolvers['me']> = async (
  _parent,
  { token },
  { dataSources }
) => {
  if (!token) {
    // TODO return unauthorized?
    return {
      authType: 0,
    }
  }

  // Mock object until fetched from UCP service
  const ucpResult: User = {
    authType: 1,
    customerId: process.env.FAKE_CUSTOMER_ID,
    email: 'colmoore@shoppremiumoutlets.com',
    firstName: 'Coleman',
    lastName: 'Moore',
    acceptsMarketing: true,
    addresses: [],
  }

  return ucpResult
}
