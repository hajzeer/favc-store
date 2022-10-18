<template>
  <div class="home-page">
    <img class="bag" src="/homePage/front1.png" alt="frontPageImage1"/>
      <div
          class="main__content"
           :style="lengthList"
      >
        <div
            v-for="(stack, index) in stackableContent"
            :key="stack.name"
            class="slide"
            ref="interact"
            :style="changePosition"
        >
          <NuxtLink
              :to="stack.path"
              :active="index === currentIndexFunc"
          >
            <img class="front2" :src="stack.components[0].content.images[0].url"/>
            <h1 class="page__title">{{stack.name}}</h1>
          </NuxtLink>
        </div>

      </div>

    <div class="carousel">
      <div class="carousel__content">
        <span class="outline">STREET STYLE / STREET STYLE</span>
        <span class="outline">STREET STYLE / STREET STYLE</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getData as getFolderData } from "../page-components/Folder/get-data";
import {
  getFolderGrids,
  getFolderStackableContent,
} from "../page-components/Folder/utils";

export default {

  data() {
    return {
      stackableContent: null,
      touch: {
        startX: 0,
        endX: 0,
      },
      slidePosition: {
        x: 0
      },
      currentIndex: 0,
    };
  },
  computed: {
    changePosition() {
        return {transform: 'translateX(-'+ this.currentIndex * 100+'%)'};
      },
    lengthList() {
      if(this.stackableContent === null) {
        return {width: 2 * 100 + "%"}
      } else {
        return {width: this.stackableContent.length * 100 + "%"}
      }
    },
    currentIndexFunc() {
      return this.currentIndex;
    }
  },
  async fetch() {
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    const { data } = await getFolderData({
      asPath: "/frontpage-2021",
      language: locale.crystallizeCatalogueLanguage,
      preview: this.$route.query.preview,
    });

    const { folder } = data;
    this.grid = getFolderGrids(folder);
    this.stackableContent = getFolderStackableContent(folder);

  },
  mounted() {
    this.$el.addEventListener('touchstart', event => this.touchstart(event));
    this.$el.addEventListener('touchmove', event => this.touchmove(event));
    this.$el.addEventListener('touchend', () => this.touchend());
    const timeout = () => {

      setTimeout(() => {
        if(this.currentIndex >= this.stackableContent.length - 1) {
          this.currentIndex = 0
        } else {
          this.currentIndex = this.currentIndex + 1
        }

        timeout()
      },5000)
    }

    timeout();
  },
  methods: {

    touchstart(event) {
      this.isAnimating = !this.isAnimating;
      this.touch.startX = event.touches[0].clientX
      this.touch.endX = 0
    },
    touchmove(event) {
      this.touch.endX = event.touches[0].clientX
    },
    touchend() {

      if(!this.touch.endX || Math.abs(this.touch.endX - this.touch.startX) < 20) {
        return;
      }
      if(this.touch.endX < this.touch.startX) {
        if(this.currentIndex >= this.stackableContent.length - 1) {
          this.currentIndex = 0
        } else {
          this.currentIndex = this.currentIndex + 1
        }
      } else {
        if(this.currentIndex <= 0) {
          this.currentIndex = this.stackableContent.length - 1
        } else {
          this.currentIndex = this.currentIndex - 1
        }      }
    },
  },
  head() {
    return {
      title: "YOUR FAV CIOTKA | STREET WEAR",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "null",
        },
      ],
    };
  },
};
</script>

<style scoped src='./index.scss' lang="scss"></style>
