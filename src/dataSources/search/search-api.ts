import { RESTDataSource } from '@apollo/datasource-rest'
import 'dotenv/config'
import { SearchRequestParams } from '../../schema/types.generated'
import { searchParams } from '../../util/searchParams'

export class SearchApi extends RESTDataSource {
  override baseURL = process.env.SEARCH_API_URL
  subscriptionKey = process.env.SEARCH_API_KEY

  async productIndex(requestParams: SearchRequestParams) {
    return this.get('', {
      params: searchParams(requestParams),
      headers: {
        'Ocp-Apim-Subscription-Key': this.subscriptionKey,
      },
    })
  }
}
