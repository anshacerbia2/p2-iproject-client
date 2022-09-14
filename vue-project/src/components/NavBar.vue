<script>
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

export default {
  computed: {
    isAuth() {
      return localStorage.getItem("access_token");
    },
    // isHome() {
    //   return this.$route.name === 'login' || this.$route.name === 'register';
    // }
  },
  methods: {
    logoutMethod() {
      localStorage.clear();
      Toast.fire({ icon: 'success', title: 'You are logged out' });
      this.$router.push('/login');
    }
  },
}
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <ul class="list-unstyled mb-0 navbar-wrapper">
        <li>
          <RouterLink to="/" class="navbar-logo" href="javascript:void(0)">
            <img src="../assets/logo.svg" alt="">
            <span id="appName">C-Store</span>
          </RouterLink>
        </li>
        <li style="flex-grow: 1;"></li>
        <li>
          <RouterLink to="/" class="route-link">
            <span class="material-symbols-outlined">home</span>
          </RouterLink>
        </li>
        <li v-if="!isAuth">
          <RouterLink to="/login" class="route-link">
            <span class="material-symbols-outlined">
              login
            </span>
          </RouterLink>
        </li>
        <li v-if="isAuth">
          <RouterLink to="/mycart" class="route-link">
            <span class="material-symbols-outlined">
              shopping_cart
            </span>
          </RouterLink>
        </li>
        <li v-if="isAuth" class="nav-item">
          <a href="javascript:void(0)" class="route-link" @click="logoutMethod">
            <span class="material-symbols-outlined">exit_to_app</span>
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style>
.navbar {
  height: 60px;
  border-bottom: 1px solid #444444;
}

.navbar-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.navbar-logo>img {
  height: 40px;
}

.navbar-logo:hover {
  background-color: transparent;
}

#appName {
  margin-left: 10px;
  color: rgba(255 255 255 / 87%);
  font-family: 'Source Sans Pro';
  font-size: 20px;
  line-height: 40px;
  font-weight: 600;
}

#whois {
  padding: 0 12px;
  color: rgba(255 255 255 / 87%);
}

.nav-item {
  padding-left: 10px;
}

.route-link {
  margin-left: 12px;
  text-decoration: none;
  display: flex;
  align-items: center;
  background-color: transparent;
  color: rgba(255 255 255 / 87%);
  font-family: 'Source Sans Pro';
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
}

.route-link span {
  margin-right: 4px;
  font-size: 20px;
  color: rgba(255 255 255 / 87%);
  transition: color 0.2s ease-in-out;
}

.route-link:hover,
.route-link:hover span {
  color: #42b883;
}

.router-link-active.nav-bookmarks,
.router-link-active.nav-bookmarks>span {
  color: #42b883 !important;
}
</style>