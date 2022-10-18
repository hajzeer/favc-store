<template>
  <div class="crystallize-components-images">
    <template class="container">
      <GameCardsStock
          :data="data"
          @cardAccepted="handleCardAccepted"
          @cardRejected="handleCardRejected"
          @cardSkipped="handleCardSkipped"
          @hideCard="removeCardFromDeck"
      />

    </template>
  </div>
</template>

<script>
import GameCardsStock from "@/components/cardsSlider/GameCardsStock";

export default {
  components: {GameCardsStock},

  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleCardAccepted() {
      console.log("handleCardAccepted");
    },
    handleCardRejected() {
      console.log("handleCardRejected");
    },
    handleCardSkipped() {
      console.log("handleCardSkipped");
    },
    removeCardFromDeck() {
      this.data.push(this.data.shift());
      console.log(this.data)

    },
  },
};
</script>

<style scoped src='./images.scss' lang="scss">
@import "../../cardsSlider/styles/mixins.scss";


</style>
