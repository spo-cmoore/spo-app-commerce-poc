import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Address = {
  __typename?: 'Address';
  address1: Scalars['String']['output'];
  address2?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  countryCode: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  preferred?: Maybe<Scalars['Boolean']['output']>;
  stateCode?: Maybe<Scalars['String']['output']>;
};

export type BrandInformation = {
  __typename?: 'BrandInformation';
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/** Customer preferences for receiving marketing emails */
export type EmailPreferences = {
  __typename?: 'EmailPreferences';
  campaigns?: Maybe<Scalars['Boolean']['output']>;
  dailyFinds?: Maybe<Scalars['Boolean']['output']>;
  liveStreams?: Maybe<Scalars['Boolean']['output']>;
  /** ie 01GPDCBN090FK669R73GCMJPW8 -- what is this? Klaviyo? Zinrelo? */
  profileId?: Maybe<Scalars['String']['output']>;
  surveys?: Maybe<Scalars['Boolean']['output']>;
};

export type FavoriteBrand = {
  __typename?: 'FavoriteBrand';
  brandId: Scalars['String']['output'];
  lastModified: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
};

export type FavoriteProduct = {
  __typename?: 'FavoriteProduct';
  lastModified?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
};

export type LoyaltyProfile = {
  __typename?: 'LoyaltyProfile';
  availablePoints: Scalars['Int']['output'];
  awardedPoints: Scalars['Int']['output'];
  /** Whether customer has actively asked not to have loyalty membership */
  hasOptedOut: Scalars['Boolean']['output'];
  loyaltyEnrollDate: Scalars['String']['output'];
  loyaltyTierId: Scalars['String']['output'];
  loyaltyTierName: Scalars['String']['output'];
  pendingPoints: Scalars['Int']['output'];
  redeemedPoints: Scalars['Int']['output'];
  /** Included as refcode query param when opening a facebook share */
  referralCode: Scalars['String']['output'];
};

export type Order = {
  __typename?: 'Order';
  /** Whether order is fulfilled, or ?? */
  confirmationStatus?: Maybe<Scalars['String']['output']>;
  /** Customer facing order identifier, ie SPO1234567 */
  orderId?: Maybe<Scalars['String']['output']>;
  /** Shopify global ID, ie gid://shopify/Order/12345678 */
  resourceId?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  brandInfo?: Maybe<ProductBrandInfo>;
  handle?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isSponsored?: Maybe<Scalars['Boolean']['output']>;
  productType?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ProductBrandInfo = {
  __typename?: 'ProductBrandInfo';
  brand?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  isLuxe?: Maybe<Scalars['Boolean']['output']>;
};

export type PushPreference = {
  __typename?: 'PushPreference';
  activationDttm: Scalars['String']['output'];
  active: Scalars['Boolean']['output'];
  channelId: Scalars['String']['output'];
  devices: Array<Maybe<PushPreferenceDevice>>;
};

export type PushPreferenceDevice = {
  __typename?: 'PushPreferenceDevice';
  deviceId: Scalars['String']['output'];
  deviceLabel: Scalars['String']['output'];
  os: Scalars['String']['output'];
};

export type PushPreferences = {
  __typename?: 'PushPreferences';
  deals?: Maybe<PushPreference>;
  orders?: Maybe<PushPreference>;
  rewards?: Maybe<PushPreference>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  reviews?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  search?: Maybe<SearchResult>;
};


export type QuerymeArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type QuerysearchArgs = {
  params?: InputMaybe<SearchRequestParams>;
};

export type Review = {
  __typename?: 'Review';
  id?: Maybe<Scalars['String']['output']>;
};

export type SavedForLaterProduct = {
  __typename?: 'SavedForLaterProduct';
  lastModified?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  variant?: Maybe<Variant>;
};

export type SearchRequestParams = {
  adsHandle?: InputMaybe<Scalars['String']['input']>;
  adsPage?: InputMaybe<Scalars['String']['input']>;
  colorhex?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  page: Scalars['Int']['input'];
  pagesize?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  term?: InputMaybe<Scalars['String']['input']>;
  vectorizeTerm?: InputMaybe<Scalars['Int']['input']>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  facets?: Maybe<Array<Maybe<SearchResultFacet>>>;
  value: Array<Maybe<Product>>;
};

export type SearchResultFacet = {
  __typename?: 'SearchResultFacet';
  handle: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<SearchResultFacetValue>>>;
};

export type SearchResultFacetValue = {
  __typename?: 'SearchResultFacetValue';
  count: Scalars['Int']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type StylePreferences = {
  __typename?: 'StylePreferences';
  additionalInterests: Array<Maybe<Scalars['String']['output']>>;
  bottomSizes: Array<Maybe<Scalars['String']['output']>>;
  brands: Array<Maybe<Scalars['String']['output']>>;
  collectionsInterests: Array<Maybe<Scalars['String']['output']>>;
  colors: Array<Maybe<Scalars['String']['output']>>;
  dressSizes: Array<Maybe<Scalars['String']['output']>>;
  gender: Array<Maybe<Scalars['String']['output']>>;
  shoeSizes: Array<Maybe<Scalars['String']['output']>>;
  styles: Array<Maybe<Scalars['String']['output']>>;
  topSizes: Array<Maybe<Scalars['String']['output']>>;
};

/** A guest or member customer */
export type User = {
  __typename?: 'User';
  /** Whether customer accepts marketing */
  acceptsMarketing?: Maybe<Scalars['Boolean']['output']>;
  addresses?: Maybe<Array<Maybe<Address>>>;
  /** Auth type 0 for guest, 1 for member customer */
  authType: Scalars['Int']['output'];
  /** Shopify global ID, ie gid://shopify/Customer/12345678 */
  customerId?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailPreferences?: Maybe<EmailPreferences>;
  favoriteBrands?: Maybe<Array<Maybe<FavoriteBrand>>>;
  favoriteProducts?: Maybe<Array<Maybe<FavoriteProduct>>>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  loyaltyProfile?: Maybe<LoyaltyProfile>;
  orders?: Maybe<Array<Maybe<Order>>>;
  pushPreferences?: Maybe<PushPreferences>;
  savedForLater?: Maybe<Array<Maybe<SavedForLaterProduct>>>;
  shopifyJwtToken?: Maybe<Scalars['String']['output']>;
  stylePreferences?: Maybe<StylePreferences>;
};

export type Variant = {
  __typename?: 'Variant';
  id: Scalars['ID']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BrandInformation: ResolverTypeWrapper<BrandInformation>;
  EmailPreferences: ResolverTypeWrapper<EmailPreferences>;
  FavoriteBrand: ResolverTypeWrapper<FavoriteBrand>;
  FavoriteProduct: ResolverTypeWrapper<FavoriteProduct>;
  LoyaltyProfile: ResolverTypeWrapper<LoyaltyProfile>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Order: ResolverTypeWrapper<Order>;
  Product: ResolverTypeWrapper<Product>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ProductBrandInfo: ResolverTypeWrapper<ProductBrandInfo>;
  PushPreference: ResolverTypeWrapper<PushPreference>;
  PushPreferenceDevice: ResolverTypeWrapper<PushPreferenceDevice>;
  PushPreferences: ResolverTypeWrapper<PushPreferences>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  SavedForLaterProduct: ResolverTypeWrapper<SavedForLaterProduct>;
  SearchRequestParams: SearchRequestParams;
  SearchResult: ResolverTypeWrapper<SearchResult>;
  SearchResultFacet: ResolverTypeWrapper<SearchResultFacet>;
  SearchResultFacetValue: ResolverTypeWrapper<SearchResultFacetValue>;
  StylePreferences: ResolverTypeWrapper<StylePreferences>;
  User: ResolverTypeWrapper<User>;
  Variant: ResolverTypeWrapper<Variant>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  String: Scalars['String']['output'];
  Boolean: Scalars['Boolean']['output'];
  BrandInformation: BrandInformation;
  EmailPreferences: EmailPreferences;
  FavoriteBrand: FavoriteBrand;
  FavoriteProduct: FavoriteProduct;
  LoyaltyProfile: LoyaltyProfile;
  Int: Scalars['Int']['output'];
  Order: Order;
  Product: Product;
  ID: Scalars['ID']['output'];
  ProductBrandInfo: ProductBrandInfo;
  PushPreference: PushPreference;
  PushPreferenceDevice: PushPreferenceDevice;
  PushPreferences: PushPreferences;
  Query: {};
  Review: Review;
  SavedForLaterProduct: SavedForLaterProduct;
  SearchRequestParams: SearchRequestParams;
  SearchResult: SearchResult;
  SearchResultFacet: SearchResultFacet;
  SearchResultFacetValue: SearchResultFacetValue;
  StylePreferences: StylePreferences;
  User: User;
  Variant: Variant;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  address1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preferred?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stateCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BrandInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BrandInformation'] = ResolversParentTypes['BrandInformation']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmailPreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['EmailPreferences'] = ResolversParentTypes['EmailPreferences']> = {
  campaigns?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  dailyFinds?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  liveStreams?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  profileId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  surveys?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteBrandResolvers<ContextType = any, ParentType extends ResolversParentTypes['FavoriteBrand'] = ResolversParentTypes['FavoriteBrand']> = {
  brandId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastModified?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FavoriteProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['FavoriteProduct'] = ResolversParentTypes['FavoriteProduct']> = {
  lastModified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoyaltyProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoyaltyProfile'] = ResolversParentTypes['LoyaltyProfile']> = {
  availablePoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  awardedPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hasOptedOut?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  loyaltyEnrollDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  loyaltyTierId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  loyaltyTierName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pendingPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  redeemedPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  referralCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  confirmationStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resourceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  brandInfo?: Resolver<Maybe<ResolversTypes['ProductBrandInfo']>, ParentType, ContextType>;
  handle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isSponsored?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  productType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductBrandInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductBrandInfo'] = ResolversParentTypes['ProductBrandInfo']> = {
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isLuxe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PushPreferenceResolvers<ContextType = any, ParentType extends ResolversParentTypes['PushPreference'] = ResolversParentTypes['PushPreference']> = {
  activationDttm?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  channelId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  devices?: Resolver<Array<Maybe<ResolversTypes['PushPreferenceDevice']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PushPreferenceDeviceResolvers<ContextType = any, ParentType extends ResolversParentTypes['PushPreferenceDevice'] = ResolversParentTypes['PushPreferenceDevice']> = {
  deviceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deviceLabel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  os?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PushPreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PushPreferences'] = ResolversParentTypes['PushPreferences']> = {
  deals?: Resolver<Maybe<ResolversTypes['PushPreference']>, ParentType, ContextType>;
  orders?: Resolver<Maybe<ResolversTypes['PushPreference']>, ParentType, ContextType>;
  rewards?: Resolver<Maybe<ResolversTypes['PushPreference']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QuerymeArgs>>;
  reviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  search?: Resolver<Maybe<ResolversTypes['SearchResult']>, ParentType, ContextType, Partial<QuerysearchArgs>>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SavedForLaterProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['SavedForLaterProduct'] = ResolversParentTypes['SavedForLaterProduct']> = {
  lastModified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  variant?: Resolver<Maybe<ResolversTypes['Variant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']> = {
  facets?: Resolver<Maybe<Array<Maybe<ResolversTypes['SearchResultFacet']>>>, ParentType, ContextType>;
  value?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultFacetResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResultFacet'] = ResolversParentTypes['SearchResultFacet']> = {
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  values?: Resolver<Maybe<Array<Maybe<ResolversTypes['SearchResultFacetValue']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultFacetValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResultFacetValue'] = ResolversParentTypes['SearchResultFacetValue']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StylePreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['StylePreferences'] = ResolversParentTypes['StylePreferences']> = {
  additionalInterests?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  bottomSizes?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  brands?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  collectionsInterests?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  colors?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  dressSizes?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  gender?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  shoeSizes?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  styles?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  topSizes?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  acceptsMarketing?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  addresses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Address']>>>, ParentType, ContextType>;
  authType?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  customerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailPreferences?: Resolver<Maybe<ResolversTypes['EmailPreferences']>, ParentType, ContextType>;
  favoriteBrands?: Resolver<Maybe<Array<Maybe<ResolversTypes['FavoriteBrand']>>>, ParentType, ContextType>;
  favoriteProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['FavoriteProduct']>>>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  loyaltyProfile?: Resolver<Maybe<ResolversTypes['LoyaltyProfile']>, ParentType, ContextType>;
  orders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType>;
  pushPreferences?: Resolver<Maybe<ResolversTypes['PushPreferences']>, ParentType, ContextType>;
  savedForLater?: Resolver<Maybe<Array<Maybe<ResolversTypes['SavedForLaterProduct']>>>, ParentType, ContextType>;
  shopifyJwtToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stylePreferences?: Resolver<Maybe<ResolversTypes['StylePreferences']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VariantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Variant'] = ResolversParentTypes['Variant']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  BrandInformation?: BrandInformationResolvers<ContextType>;
  EmailPreferences?: EmailPreferencesResolvers<ContextType>;
  FavoriteBrand?: FavoriteBrandResolvers<ContextType>;
  FavoriteProduct?: FavoriteProductResolvers<ContextType>;
  LoyaltyProfile?: LoyaltyProfileResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductBrandInfo?: ProductBrandInfoResolvers<ContextType>;
  PushPreference?: PushPreferenceResolvers<ContextType>;
  PushPreferenceDevice?: PushPreferenceDeviceResolvers<ContextType>;
  PushPreferences?: PushPreferencesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  SavedForLaterProduct?: SavedForLaterProductResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  SearchResultFacet?: SearchResultFacetResolvers<ContextType>;
  SearchResultFacetValue?: SearchResultFacetValueResolvers<ContextType>;
  StylePreferences?: StylePreferencesResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Variant?: VariantResolvers<ContextType>;
};

