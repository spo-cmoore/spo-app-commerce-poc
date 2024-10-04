import { RESTDataSource } from '@apollo/datasource-rest'
import 'dotenv/config'
import { SearchRequestParams } from '../../schema/types.generated'
import { searchParams } from '../../util/searchParams'
import { PartnerType } from '.'

export class SearchApi extends RESTDataSource {
  override baseURL = process.env.SEARCH_API_URL
  headers = process.env.SEARCH_API_KEY
    ? {
        'Ocp-Apim-Subscription-Key': process.env.SEARCH_API_KEY,
      }
    : undefined

  async productIndex(
    requestParams: SearchRequestParams
  ): Promise<PartnerType.SearchResultsResponse> {
    return this.get<PartnerType.SearchResultsResponse>('search', {
      params: searchParams(requestParams),
      headers: this.headers ?? {},
    })
  }
}
