<template>
  <div>
    <template v-if="publishableKey && isDisabled === false">
      <StripeElementPayment
        ref="stripeCardRef"
        :pk="publishableKey"
        :elements-options="elementsOptions"
        :confirm-params="confirmParams"
        v-if="!isLoading"
        :redirect="redirect"

      />
      <Button @click="handleSubmit" :disabled="isDisabled" alignment="center" type="button" class="submit__button">
        {{ $t("checkout.payNow") }}
      </Button>
    </template>
    <Spinner v-else />
  </div>
</template>

<script>
import { serviceApi } from "/lib/service-api";
import { StripeElementPayment } from "@vue-stripe/vue-stripe";
import {loadStripe} from '@stripe/stripe-js'

export default {
  components: { StripeElementPayment },
  props: {
    checkoutModel: {
      type: Object,
    }
  },
  data() {
    return {
      isDisabled: false,
      orderId: '',
      stripePaymentIntent: null,
      status: "idle",
      redirect: "if_required",
      isLoading: true,
      publishableKey: null,
      elementsOptions: {

        appearance: {
          theme: 'night'
        }, // appearance options
      },
      confirmParams: {
        return_url:  `https://yfavc.com/confirmation/`, // success url
        payment_method_data: {
          billing_details: {
            name: `${this.checkoutModel.customer.firstName} ${this.checkoutModel.customer.lastName}`,
            email: `${this.checkoutModel.customer.addresses[0].email}`,
            phone: `${this.checkoutModel.customer.addresses[0].phone}`,
            address: {
              city: `${this.checkoutModel.customer.addresses[0].city}`,
              country: `${this.checkoutModel.customer.addresses[0].country}`,
              line1: `${this.checkoutModel.customer.addresses[0].street}`,
              postal_code: `${this.checkoutModel.customer.addresses[0].postalCode}`,
            },

          },
        },
        metadata: {
          PACZKOMAT: `${this.checkoutModel.customer.meta[0].value}`
        }
      },
    };
  },
  async beforeCreate() {
    const { data } = await serviceApi({
      query: `
      {
        paymentProviders {
          stripe {
            config
          }
        }
      }
    `,
    });

    this.publishableKey = data.paymentProviders.stripe.config.publishableKey;
  },
  mounted() {
    this.generatePaymentIntent();

  },

  methods: {
    async generatePaymentIntent() {

      this.stripePaymentIntent = await serviceApi({
        query: `
        mutation StripePaymentIntent($checkoutModel: CheckoutModelInput!) {
          paymentProviders {
            stripe {
              createPaymentIntent(checkoutModel: $checkoutModel)
            }
          }
        }
        `,
        variables: {
          checkoutModel: this.checkoutModel
        }
      })

      this.elementsOptions.clientSecret =
          this.stripePaymentIntent?.data?.paymentProviders?.stripe
              ?.createPaymentIntent?.client_secret;
      this.status = this.stripePaymentIntent.status
      await this.$store.dispatch('orderId/setId', this.elementsOptions)
      await this.$store.dispatch('orderId/setModel', this.checkoutModel)

      this.isLoading = false;

    },
    async go() {
      const stripe = await loadStripe(`${this.publishableKey}`);
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(
          this.elementsOptions.clientSecret
      );
      if (error) {
        this.status = error
      } else {
        this.status = paymentIntent.status

        setTimeout(() => {
          this.isDisabled = true;
        }, 2500)

      }
      if(this.status === "succeeded") {
        const response = await serviceApi({
          query: `
              mutation confirmStripeOrder($checkoutModel: CheckoutModelInput!, $paymentIntentId: String!) {
                paymentProviders {
                  stripe {
                    confirmOrder(checkoutModel: $checkoutModel, paymentIntentId: $paymentIntentId) {
                      success
                      orderId
                    }
                  }
                }
              }
            `,
          variables: {
            checkoutModel: this.checkoutModel,
            paymentIntentId: paymentIntent.id
          }
        });
        const {
          success,
          orderId
        } = response.data.paymentProviders.stripe.confirmOrder;

        if (success) {
          this.orderId = orderId
          await this.$store.dispatch('orderId/setId', this.orderId)
          await this.$store.dispatch('basket/empty', [])
          await this.$router.push(`/confirmation/${orderId}`)
        } else {
          console.log("err")
        }
      } else {
        this.isDisabled = false
      }

    },
    handleSubmit() {
      this.status = "confirming";
      this.go();
      this.$refs.stripeCardRef.submit();

    },
  },
};
</script>

<style scoped lang="scss">

.submit__button {
  background: var(--color-text-main);
  margin-top: 25px
}
</style>