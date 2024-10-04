import { Maybe } from '../../util/typeUtil'
import { Product } from '../../schema/types.generated'

export interface SearchResultVariant {
  Color?: Maybe<string>
  DesignerColor?: Maybe<string>
  Image?: Maybe<string>
  InventoryQuantity?: Maybe<number>
  Price?: Maybe<number>
  SKU?: Maybe<string>
  Size?: Maybe<string>
  ColorHex: Maybe<string>
}

export interface SearchResultProduct {
  '@search.score'?: Maybe<number>
  AvailabilityQuotient?: Maybe<number>
  Brand?: Maybe<string>
  BrandCategory?: Maybe<string>
  BrandType?: Maybe<string>
  Category?: Maybe<
    {
      Title?: Maybe<string>
      Handle?: Maybe<string>
    }[]
  >
  CompareAtPrice?: Maybe<string>
  CreateDate?: Maybe<string>
  Discount?: Maybe<number>
  Editorspick?: Maybe<boolean>
  Handle?: Maybe<string>
  Images?: Maybe<string[]>
  NinetyDayPageViews?: Maybe<number>
  OneDayPageViewVelocity?: Maybe<number>
  OneDayPageViews?: Maybe<number>
  Price?: Maybe<number>
  ProductCondition?: Maybe<string>
  ProductID: string
  ProductType?: Maybe<string>
  PromoList?: Maybe<string[]>
  Promos?: Maybe<
    {
      Text?: Maybe<string>
      StartDate?: Maybe<string>
      EndDate?: Maybe<string>
    }[]
  >
  SalesRank?: Maybe<number>
  SevenDayPageViewVelocity?: Maybe<number>
  SevenDayPageViews?: Maybe<number>
  ThirtyDayPageViewVelocity?: Maybe<number>
  ThirtyDayPageViews?: Maybe<number>
  Title?: Maybe<string>
  TopSeller?: Maybe<boolean>
  TotalInventoryQuantity?: Maybe<number>
  VariantID?: Maybe<string>
  Variants?: Maybe<SearchResultVariant[]>
  Vendor?: Maybe<string>
  color?: Maybe<string[]>
  id?: Maybe<string>
}

export type SearchResultFacetValue = {
  count: number
} & (
  | {
      value?: string
      to?: never
      from?: never
    }
  | {
      value?: never
      to?: number
      from?: number
    }
)

export interface SearchResultFacet {
  handle: string
  label?: string
  values: SearchResultFacetValue[]
}

export interface Category {
  title: string
  searchTitle: string
  productType: string
  handle: string
  children: Category[]
}

export interface SearchResultsResponse {
  '@odata.count': number
  facets: SearchResultFacet[]
  navMenu: Category
  redirect?: never
  value: SearchResultProduct[]
}
