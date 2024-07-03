/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { products as Query_products } from './product/resolvers/Query/products';
import    { reviews as Query_reviews } from './review/resolvers/Query/reviews';
import    { Product } from './product/resolvers/Product';
import    { Review } from './review/resolvers/Review';
import    { SearchResult } from './product/resolvers/SearchResult';
    export const resolvers: Resolvers = {
      Query: { products: Query_products,reviews: Query_reviews },
      
      
      Product: Product,
Review: Review,
SearchResult: SearchResult
    }