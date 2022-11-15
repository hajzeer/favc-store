<template>
    <div  class="container">
      <div v-if="loading" class="container__inner">
        <h2>Dziękujemy za zamówienie {{innerOrder.customer.firstName}}</h2>
        <p class="info__paragraph">
          Twoje zamówienie zostanie dostarczone na adres:
        </p>
        <ul>
          <li class="address__list">{{innerOrder.customer.addresses[0].email}}</li>
          <li class="address__list">{{innerOrder.customer.addresses[0].street}}</li>
          <li class="address__list">{{innerOrder.customer.addresses[0].postalCode}}, {{innerOrder.customer.addresses[0].city}}</li>
        </ul>


        <h2>Twoje zamówienie:</h2>
        <ul class="tiny-basket__list">
          <div class="line"/>
          <li class="tiny-basket__list-item" v-for="item in innerOrder.cart">
            <img :src="item.imageUrl" class="product__image"/>
            <p>
              {{ item.name }}
            </p>
            <p>
              {{ item.quantity }}
            </p>
            <p class="price">
              {{ item.price.gross }} {{item.price.currency}}
            </p>
          </li>
        </ul>
        <div class="line"/>
        <ul>
          <li class="tiny-basket__list-item">
            <p>
              Wartość netto:
            </p>
            <p>
              {{innerOrder.total.net.toFixed(2)}} {{innerOrder.total.currency}}
            </p>
          </li>
          <li class="tiny-basket__list-item">
            <p>
              Podatek VAT:
            </p>
            <p>
              {{(innerOrder.total.gross - innerOrder.total.net).toFixed(2)}} {{innerOrder.total.currency}}
            </p>
          </li>
          <li class="tiny-basket__list-item">
            <p>
              Suma:
            </p>
            <p>
              {{innerOrder.total.gross}} {{innerOrder.total.currency}}
            </p>
          </li>
        </ul>
        <NuxtLink to="/">Wróć do strony głównej</NuxtLink>
      </div>
      <div v-else class="container__inner--spinner">
        <Spinner/>
        <NuxtLink to="/" class="loader__link">Wróć do strony głównej</NuxtLink>

      </div>
    </div>

</template>

<script>

import {serviceApi} from "@@/lib/service-api";
import BasketItem from "@/components/Basket/TinyBasket/Item";
import Spinner from "@/components/Spinner";

export default {
  components: {BasketItem, Spinner},
  data() {
    return{
      order: [],
      innerOrder: [],
      loading: false,
    }
  },
  async fetch() {

    const id = this.$route.path.replace('/confirmation/', '')
    this.order = await serviceApi({
        query: `
          query getOrder($id: String!){
            orders {
              get(id: $id)
            }
          }
        `,
        variables: {
          id: this.$store.state.orderId.orderId || id

        },
      })
     this.innerOrder = await this.order.data.orders.get
    if(this.order) {
      this.loading = true
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  min-height: 100vh;
  height: auto;

  @media (min-width: 1024px) {
    min-height: 100vh;
    width: 60%;
    position: relative;
    left: 35%;
  }
}
.info__paragraph {
  align-self: flex-start;
}

h2 {
  font-family: Elevon, sans-serif;
  color: var(--color-text-main);
  align-self: flex-start;
  width: 100%;

  @media (min-width: 1024px) {
    font-size: 25px;
  }
}

.address__list {
  margin: 20px 0;
}

p {
  margin: 0;
  font-weight: 400;
  font-family: montserrat, sans-serif;
  text-transform: uppercase;
}

li {
  list-style: none;
  font-weight: 400;
  font-family: montserrat, sans-serif;

}

.container__inner {
  width: 100%;
  margin-top: 150px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    margin-top: 50px;

  }
}

.container__inner--spinner {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tiny-basket__list,
.tiny-basket__list-item {
  margin: 0;
  padding: 0;

}

ul {
  width: 100%;
}

.tiny-basket__list-item {
  list-style: none;
  width: 100%;
  padding: 10px;
  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;


}

.tiny-basket__list {
}

.price {
  width: 100px;
}

.product__image {
  width: 90px;
  margin: 10px 10px 10px 0 ;
  height: auto;
}

a {
  font-family: Elevon, sans-serif;
  font-size: 20px;
  margin-top: 50px;


}

.loader__link {
align-self: center;
  justify-self: center;
}

.line {
  position: relative;
  width: 100%;
  height: 1px;
  border-radius: 25%;
  left: 0;
  background: #445FB0;


}

</style>