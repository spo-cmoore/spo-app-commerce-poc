import { SearchRequestParams } from '../schema/types.generated'

export const searchParams = (query: SearchRequestParams): Record<string, string> => {
  return {
    ...query,
    page: query.page?.toString(),
    pagesize: query.pagesize.toString(),
    vectorizeTerm: query.vectorizeTerm?.toString(),
  }
}
