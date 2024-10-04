import { RESTDataSource } from '@apollo/datasource-rest'
import {
  FavoriteBrandResponse,
  FavoriteCommand,
  FavoritePayload,
  FavoriteProductResponse,
  FavoriteSourceLocation,
  FavoriteType,
  SaveForLaterResponse,
} from './types'
import { BrandInformation, Product } from '../../schema/types.generated'
import { getCustomerResId, getProductResId } from '../../util/shopifyResource'
import {
  assertFavoriteBrandsResponse,
  assertFavoriteProductsResponse,
  assertSavedForLaterResponse,
} from './validate-response'

export class FavoritesApi extends RESTDataSource {
  override baseURL = process.env.FAVORITES_API_URL
  private token = process.env.FAVORITES_API_TOKEN

  private async request(payload: FavoritePayload): Promise<unknown> {
    return this.post<unknown>('SPO-Site/ShopPoCustomerFavorites', {
      params: {
        code: this.token,
      },
      body: {
        ...payload,
        source: 'app',
      },
    })
  }

  public async fetchFavoriteProducts(
    customerId: string
  ): Promise<FavoriteProductResponse[]> {
    const response = await this.request({
      command: FavoriteCommand.GET,
      type: FavoriteType.PRODUCT,
      customerId: getCustomerResId(customerId)[0],
    })

    assertFavoriteProductsResponse(response)
    return response.data
  }

  public async addFavoriteProduct(
    customerId: string,
    product: Product,
    location: FavoriteSourceLocation
  ): Promise<void> {
    const productResId = getProductResId(String(product.id))[0]
    await this.request({
      command: FavoriteCommand.ADD,
      type: FavoriteType.PRODUCT,
      location,
      customerId: getCustomerResId(customerId)[0],
      id: productResId,
      title: product.title,
      handle: product.handle,
      brand: product.brandInfo?.brand ?? undefined,
      productType: product.productType,
    })
  }

  public async removeFavoriteProduct(
    customerId: string,
    productId: string
  ): Promise<void> {
    await this.request({
      command: FavoriteCommand.REMOVE,
      type: FavoriteType.PRODUCT,
      customerId: getCustomerResId(customerId)[0],
      id: getProductResId(productId)[0],
    })
  }

  public async fetchFavoriteBrands(customerId: string): Promise<FavoriteBrandResponse[]> {
    const [customerResId] = getCustomerResId(customerId)
    const response = await this.request({
      command: FavoriteCommand.GET,
      type: FavoriteType.BRAND,
      customerId: customerResId,
    })

    assertFavoriteBrandsResponse(response)
    return response.data
  }

  public async addFavoriteBrand(
    customerId: string,
    brand: BrandInformation,
    location: FavoriteSourceLocation
  ): Promise<void> {
    await this.request({
      command: FavoriteCommand.ADD,
      type: FavoriteType.BRAND,
      location,
      customerId: getCustomerResId(customerId)[0],
      // The API stores the id sent as `originalName` in the DB
      // and lower-cases the value to use as the `id`
      // which is why we use `title` to preserve formatting for `originalName`
      id: brand.title,
    })
  }

  public async removeFavoriteBrand(customerId: string, brandId: string): Promise<void> {
    await this.request({
      command: FavoriteCommand.REMOVE,
      type: FavoriteType.BRAND,
      customerId: getCustomerResId(customerId)[0],
      id: brandId,
    })
  }

  public async fetchSaveForLater(customerId: string): Promise<SaveForLaterResponse[]> {
    const response = await this.request({
      command: FavoriteCommand.GET,
      type: FavoriteType.SAVE_FOR_LATER,
      customerId: getCustomerResId(customerId)[0],
    })

    assertSavedForLaterResponse(response)
    return response.data
  }
}
