<template>
  <footer>
    <div>
      <ul class="info__nav"
          v-for="(link, index) in hrefList"
      >
        <NuxtLink
            v-if="index !== 3 && index !== 4"
            :to="link.href">
          <li>{{ link.name }}</li>
        </NuxtLink>
        <a :href="link.href" v-if="index === 3 || index === 4" target="_blank">
          <li>{{ link.name }}</li>
        </a>
      </ul>
    </div>
    <div class="creator__div">
      <img src="/breath.png"/>
      <p>©2022 Wszelkie prawa zastrzeżone <br/>
        Created with love for design <br/>
        Let's be unique <a href="https://www.breathdesignstudio.com/">BREATH DESIGN STUDIO</a></p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      hrefList: [
        {name: "Dostawa i płatność", href: '/delivery&payment'},
        {name: "Zwroty i reklamacje", href: '/complaint'},
        {name: "Kontakt", href: '/contact'},
        {name: "Regulamin", href: 'https://www.breathdesignstudio.com/'},
        {name: "Polityka Prywatności", href: 'https://www.breathdesignstudio.com/'}
      ]
    }
  }
}
</script>

<style scoped src='./index.scss' lang="scss"></style>
