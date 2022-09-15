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
      <!-- <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
      <div class="container bootstrap snippets bootdey">
        <div class="row">
          <div class="col-md-8 bg-white ">
            <div class="chat-message">
              <ul class="chat">
                <li class="left clearfix">
                  <span class="chat-img pull-left">
                    <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar">
                  </span>
                  <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="primary-font">John Doe</strong>
                      <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </li>
                <li class="right clearfix">
                  <span class="chat-img pull-right">
                    <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar">
                  </span>
                  <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="primary-font">Sarah</strong>
                      <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 13 mins ago</small>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis
                      ullamcorper ligula sodales at.
                    </p>
                  </div>
                </li>
                <li class="left clearfix">
                  <span class="chat-img pull-left">
                    <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar">
                  </span>
                  <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="primary-font">John Doe</strong>
                      <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </li>
                <li class="right clearfix">
                  <span class="chat-img pull-right">
                    <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar">
                  </span>
                  <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="primary-font">Sarah</strong>
                      <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 13 mins ago</small>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis
                      ullamcorper ligula sodales at.
                    </p>
                  </div>
                </li>
                <li class="left clearfix">
                  <span class="chat-img pull-left">
                    <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar">
                  </span>
                  <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="primary-font">John Doe</strong>
                      <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </li>
                <li class="right clearfix">
                  <span class="chat-img pull-right">
                    <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar">
                  </span>
                  <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="primary-font">Sarah</strong>
                      <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 13 mins ago</small>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis
                      ullamcorper ligula sodales at.
                    </p>
                  </div>
                </li>
                <li class="right clearfix">
                  <span class="chat-img pull-right">
                    <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar">
                  </span>
                  <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="primary-font">Sarah</strong>
                      <small class="pull-right text-muted"><i class="fa fa-clock-o"></i> 13 mins ago</small>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis
                      ullamcorper ligula sodales at.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="chat-box bg-white">
              <div class="input-group">
                <input class="form-control border no-shadow no-rounded" placeholder="Type your message here">
                <span class="input-group-btn">
                  <button class="btn btn-success no-rounded" type="button">Send</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGlobalStore } from "../stores/global";
import NavBar from '../components/Navbar.vue';
// import CustomNavBox from "../components/CustomNavBox.vue"
import MovieBox from "../components/MovieBox.vue"
// import db from "../db"

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

<style>
body {
  padding-top: 0;
  font-size: 12px;
  color: #777;
  background: #f9f9f9;
  font-family: 'Open Sans', sans-serif;
  margin-top: 20px;
}

.bg-white {
  background-color: #fff;
}

.friend-list {
  list-style: none;
  margin-left: -40px;
}

.friend-list li {
  border-bottom: 1px solid #eee;
}

.friend-list li a img {
  float: left;
  width: 45px;
  height: 45px;
  margin-right: 10px;
}

.friend-list li a {
  position: relative;
  display: block;
  padding: 10px;
  transition: all .2s ease;
  -webkit-transition: all .2s ease;
  -moz-transition: all .2s ease;
  -ms-transition: all .2s ease;
  -o-transition: all .2s ease;
}

.friend-list li.active a {
  background-color: #f1f5fc;
}

.friend-list li a .friend-name,
.friend-list li a .friend-name:hover {
  color: #777;
}

.friend-list li a .last-message {
  width: 65%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.friend-list li a .time {
  position: absolute;
  top: 10px;
  right: 8px;
}

small,
.small {
  font-size: 85%;
}

.friend-list li a .chat-alert {
  position: absolute;
  right: 8px;
  top: 27px;
  font-size: 10px;
  padding: 3px 5px;
}

.chat-message {
  padding: 60px 20px 115px;
}

.chat {
  list-style: none;
  margin: 0;
}

.chat-message {
  background: #f9f9f9;
}

.chat li img {
  width: 45px;
  height: 45px;
  border-radius: 50em;
  -moz-border-radius: 50em;
  -webkit-border-radius: 50em;
}

img {
  max-width: 100%;
}

.chat-body {
  padding-bottom: 20px;
}

.chat li.left .chat-body {
  margin-left: 70px;
  background-color: #fff;
}

.chat li .chat-body {
  position: relative;
  font-size: 11px;
  padding: 10px;
  border: 1px solid #f1f5fc;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.chat li .chat-body .header {
  padding-bottom: 5px;
  border-bottom: 1px solid #f1f5fc;
}

.chat li .chat-body p {
  margin: 0;
}

.chat li.left .chat-body:before {
  position: absolute;
  top: 10px;
  left: -8px;
  display: inline-block;
  background: #fff;
  width: 16px;
  height: 16px;
  border-top: 1px solid #f1f5fc;
  border-left: 1px solid #f1f5fc;
  content: '';
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
}

.chat li.right .chat-body:before {
  position: absolute;
  top: 10px;
  right: -8px;
  display: inline-block;
  background: #fff;
  width: 16px;
  height: 16px;
  border-top: 1px solid #f1f5fc;
  border-right: 1px solid #f1f5fc;
  content: '';
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}

.chat li {
  margin: 15px 0;
}

.chat li.right .chat-body {
  margin-right: 70px;
  background-color: #fff;
}

.chat-box {
  /*
    position: fixed;
    bottom: 0;
    left: 444px;
    right: 0;
  */
  padding: 15px;
  border-top: 1px solid #eee;
  transition: all .5s ease;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -ms-transition: all .5s ease;
  -o-transition: all .5s ease;
}

.primary-font {
  color: #3c8dbc;
}

a:hover,
a:active,
a:focus {
  text-decoration: none;
  outline: 0;
}
</style>