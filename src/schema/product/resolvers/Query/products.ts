import type { QueryResolvers } from '../../../types.generated'
import { orderSponsoredProducts } from '../../../../util/orderSponsoredProducts'

export const products: NonNullable<QueryResolvers['products']> = async (
  _parent,
  { params },
  ctx
) => {
  const result = await ctx.dataSources.searchApi.productIndex(params)
  const data = await JSON.parse(result)
  const { value: results, facets } = data
  const products = results.map(r => ({
    id: r.ProductID,
    title: r.Title,
    isSponsored: false,
  }))

  const adsResult = await ctx.dataSources.adsApi.getAds(
    params.adsHandle,
    params.adsPage,
    products.length
  )
  const adsData = await JSON.parse(adsResult)
  const adProducts = adsData.value.map(r => ({
    id: r.ProductID,
    title: r.Title,
    isSponsored: true,
  }))

  const value = orderSponsoredProducts(products, adProducts)
  return {
    value,
    facets,
  }
}
