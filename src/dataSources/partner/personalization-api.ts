import { RESTDataSource } from '@apollo/datasource-rest'
import 'dotenv/config'

export class PersonalizationApi extends RESTDataSource {
  override baseURL = process.env.PARTNER_API_URL
}
