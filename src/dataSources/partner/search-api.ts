import { RESTDataSource } from '@apollo/datasource-rest'
import 'dotenv/config'
import { SearchRequestParams } from '../../schema/types.generated'
import { searchParams } from '../../util/searchParams'
import { PartnerType } from '.'

export class SearchApi extends RESTDataSource {
  override baseURL = process.env.PARTNER_API_URL
  private path = 'search'
  private headers = process.env.PARTNER_API_KEY
    ? {
        'Ocp-Apim-Subscription-Key': process.env.PARTNER_API_KEY,
      }
    : undefined

  async productIndex(
    requestParams: SearchRequestParams
  ): Promise<PartnerType.SearchResultsResponse> {
    return this.get<PartnerType.SearchResultsResponse>(this.path, {
      params: searchParams(requestParams),
      headers: this.headers ?? {},
    })
  }
}
