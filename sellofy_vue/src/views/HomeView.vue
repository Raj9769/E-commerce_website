<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to Sellofy
        </p>
        <p class="subtitle">
          The best online marketplace for buying all the clothing items
        </p>
      </div>

    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest Products</h2>
      </div>
      
      <ProductBox v-for="product in latestProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductBox from '@/components/ProductBox.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
    ProductBox
  },
    mounted(){
      this.getlatestProducts()

      document.title = 'Home | Sellofy'
    },
    methods: {
      async getlatestProducts(){
        this.$store.commit('setIsLoading', true)

        await axios
        .get('/api/v1/latest-products/')
        .then(response => {
          this.latestProducts = response.data
          })
          .catch(error => {
            console.error(error)
          })

        this.$store.commit('setIsLoading', false)

      }
    }
}
</script>

