<template>
  <div>
    <Section :title="$t('checkout.title')">
      <div class="payment">
        <div class="payment__row">
          <div class="payment__input-group">
            <label for="payment__first-name" class="payment__label">
              {{ $t("common.firstName") }}
            </label>
            <input
              v-model="firstName"
              type="text"
              id="payment__first-name"
              name="payment__first-name"
              class="payment__input"
              required
            />
          </div>
          <div class="payment__input-group">
            <label for="payment__last-name" class="payment__label">
              {{ $t("common.lastName") }}
            </label>
            <input
              v-model="lastName"
              type="text"
              id="payment__last-name"
              name="payment__last-name"
              class="payment__input"
              required
            />
          </div>
        </div>
        <div class="payment__row">
          <div class="payment__input-group">
            <label for="payment__email" class="payment__label">
              {{ $t("common.email") }}
            </label>
            <input
              v-model="email"
              type="email"
              id="payment__email"
              name="payment__email"
              class="payment__input"
              required
            />
          </div>
        </div>
        <div class="payment__row">
          <div class="payment__input-group">
            <label for="payment__phone" class="payment__label">
              {{ $t("common.phone") }}
            </label>
            <input
                v-model="phone"
                type="text"
                id="payment__phone"
                name="payment__phone"
                class="payment__input"
                required
            />
          </div>
        </div>
        <div class="payment__row">
          <div class="payment__input-group">
            <label for="payment__street" class="payment__label">
              {{ $t("common.streetAddress") }}
            </label>
            <input
                v-model="street"
                type="text"
                id="payment__street"
                name="payment__street"
                class="payment__input"
                required
            />
          </div>
        </div>
        <div class="payment__row">
          <div class="payment__input-group">
            <label for="payment__city" class="payment__label">
              {{ $t("common.city") }}
            </label>
            <input
                v-model="city"
                type="text"
                id="payment__city"
                name="payment__city"
                class="payment__input"
                required
            />
          </div>
          <div class="payment__input-group">
            <label for="payment__postalCode" class="payment__label">
              {{ $t("common.postalCode") }}
            </label>
            <input
                v-model="postalCode"
                type="text"
                id="payment__postalCode"
                name="payment__postalCode"
                class="payment__input"
                required
            />
          </div>
        </div>
        <div class="payment__row">
          <div class="payment__input-group">
            <button class="delivery__button"
 :disabled="selected.first" @click="handleClick(1)">Paczkomat <br/> 13,99 zł</button>
          </div>
          <div class="payment__input-group">
            <button class="delivery__button"
 :disabled="selected.second" @click="handleClick(2)">Pod drzwi <br/> 14,99 zł</button>
          </div>
        </div>
        <div class="map__div" v-if="parcelBox === 1" :class="{active: parcelBox}">
          <inpost-geowidget onpoint='handleOnPoint' token='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjE5ODQwMTkwMzQsImlhdCI6MTY2ODY1OTAzNCwianRpIjoiNDI4OTQ2MTItN2FlNC00NzE0LWJiYTctMjc4ODBjY2ZlZTU3IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpVS0hobkFGZGFKTEZnOVYtakpZcGZBIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiM2JmNzNmOWQtMTZkNC00YWU5LTgyNTItOWFlMWU3NjQ2YjYyIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjNiZjczZjlkLTE2ZDQtNGFlOS04MjUyLTlhZTFlNzY0NmI2MiIsImFsbG93ZWRfcmVmZXJyZXJzIjoieWZhdmMuY29tLHd3dy55ZmF2Yy5jb20iLCJ1dWlkIjoiNGY5MGRkNzQtYzNkMS00NjM5LWFlYTItZjM2ZDIzMTUzODFlIn0.kkOF9DhdrEkkO_stiuC_82yh6aZwS83QVOIL35N-VtlU0C_kttmEAdQw7cwyz6GQsdnf7x7Aq72HwW68os3jI7JBVu3JUNCgkdabyGd70MrbmrMku-hOBE_E5-z30DvIUGd52EANp5mtgPz-wGO2j4aIiiLsCO3FO2NZwajzPhiKnrFPt4cqKZfNGdCscpswMGo5URsnd9x2F9IpUPtmedEo5uPIKRuzfcsrex1vIX68O3V3u-p19MTDJeCUydIRfAxs0svojhxw8opBRTj3J9Lq8_CHxKM9UflljALtJHZsU50RLNXMuExEYJZhS3kdL35aKXYhgz6B8BRbxdq9Ng' language='pl'  config='parcelCollect'></inpost-geowidget>
          <p v-if="parcelBoxSelected">
            TWÓJ PACZKOMAT: {{parcel}}
          </p>
          <p v-else></p>
        </div>
      </div>

    </Section>
    <Section :title="$t('checkout.choosePaymentMethod')" v-if="parcelBoxSelected">
      <div class="checkout-page__payment__providers">
        <Spinner v-if="isPaymentProvidersLoading" />
        <div v-else-if="paymentProvidersEnabled.length === 0">
          {{ $t("checkout.noPaymentProvidersConfigured") }}
        </div>
        <!--
          Since we only did integrate with Stripe paymentProvidersEnabled.length > 0,
          we know for sure that it's the Stripe one.
        -->
        <StripeSelector
          v-else
          :isSelected="selectedPaymentProvider === 'stripe'"
          @on-payment-provider-change="handleSelectPaymentProvider"
          @click="() => handleSelectPaymentProvider({ name: 'stripe' })"
        />
        <client-only>
          <StripePayment v-if="selectedPaymentProvider === 'stripe'" :checkout-model="checkoutModel" />
        </client-only>
      </div>
    </Section>
  </div>
</template>

<script>
import {serviceApi} from "/lib/service-api";
import Section from "../Section";
import StripeSelector from "./Providers/Stripe/selector";
import StripePayment from "./Providers/Stripe/payment";
import {getRelativePriceVariants} from "@@/lib/pricing";

/**
 * Retrieves what payment providers have been enabled.
 *
 * We did the Stripe integration as an example, but feel free to add more
 * integrations such as vipps, klarna, etc.
 *
 * If you want to add more payment providers, feel free to remove the hardcoded
 * code, and uncomment the code below.
 */
export function retrieveEnabledPaymentProviders(paymentProvidersConfig) {
  return paymentProvidersConfig.stripe.enabled ? ["stripe"] : [];

  /**
   * Uncomment the following for multiple payment provider integrations.
   */
  // const paymentProvidersNames = Object.keys(paymentProvidersConfig);

  // let paymentProvidersEnabled = [];
  // paymentProvidersNames.forEach((provider) => {
  //   /**
  //    * If the provider is enabled, we add it to the "paymentProvidersEnabled"
  //    */
  //   paymentProvidersConfig[provider].enabled &&
  //     paymentProvidersEnabled.push(paymentProvidersConfig[provider]);
  // });

  // return paymentProvidersEnabled;
}

export default {
  components: { Section, StripeSelector, StripePayment },
  data() {
    /**
     * The checkout model shared between all the payment providers
     * It contains everything needed to make a purchase and complete
     * an order
     */
    const initialFirstName = "";
    const initialLastName = "";
    const initialEmail = "";
    const initialLine = "";
    const initialCity = "";
    const initialZip = "";
    const initialPhone = "";
    const addInfo = "";

    const checkoutModel = {
      basketModel: this.$store.state.basket.clientBasket,
      meta: {
        key: 'PACZKOMAT',
        value: addInfo || null
        },
      customer: {
        firstName: initialFirstName || null,
        lastName: initialLastName || null,
        addresses: [
          {
            type: "billing",
            email: initialEmail || null,
            street: initialLine || null,
            city: initialCity || null,
            postalCode: initialZip || null,
            phone: initialPhone || null,
            country: "pl"
          },
          {
            type: 'delivery',
            email: initialEmail || null,
            street: initialLine || null,
            city: initialCity || null,
            postalCode: initialZip || null,
            phone: initialPhone || null,
            country: "pl"
          }
        ],
      },
      confirmationURL: this.getURL(
        `/confirmation/{crystallizeOrderId}?emptyBasket`
      ),
      checkoutURL: this.getURL(`/checkout`),
      termsURL: this.getURL(`/terms`),
    };

    return {
      firstName: initialFirstName,
      lastName: initialLastName,
      email: initialEmail,
      street: initialLine,
      city: initialCity,
      postalCode: initialZip,
      phone: initialPhone,
      value: addInfo,
      country: "pl",
      checkoutModel,
      selectedPaymentProvider: null,
      isPaymentProvidersLoading: true,
      paymentProvidersEnabled: [],
      parcelBox: null,
      parcelBoxSelected: false,
      selectedVariant: {
        sku: null,
        path: null,

      },
      unselectedVariant: {
        sku: null,
        path: null,

      },
      specs: null,
      relatedProducts: null,
      isItemBeingAddedToCart: false,
      addedItem: false,
      selected: {
        first: null,
        second: null,
      },
      parcel: null,
    };
  },
  /**
   * Before the component is created
   */
  async beforeCreate() {
    const paymentProvidersResponse = await serviceApi({
      query: `
      {
        paymentProviders {
          stripe {
            enabled
          }
          klarna {
            enabled
          }
          mollie {
            enabled
          }
          vipps {
            enabled
          }
        }
      }
    `,
    });

    this.isPaymentProvidersLoading = false;
    this.paymentProvidersEnabled = retrieveEnabledPaymentProviders(
      paymentProvidersResponse.data.paymentProviders
    );
  },
  watch: {
    /**
     * When the model of firstName changes
     */
    firstName(newValue) {
      this.checkoutModel.customer.firstName = newValue;
    },
    /**
     * When the model of lastName changes
     */
    lastName(newValue) {
      this.checkoutModel.customer.lastName = newValue;
    },
    /**
     * When the model of email changes
     */
    email(newValue) {
      this.checkoutModel.customer.addresses[0].email = newValue;
    },
    city(newValue) {
      this.checkoutModel.customer.addresses[0].city = newValue;
    },
    street(newValue) {
      this.checkoutModel.customer.addresses[0].street = newValue;
    },
    postalCode(newValue) {
      this.checkoutModel.customer.addresses[0].postalCode = newValue;
    },
    phone(newValue) {
      this.checkoutModel.customer.addresses[0].phone = newValue;
    },
  },
  methods: {
    handleSelectPaymentProvider({ name }) {
      this.selectedPaymentProvider = name;
    },
    getURL(path) {
      const isServer = typeof window === "undefined";
      if (isServer) {
        return "";
      }

      /**
       * For now, we assume that we only use English.
       * To add multilingual support, we must concat the locale to the URL
       */
      return `${location.protocol}//${location.host}${path}`;
    },
    handleClick(el) {
       this.parcelBox = el

      if(this.parcelBox === 1) {
        this.selectedVariant.sku = 'paczkomat-1211243515123451345'
        this.selectedVariant.path = '/delivery/delivery-cost'
        this.unselectedVariant.sku = 'pod-dom-1241345341462345'
        this.unselectedVariant.path = '/delivery/delivery-cost'
        this.selected.first = true,
            this.selected.second = false,
        this. parcelBoxSelected = false,

            this.isItemBeingAddedToCart = true;

      } else if (this.parcelBox === 2) {
        this.selectedVariant.sku = 'pod-dom-1241345341462345'
        this.selectedVariant.path = '/delivery/delivery-cost'
        this.unselectedVariant.sku = 'paczkomat-1211243515123451345'
        this.unselectedVariant.path = '/delivery/delivery-cost'
        this. parcelBoxSelected = true,
            this.selected.first = false,
            this.selected.second = true,
        this.isItemBeingAddedToCart = true;


      }
      if(this.isItemBeingAddedToCart) {
        this.addToBasket()
      }

    },
    addToBasket() {
      if (this.addedItem) {
        this.$store.dispatch("basket/removeItem", {
          sku: this.unselectedVariant.sku,
          path: this.unselectedVariant.path,
        });
      }

      const { locales, locale: code } = this.$i18n;
      const locale = locales.find((l) => l.locale === code) || locales[0];

      const { getRelativePriceVariants } = require("../../../../lib/pricing");
      const variantPricing = getRelativePriceVariants({
        variant: this.selectedVariant,
        locale,
      });
      const variantDiscountPrice = variantPricing?.discountPrice;
      const variantDefaultPrice = variantPricing?.defaultPrice;

      this.$store
          .dispatch("basket/addItem", {
            sku: this.selectedVariant.sku,
            path: this.selectedVariant.path,
            priceVariantIdentifier: variantDiscountPrice
                ? variantDiscountPrice.identifier
                : variantDefaultPrice.identifier || locale.crystallizePriceVariant,
          })
          .then(() => {
            const TIME_TO_SHOW_SPINNER = 250;
            const TIME_TO_ADD_ITEM_TO_CART = 250;
            /**
             * We add a delay so the spinner can be visualize for a small period of time.
             */
            setTimeout(() => {
              this.isItemBeingAddedToCart = false;
              this.addedItem = true;
              setTimeout(() => {
                this.$store.dispatch("basket/drawAttentionToItem", {
                  sku: this.selectedVariant.sku,
                  visible: false
                });
              }, TIME_TO_ADD_ITEM_TO_CART);
            }, TIME_TO_SHOW_SPINNER);
          })
          .catch(() => {
            /**
             * If it failed, we make the spinner disappear too.
             */
            this.isItemBeingAddedToCart = false;
          });
    },
    handleOnPoint(event) {
      this.parcelBoxSelected = true
      this.parcel = event.detail.name
      this.checkoutModel.meta.value = this.parcel
      console.log(event.detail.name + "|" + this.parcel  + "|" + this.checkoutModel.meta.value)

    },
  },
  mounted() {
    this.$el.addEventListener('handleOnPoint', event => this.handleOnPoint(event));
  }
};
</script>

<style scoped src='./index.scss' lang="scss"></style>