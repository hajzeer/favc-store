<template>
<div class="container">
  <h2>
    {{error.statusCode}}<br/><br/> {{error.message}}
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
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Elevon;
  text-transform: uppercase;
  h2 {
    width: 80%;
  }
  a {
    width: 80%;
  }

}
</style>