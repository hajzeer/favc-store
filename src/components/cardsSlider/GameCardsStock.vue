<template>
  <div class="cards">
    <GameCard
        v-for="(image, index) in data"
        :key="image.url"
        :image="image"
        :is-current="index === 0"
        @cardAccepted="$emit('cardAccepted');"
        @cardRejected="$emit('cardRejected');"
        @cardSkipped="$emit('cardSkipped');"
        @hideCard="$emit('hideCard');"
    />
  </div>
</template>

<script>
import GameCard from "./GameCard";

export default {
  components: {
    GameCard
  },

  props: {
    data: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.cards {
  position: relative;
  width: 100%;
  height: 55vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    width: 300px;
    left: 0;
    top: 50%;
    height: 60vh;
  }
}
</style>
