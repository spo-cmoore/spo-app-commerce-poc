import { Product } from '../schema/types.generated'

export const orderSponsoredProducts = (
  products: Product[],
  sponsored: Product[],
  limit = 6,
  every = 3
): Product[] => {
  const output: Product[] = []
  const sponsoredProducts = sponsored.slice(
    0,
    limit > sponsored.length ? sponsored.length : limit
  )

  for (const [i, product] of products.entries()) {
    output.push(product)

    if (sponsoredProducts.length > 0 && i % every === 0) {
      output.push(sponsoredProducts.shift())
    }
  }

  return output
}
