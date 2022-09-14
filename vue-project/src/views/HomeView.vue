<template>
  <header>
    <NavBar />
  </header>
  <section class="product-list">
    <div class="container">
      <h1 style="margin-bottom: 10px; line-height: 55px">Product</h1>
      <div class="custom-row">
        <!-- <CustomNavBox /> -->
        <MovieBox />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGlobalStore } from "../stores/global";
import NavBar from '../components/Navbar.vue';
// import CustomNavBox from "../components/CustomNavBox.vue"
import MovieBox from "../components/MovieBox.vue"

export default {
  components: {
    NavBar,
    // CustomNavBox,
    MovieBox
  },
  computed: {
    ...mapState(useGlobalStore, []),
  },
  methods: {
    ...mapActions(useGlobalStore, []),
    //   isAuth() {
    //     return localStorage.getItem("access_token");
    //   },
    //   isBookmarked(bookmark) {
    //     const UserId = JSON.parse(localStorage.getItem('user')).id;
    //     if (!UserId) return false;
    //     if (bookmark.find(v => +v.UserId === +UserId)) return true;
    //     return false
    //   },
    //   isEven(num) {
    //     return Boolean(num % 2 === 0);
    //   },
    //   getRating(number) {
    //     return Math.floor(number / 2);
    //   },
    // },
    // async created() {
    //   await this.fetchMovies(this.$route.query.page ? this.$route.query.page : 1, this.$route.query.filter ? JSON.parse(this.$route.query.filter) : false, this.$route.query.search ? this.$route.query.search : false)
  },
}
</script>