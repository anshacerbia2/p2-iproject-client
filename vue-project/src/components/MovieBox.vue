<template>
  <div class="custom-col-movie-box">
    <div class="custom-grid-container">
      <MovieCard v-for="product in products" :key="'prouct-key' + product.id" :product="product"
        @click="fetchProduct(product.id)" />
    </div>
    <!-- <GlobalPagination :forKey="'moviePage'" :totalPage="totalMoviePage" :currentPage="currentMoviePage" /> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGlobalStore } from "../stores/global";
import NavBar from '../components/Navbar.vue';
// import GlobalPagination from "../components/GlobalPagination.vue";
import GlobalButton from "../components/GlobalButton.vue";
// import CustomNavBox from "../components/CustomNavBox.vue"
import MovieCard from "../components/MovieCard.vue"

export default {
  components: {
    NavBar,
    // CustomNavBox,
    GlobalButton,
    // GlobalPagination,
    MovieCard
  },
  computed: {
    ...mapState(useGlobalStore, ["products"]),
  },
  methods: {
    ...mapActions(useGlobalStore, ["fetchProduct", "fetchProducts"]),
    // isBookmarked(bookmark) {
    //   const UserId = JSON.parse(localStorage.getItem('user')).id;
    //   if (!UserId) return false;
    //   if (bookmark.find(v => +v.UserId === +UserId)) return true;
    //   return false
    // },
    // isEven(num) {
    //   return Boolean(num % 2 === 0);
    // },
    // getRating(number) {
    //   return Math.floor(number / 2);
    // },
  },
  async created() {
    await this.fetchProducts();
    // const queries = this.$route.query;
    // await this.fetchMovies(queries.page ? JSON.parse(queries.page) : 1, queries.filter ? JSON.parse(queries.filter) : false, queries.search ? JSON.parse(queries.search) : false);
  },
}
</script>