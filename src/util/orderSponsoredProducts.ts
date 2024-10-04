import { Product } from '../schema/types.generated'
import type { MiraklType, PartnerType } from '../dataSources'

export const orderSponsoredProducts = (
  products: PartnerType.SearchResultProduct[],
  sponsored: MiraklType.Product[],
  limit = 6,
  every = 3
): Product[] => {
  const output: Product[] = []
  const sponsoredProducts = sponsored.slice(
    0,
    limit > sponsored.length ? sponsored.length : limit
  )

  for (const [i, product] of products.entries()) {
    output.push({
      id: product.ProductID,
      isSponsored: false,
      handle: product.Handle ?? '',
      title: product.Title ?? '',
      productType: product.ProductType ?? '',
    })

    if (sponsoredProducts.length > 0 && i % every === 0) {
      const product = sponsoredProducts.shift()
      if (product) {
        output.push({
          id: product.ProductID,
          isSponsored: true,
          handle: product.Handle,
          title: product.Title,
          productType: product.ProductType,
        })
      }
    }
  }

  return output
}
