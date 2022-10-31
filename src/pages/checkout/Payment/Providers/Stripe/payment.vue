<template>
  <div>
    <template v-if="publishableKey">
      <StripeElementCard
        ref="stripeCardRef"
        :pk="publishableKey"
        :hidePostalCode="true"
        @token="handleStripeToken"
      />
      <Button @click="handleSubmit" alignment="center" type="button" class="submit__button">
        {{ $t("checkout.payNow") }}
      </Button>
    </template>
    <Spinner v-else />
  </div>
</template>

<script>
import { serviceApi } from "/lib/service-api";
import { StripeElementCard } from "@vue-stripe/vue-stripe";

export default {
  components: { StripeElementCard },
  props: {
    checkoutModel: {
      type: Object,
    }
  },
  data() {
    return {
      status: "idle",
      publishableKey: null,
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
  methods: {
    async handleStripeToken(token) {
      // 1. Confirm Card Payment
      // 2. If payment intent succeeded, do "mutation confirmStripeOrder"
      // 3. Redirect to /confirmation/{crystallizeOrderId}?emptyBasket
    },
    handleSubmit() {
      this.status = "confirming";
      this.$refs.stripeCardRef.submit();
    },
  },
};
</script>

<style scoped lang="scss">

.submit__button {
  background: var(--color-text-main);
}
</style>