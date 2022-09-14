<template>
  <header>
    <NavBar />
  </header>
  <section class="product-list">
    <div class="container">
      <div class="custom-row">
        <div class="product-detail-container">
          <div class="product-detail-bg">
            <img :src="product.imgUrl" alt="">
          </div>
          <div class="product-description">
            <h4 class="product-title">{{ product.name }}</h4>
            <h5 class="product-sold">Terjual : {{ product.sold }}</h5>
            <h5 class="product-sold">Kondisi : {{ product.condition }}</h5>
            <span class="product-price">{{ toIDR(product.price) }}</span>
            <p class="mt-4">{{ product.description }}</p>
            <div class="product-owner-detail">
              <img class="product-owner-img" src="https://source.unsplash.com/60x60?person" alt="">
              <div class="product-owner-name">
                <p class="mb-0">Penjual :</p>
                <p class="mb-0">{{ product.User.username }}</p>
              </div>
            </div>
            <p class="pengiriman">Pengiriman</p>
            <p class="d-flex align-items-center">
              <span class="material-icons" style="margin-right:12px;">
                location_on
              </span>
              Dikirim dari &nbsp;<b>{{ product.User.city }}</b>
            </p>
          </div>
        </div>
        <div class="product-cart-container">
          <div class="product-stock">
            <h4 class="product-title">Atur Jumlah</h4>
            <form @submit.prevent="addCart(product.id,stock)">
              <div class="product-cart-counter">
                <div @click="minCount">-</div>
                <input class="form-control" @keyup="inputHandler" type="text" v-model="stock">
                <div @click="addCount">+</div>
              </div>
              <small class="d-block mb-3">Stock: &nbsp;{{ product.stock }}</small>
              <div class="invalid-validation" v-if="amountError">{{ amountError }}</div>
              <h4 class="product-title">Total Harga</h4>
              <p class="total-price">{{ toIDR(product.price*stock) }}</p>
              <button type="submit" class="btn custom-btn-1">
                <span class="material-symbols-outlined" style="margin-right:12px">add_shopping_cart</span>
                Add to Cart
              </button>
            </form>
          </div>
        </div>
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
  data() {
    return {
      stock: 0
    }
  },
  components: {
    NavBar,
    // CustomNavBox,
    MovieBox
  },
  computed: {
    ...mapState(useGlobalStore, ['product', 'amountError']),

  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchProduct', 'addCart']),
    toIDR(price) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    },
    addCount() {
      if (+this.stock >= +this.product.stock) return;
      return this.stock++
    },
    minCount() {
      if (+this.stock < 1) return;
      return this.stock--;
    },
    // inputHandler() {
    //   if (+this.stock > +this.product.stock) this.stock = this.product.stock;
    //   if (+this.stock < 0) this.stock = 0;
    // }
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
  async created() {
    await this.fetchProduct(this.$route.params.id)
  }
}
</script>