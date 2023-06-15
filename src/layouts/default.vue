<template>
  <div>
    <p v-if="$fetchState.pending">Hold on...</p>
    <p v-else-if="$fetchState.error">
      Oh no! There was an error fetching the data in layouts/default.vue
    </p>
    <div v-else>
      <AuthenticationProvider>
        <BasketProvider>
          <LayoutWithAsideView>
            <template v-slot:view-to-toggle v-if="isStoreActive">
              <TinyBasket v-slot:view-to-toggle />
            </template>
            <template>
              <PreviewBar v-if="isPreviewMode"/>
              <LayoutHeader>
                <template v-slot:actions>
                  <div class="layout__actions">
                    <BasketButton v-if="isStoreActive"/>
                  </div>
                </template>
                <template v-slot:navigation v-if="isStoreActive">
                  <div class="blured__div"/>

                  <div class="">
                    <LayoutNavigation :nav-items="navItems[0].children" :is-active="isActive" @click="handleClick"/>
                    <BurgerButton @click="handleClick"/>
                  </div>
                </template>
              </LayoutHeader>
              <nuxt v-if="isStoreActive"/>
              <div v-if="!isStoreActive" class="turn__off__store__style">
                <h1>
                  Sklep chwilowo nieczynny, <br/> przepraszamy za niedogodności
                </h1>
              </div>
              <LayoutFooter/>
              <div class="social__media__div">
                <img src="/Group%2098.png"/>
                <a href="https://instagram.com/yfavc_store?igshid=YmMyMTA2M2Y=">
                  <img src="/ig.png"/>
                </a>
                <a href="https://www.youtube.com/channel/UCHZ3EV3Si5y_DYjVvXDuV_w">
                  <img src="/yt.png"/>
                </a>
              </div>
            </template>
          </LayoutWithAsideView>
        </BasketProvider>
      </AuthenticationProvider>
    </div>
  </div>
</template>

<script>
import AuthenticationProvider from "../providers/Authentication";
import BasketProvider from "../providers/Basket";
import { simplyFetchFromGraph } from "/lib/graph";
import TinyBasket from "../components/Basket/TinyBasket";

export default {
  components: { AuthenticationProvider, BasketProvider, TinyBasket },
  data() {
    return {
      isPreviewMode: this.$route.query.preview,
      navItems: [],
      isActive: false,
      isStoreActive: true,
      fetchedValue: null,
    };
  },
  computed: {
    linkUserArea() {
      const { isLoggedIn } = this.$store.state.authentication;
      /*
       * We provide the most relevant URL to have the best user experience
       * that depends on the user authentication.
       *
       * For identified users, the URL provided is "/account"
       * For anonymous users, the URL provided is "/login"
       */
      return isLoggedIn ? "/account" : "/login";
    },
  },
  head() {
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    return {
      link: [
        {
          rel: "canonical",
          href: `${process.env.SITE_URL}${this.$route.path}`,
        },
        this.retrieveAttributesHreflang(locale.appLanguage),
      ],
    };
  },
  methods: {
    handleClick: function () {
      this.isActive = !this.isActive
    },
    retrieveAttributesHreflang(languageCountryLocale) {
      // hreflang has the format language-country (en-US, en-UK).
      return {
        rel: "alternate",
        hreflang: languageCountryLocale,
        href: `${process.env.SITE_URL}${this.$route.path}`,
      };
    },
  },
  async fetch() {
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    /**
     * Getting the top level catalogue items
     * to show in the header and footer
     */
    const { data } = await simplyFetchFromGraph({
      query: `
        query GET_NAV_ITEMS($language: String!) {
          catalogue(language: $language) {
            children {
              id
              name
              path
              children {
              id
              name
              path
              }

            }
          }
        }
      `,
      variables: {
        language: locale.crystallizeCatalogueLanguage,
      },
    });
      const fetchedData = await simplyFetchFromGraph({
      query: `
  query TURN_OFF_STORE{
    catalogue(language:"pl" path:"/frontpage-2021") {
      component(id: "turn-onoff") {
        content {
          ...on BooleanContent {
            value
          }
        }
      }
      }
  }
`,
    })
    /**
     * Filter the items you don't want in the nav bar
     */
    this.navItems = data.catalogue.children.filter(
      (c) => !c.name.startsWith("_")
    );
    this.fetchedValue = fetchedData.data.catalogue.component.content.value
    this.isStoreActive = !this.fetchedValue
  },
};
</script>

<style scoped lang="scss">
.layout__actions {
  display: flex;

}

.blured__div {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(0,0,0, 0.7);
  backdrop-filter: blur(3px);

  z-index: 1;

  @media (min-width: 1024px) {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .layout__actions > * {
    margin-left: 0.35rem;
  }
}

.social__media__div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  bottom: 80px;
  z-index: 9999999;

  img {
    width: 30px;
    height: auto;
    margin-bottom: 10px;
    z-index: 9999999;

  }

  a {
    z-index: 9999999;

    img {
      width: 50px;
      height: 50px;
      margin: 0;
      z-index: 9999999;

    }
  }

}
.turn__off__store__style {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    color: #ffffff;
  }
}
</style>