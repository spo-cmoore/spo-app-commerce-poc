import type { QueryResolvers, SearchResult } from '../../../types.generated'
import { searchParams } from '../../../../util/searchParams'
import type { MiraklType, PartnerType } from '../../../../dataSources'
import { orderSponsoredProducts } from '../../../../util/orderSponsoredProducts'

export const search: NonNullable<QueryResolvers['search']> = async (
  _parent,
  { params },
  { dataSources }
): Promise<SearchResult> => {
  const searchResponse = await dataSources.searchApi.productIndex(searchParams(params))
  const searchData: PartnerType.SearchResultsResponse = await JSON.parse(searchResponse)
  // TODO Assert no errors and type-guard

  const adsResponse = await dataSources.adsApi.fetchAds(
    params?.adsHandle,
    params?.adsPage,
    searchData.value.length
  )
  const adsData: MiraklType.AdsFetchResponse = await JSON.parse(adsResponse)
  // TODO Assert no errors and type-guard

  const value = orderSponsoredProducts(searchData.value, adsData.value ?? [])

  return {
    value,
    facets: searchData.facets,
  }
}
