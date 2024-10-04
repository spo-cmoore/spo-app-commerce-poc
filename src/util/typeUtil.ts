/**
 * Construct a type with a set of optional properties K of type T
 *
 * A Partial Record
 */
export type PRecord<K extends number | string | symbol, T> = { [P in K]?: T }

/**
 * Construct a type with any optional properties of type T
 */
export type OpenRecord<T> = PRecord<number | string | symbol, T>

/**
 * Construct a type of T or a Promise of T
 */
export type Awaitable<T> = Promise<T> | T

/**
 * Represents an initializer function of T
 */
export type Lazy<T> = () => T

/**
 * Construct a type of T or an initializer of T
 */
export type Lazyable<T> = Lazy<T> | T

/**
 * Construct a type of T, null, or undefined
 */
export type Maybe<T> = T | null | undefined

/**
 * Construct a type with the properties of RT merged over the properties of T
 */
export type Replace<T, RT extends { [K in keyof T]?: unknown }> = Omit<T, keyof RT> & RT

/**
 * Make the properties of T in the union K required and non-null.
 */
export type NonNullableKeys<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}

/**
 * Make one or more properties of an object optional
 * @example
 * type Foo = {
 *  bar: string;
 *  baz: number;
 * };
 * type OptionalFoo = Optional<Foo, 'bar'>; // { bar?: string; baz: number }
 */
export type Optional<T extends object, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>

/**
 * Construct an array type where every member of the array is the union of all keys of T
 */
export type AnyKeysOf<T> = (keyof T)[]

export type ReturnTypeOrUndefined<T> = T extends (...args: any[]) => infer R
  ? R
  : undefined
