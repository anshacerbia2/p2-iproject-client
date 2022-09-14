<template>
  <div class="custom-grid-card">
    <div class="custom-grid-card-bg" :style="`background-image: url('${product.imgUrl}');`"></div>

    <div class="card-content">
      <span class="card-title">{{ product.name }}</span>
      <span class="card-price">{{ toIDR(product.price) }}</span>
      <!-- <img :src="product.imgUrl" alt=""> -->
      <!-- <div class="card-rating">
        <span class="material-symbols-rounded rating-icon-full" v-for="(num, i) in getRating(movie.rating)"
          :key="'movieRate' + movie.id + i">star_rate</span>
        <span class="material-symbols-rounded rating-icon-half"
          v-if="isEven(movie.rating) === false">star_rate_half</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGlobalStore } from "../stores/global";

export default {
  data() {
    return {
      isAuth: false
    }
  },
  props: ['product'],
  methods: {
    // ...mapActions(useGlobalStore, ["products"]),
    toIDR(price) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    }
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
    // const access_token = localStorage.getItem('access_token');
    // if (access_token) this.isAuth = true;
  },
}
</script>