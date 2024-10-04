import type { QueryResolvers } from '../../../types.generated'

export const me: NonNullable<QueryResolvers['me']> = async (
  _parent,
  { token },
  { dataSources }
) => {
  /* Implement Query.me resolver logic here */
  return {
    authType: 0,
    // TODO
  }
}
