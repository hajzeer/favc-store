<template>
<div class="container__inner--spinner">
  <Spinner/>
</div>
</template>

<script>
import {serviceApi} from "@@/lib/service-api";
import {loadStripe} from "@stripe/stripe-js";
import Spinner from "@/components/Spinner";
export default {
  components: {Spinner},
  name: "index",
  data() {
    return {
      orderId: '',
      id: '',
      checkoutModel: [],
      stripePaymentIntent: null,
      status: "idle",
      redirect: "if_required",
      isLoading: true,
      publishableKey: null,
    }
  },
  async fetch() {
    const data = await serviceApi({
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

    this.publishableKey = data.data.paymentProviders.stripe.config.publishableKey;
  },
  async beforeMount() {
    const model = sessionStorage.getItem("model")
    const id = sessionStorage.getItem("id")
    this.checkoutModel = JSON.parse(model)
    this.id = JSON.parse(id)
  },
  mounted() {
      this.confirmPayment()

  },
  methods: {
    async confirmPayment() {
      const key = process.env.PUBLISHABLE_KEY

      if(this.id.clientSecret) {
        const stripe = await loadStripe(`${key}`);
        const { error, paymentIntent } = await stripe.retrievePaymentIntent(
            this.id.clientSecret
        );
        if (error) {
          this.status = error
        } else {
          this.status = paymentIntent.status
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
            sessionStorage.removeItem("id")
            sessionStorage.removeItem("model")
            await this.$store.dispatch('orderId/setId', this.orderId)
            await this.$store.dispatch('basket/empty', [])
            await this.$router.push(`/confirmation/${orderId}`)
          } else {
            console.log("err")
          }
        } else {
          this.isDisabled = false
        }
      }

      }
    }
}
</script>

<style scoped lang="scss">
.container__inner--spinner {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>