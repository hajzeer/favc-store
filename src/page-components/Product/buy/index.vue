<template>
  <button class="product-page__buy" @click="$emit('click')" :disabled="stock <= 0">
    <template v-if="isLoading">
      <Spinner />
    </template>
    <template v-else-if="!isLoading && stock > 0">
      {{ $t("product.addToBasket") }}
    </template>
    <template v-else>
      {{ $t("product.outOfStock") }}
    </template>
  </button>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      default: false,
    },
  },
};

</script>

<style scoped src='./index.scss' lang="scss"></style>