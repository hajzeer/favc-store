/*
 * All the status the cart can have.
 */

import appConfig from "../../../app.config.json";

export const BASKET_STATUS = {
  NOT_HYDRATED: 'not-hydrated',
  HYDRATE: 'hydrate',
  READY: 'ready',
  SERVER_BASKET_IS_STALE: 'server-basket-is-stale'
}

export const BASKET_INITIAL_STATE = {
  status: BASKET_STATUS.NOT_HYDRATED,
  /**
   * A simplistic basket which gets stored on client side
   */
  clientBasket: {
    /**
     * Each client cart item consists of these fields:
     *  - sku
     *  - path
     *  - priceVariantIdentifier
     *  - quantity
     */
    locale: {
      locale: "pl",
      displayName: "pl",
      appLanguage: "pl",
      crystallizeCatalogueLanguage: "pl",
      crystallizePriceVariant: "default",
    },
    cart: [],
    voucherCode: null,
  },

  // The validated basket sent back from the Service API
  serverBasket: null,

  // The basket cart item to draw attention to
  attentionCartItem: {}
}

export default function () {
  return BASKET_INITIAL_STATE
}