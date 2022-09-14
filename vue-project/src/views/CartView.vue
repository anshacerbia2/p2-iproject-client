<template>
  <header>
    <NavBar />
  </header>
  <section class="product-list">
    <div class="container">
      <div class="custom-row">
        <div class="product-detail-container">
          <div v-if="cart">
            <CartItem v-for="item in cart" :key="'cart-' + item.id" @click.stop="fetchProduct(item.Product.id)"
              :item="item" />
          </div>
          <h3 class="product-title" v-else>No items</h3>
        </div>
        <div class="product-cart-container">
          <div class="product-stock">
            <h4 class="product-title">Total Harga</h4>
            <p class="total-price">{{ toIDR(totalPrice) }}</p>
            <button type="button" class="btn custom-btn-1" v-if="cart.length" @click="showPayments">
              <span class="material-symbols-outlined" style="margin-right:12px">add_shopping_cart</span>
              Beli({{ totalAmount }})
            </button>
            <button type="button" class="btn custom-btn-1" v-else>
              <span class="material-symbols-outlined" style="margin-right:12px">add_shopping_cart</span>
              Beli({{ totalAmount }})
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="popup-box" v-if="show" @click="hidePayments">
    <div class="pop-content">
      <h1>Choose Payment</h1>
      <div class="bank-list">
        <div class="bank" @click.stop="charge('mandiri')">
          <img src="../assets/mandiri.png" alt="">
          <span>Mandiri</span>
        </div>
        <div class="bank" @click.stop="charge('bni')">
          <img src="../assets/bni.png" alt="">
          <span>BNI</span>
        </div>
        <div class="bank" @click.stop="charge('bri')">
          <img src="../assets/bri.png" alt="">
          <span>BRI</span>
        </div>
        <div class="bank" @click.stop="charge('bca')">
          <img src="../assets/bca.png" alt="">
          <span>BCA</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGlobalStore } from "../stores/global";
import NavBar from '../components/Navbar.vue';
import CartItem from "../components/CartItem.vue"
import MovieBox from "../components/MovieBox.vue"

export default {
  data() {
    return {
      show: false
    }
  },
  components: {
    NavBar,
    CartItem,
    MovieBox
  },
  computed: {
    ...mapState(useGlobalStore, ['cart']),
    totalPrice() {
      let total = 0;
      if (!this.cart.length) {
        return total;
      } else {
        this.cart.forEach(v => {
          total += ((+v.amount) * v.Product.price);
        })
        return total;
      }
    },
    totalAmount() {
      let total = 0;
      if (!this.cart.length) {
        return total;
      } else {
        this.cart.forEach(v => {
          total += (+v.amount);
        })
        return total;
      }
    }
  },
  methods: {
    ...mapActions(useGlobalStore, ['fetchCart', 'fetchProduct', 'charge']),
    toIDR(price) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    },
    showPayments() {
      this.show = true;
    },
    hidePayments() {
      this.show = false;
    }
  },
  async created() {
    await this.fetchCart()
  }
}
</script>