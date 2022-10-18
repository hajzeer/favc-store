<template>
  <div class="complaint">
    <ol>
      <li v-for="text in data" :key="text.text"><p>{{text.text}}</p></li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "index",

  data() {
    return {
      data: [
        {text: 'Sklep jest zobowiązany dostarczyć przesyłkę maksymalnie do 30 dni od daty potwierdzenia zamówienia. Po tym czasie klient ma możliwość odstąpienia od umowy i zwrotu pieniędzy. Sklep ma 14 dni na zwrot kwoty klientowi.'},
        {text: 'Realizacja zamówienia odbywa się w ciągu 2 dni roboczych od momentu otrzymania płatności.'},
        {text: 'Dostawa od poniedziałku do piątku, z wyjątkiem dni ustawowo wolnych od pracy.'},
        {text: 'Koszt przesyłki będzie zawsze określony w trakcie składania zamówienia.'},
        {text: 'Płatności za zamówione produkty w formie przelewu bankowego - powinny wpłynąć na rachunek bankowy sklepu w ciągu 3 dni od dnia potwierdzenia zamówienia. W innym wypadku zamówienie zostaje anulowane.'},
        {text: 'Do każdego zamówienia wystawiana jest faktura, dostarczana wraz z przesyłką.'},
      ]
    }
  },
}
</script>

<style scoped src='./index.scss' lang="scss">

</style>