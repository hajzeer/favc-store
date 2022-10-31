<template>
<div class="container">
  <h2>
    {{error.statusCode}} {{error.message}}
  </h2>
  <NuxtLink to="/">
    Wróć do strony głównej
  </NuxtLink>
</div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Elevon;
  text-transform: uppercase;

}
</style>