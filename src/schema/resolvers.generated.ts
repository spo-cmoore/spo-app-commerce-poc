/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { me as Query_me } from './user/resolvers/Query/me';
import    { reviews as Query_reviews } from './review/resolvers/Query/reviews';
import    { search as Query_search } from './search-result/resolvers/Query/search';
import    { Address } from './user/resolvers/Address';
import    { BrandInformation } from './base/resolvers/BrandInformation';
import    { EmailPreferences } from './user/resolvers/EmailPreferences';
import    { FavoriteBrand } from './user/resolvers/FavoriteBrand';
import    { FavoriteProduct } from './user/resolvers/FavoriteProduct';
import    { LoyaltyProfile } from './user/resolvers/LoyaltyProfile';
import    { Order } from './user/resolvers/Order';
import    { Product } from './base/resolvers/Product';
import    { ProductBrandInfo } from './base/resolvers/ProductBrandInfo';
import    { PushPreference } from './user/resolvers/PushPreference';
import    { PushPreferenceDevice } from './user/resolvers/PushPreferenceDevice';
import    { PushPreferences } from './user/resolvers/PushPreferences';
import    { Review } from './review/resolvers/Review';
import    { SavedForLaterProduct } from './user/resolvers/SavedForLaterProduct';
import    { SearchResult } from './search-result/resolvers/SearchResult';
import    { SearchResultFacet } from './search-result/resolvers/SearchResultFacet';
import    { SearchResultFacetValue } from './search-result/resolvers/SearchResultFacetValue';
import    { StylePreferences } from './user/resolvers/StylePreferences';
import    { User } from './user/resolvers/User';
import    { Variant } from './base/resolvers/Variant';
    export const resolvers: Resolvers = {
      Query: { me: Query_me,reviews: Query_reviews,search: Query_search },
      
      
      Address: Address,
BrandInformation: BrandInformation,
EmailPreferences: EmailPreferences,
FavoriteBrand: FavoriteBrand,
FavoriteProduct: FavoriteProduct,
LoyaltyProfile: LoyaltyProfile,
Order: Order,
Product: Product,
ProductBrandInfo: ProductBrandInfo,
PushPreference: PushPreference,
PushPreferenceDevice: PushPreferenceDevice,
PushPreferences: PushPreferences,
Review: Review,
SavedForLaterProduct: SavedForLaterProduct,
SearchResult: SearchResult,
SearchResultFacet: SearchResultFacet,
SearchResultFacetValue: SearchResultFacetValue,
StylePreferences: StylePreferences,
User: User,
Variant: Variant
    }