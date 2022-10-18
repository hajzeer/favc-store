<template>
  <div class="complaint">
    <h1 class="page-header__title">ZWROTY<br/> I REKLAMACJE</h1>
    <ol>
      <li v-for="(text, index) in data" :key="text.text"><p>{{text.text}}<span v-if="index === 1">KLIKAJĄC TUTAJ</span></p></li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "index",

  data() {
    return {
      data: [
        {text: 'Klient ma możliwość zwrotu zakupionego towaru w ciągu 14 dni kalendarzowych od dnia otrzymania towaru.'},
        {text: 'Zwracany towar nie może być uszkodzony lub zabrudzony. Jednakże może nosić wyłącznie normalne ślady użytkowania. Dodatkowo należy do niego dołączyć otrzymane opakowanie oraz fakturę. Zwrot towaru następuje na adres: YFAVC, ul. Piotrkowska 311/313, 90-980 Łódź, skr.poczt.57. Formularz zwrotu towaru pobierz '},
        {text: 'Zwrot pieniędzy następuję w ciągu 14 dni od dnia otrzymania przesyłki.'},
        {text: 'Produkty oferowane w sklepie są fabrycznie nowe.'},
        {text: 'Klient może dokonać reklamacji poprzez formularz. Należy wydrukować go, wypełnić, a następnie wysłać go w paczce wraz ze zwracanym towarem na adres: YFAVC, ul. Piotrkowska 311/313, 90-980 Łódź, skr.poczt.57.'},
        {text: 'Reklamacja zostanie rozpatrzona w ciągu 14 dni od otrzymania przesyłki zawierającej reklamowany produkt. O decyzji klient zostanie poinformowany drogą mailową.'},
      ]
    }
  },
}
</script>

<style scoped src='./index.scss' lang="scss">

</style>