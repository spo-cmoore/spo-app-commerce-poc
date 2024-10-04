import { InputMaybe, SearchRequestParams } from '../schema/types.generated'

export const searchParams = (
  query: InputMaybe<SearchRequestParams>
): Record<string, string | undefined> | URLSearchParams => {
  return {
    page: query?.page?.toString(),
    pagesize: query?.pagesize?.toString(),
    vectorizeTerm: query?.vectorizeTerm?.toString(),
  }
}
