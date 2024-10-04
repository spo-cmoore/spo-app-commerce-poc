import { decode } from 'base-64'
import QueryString, { ParsedQs } from 'qs'

export type ShopifyGID<T extends string = string> = `gid://shopify/${T}/${string}`

export type ResourceIdQueryTuple = [string, ParsedQs | undefined]

/**
 * Parses a given shopify GID for it's type and ID.
 *
 * The majority of data we hold in state uses Shopify's encoded GID format.
 * This is a string with the format `gid://shopify/:type/:id`
 * Most of SPO's custom backend relies on AdminAPI IDs, which are ONLY the `:id` in the GID above.
 *
 * Shopify does not encourage relying on this format, however, so an update to the version of the
 * Storefront API in use should always come with a check to ensure this format is still in use.
 * @param {string} str string to parse
 * @param {string?} idType type of id to expect. Case invariant. Does nothing if not provided.
 * @returns {string} Gid Namespace stripped resource ID
 */
export function getResourceId(
  str: string,
  idType?: string
): [string, ParsedQs | undefined] {
  let resourceUri: ShopifyGID
  if (isGidString(str)) {
    resourceUri = str
  } else if (/^\d+$/.test(str)) {
    // raw IDs are purely numerical. if the id is a string of numbers, assume it's an id
    return [str, undefined]
  } else {
    // This function throws on failure anyway so don't worry about catching base64 errors.
    const decoded = decode(str)

    if (isGidString(decoded)) {
      resourceUri = decoded
    } else {
      throw new Error('Expected string to be valid Shopify GID')
    }
  }

  // only destructure type and id
  const [, , , itemType, itemIdQuery] = resourceUri.split('/')

  if (idType && itemType?.toLowerCase() !== idType.toLowerCase()) {
    throw new Error(`Expected Shopify GID to be a ${idType} ID`)
  }

  const [itemId, itemQuery] = itemIdQuery?.split('?')

  if (!itemId) {
    throw new Error('Expected string to be valid Shopify GID')
  }

  return [itemId, itemQuery ? QueryString.parse(itemQuery) : undefined]
}

function isGidString<T extends string>(str: string, type?: T): str is ShopifyGID<T> {
  return str.startsWith(`gid://shopify/${type ? `${type}/` : ''}`)
}

export const getCustomerResId = (str: string): ResourceIdQueryTuple =>
  getResourceId(str, 'Customer')
export const getProductResId = (str: string): ResourceIdQueryTuple =>
  getResourceId(str, 'Product')
