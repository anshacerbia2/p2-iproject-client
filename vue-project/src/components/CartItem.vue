<template>
  <div class="cart-item">
    <div class="cart-item-box">
      <img class="cart-item-img" :src="item.Product.imgUrl" :alt="item.Product.name">
      <div class="cart-item-detail">
        <h4 class="cart-item-name">{{ item.Product.name }}</h4>
        <span class="cart-item-price">{{ toIDR(item.Product.price) }}</span>
        <div class="cart-item-amount">
          <span class="d-block">Amount : &nbsp;{{ item.amount }}</span>
          <a href="javascript:void(0)" @click.stop="deleteCart(item.id);" type="button" class="btn">
            <span class="material-symbols-outlined">delete</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGlobalStore } from "../stores/global";
export default {
  props: ['item'],
  methods: {
    ...mapActions(useGlobalStore, ['fetchCart', 'deleteCart']),
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
    },
    toIDR(price) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    },
  },
  async created() {
    await this.fetchCart()
  }
}
</script>

