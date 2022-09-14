<template>
  <header>
    <NavBar />
  </header>
  <section class="auth-section">
    <div id="login-page">
      <div class="login-page-wrapper">
        <h1>Login</h1>
        <div class="login-page-form">
          <form v-on:submit.prevent="loginMethod(loginInput)">
            <div class="invalid-validation global-error-validation" v-if="loginError.global">{{ loginError.global }}
            </div>
            <div class="form-floating">
              <input v-model="loginInput.email" type="email" name="email" id="floatingEmailLoginPage"
                class="form-control" placeholder="example@mail.com" autocomplete="none" autofocus>
              <label for="floatingEmailLoginPage">Email Address</label>
            </div>
            <div class="invalid-validation" v-if="loginError.email">{{ loginError.email }}</div>
            <div class="form-floating">
              <input v-model="loginInput.password" :type="loginPwType" name="password" id="floatingPasswordLoginPage"
                class="form-control" placeholder="Password">
              <label for="floatingPasswordLoginPage">Password</label>
              <div class="password-visibility" @click="loginVisibility">
                <span class="material-icons">{{ isVisibleLogin }}</span>
              </div>
            </div>
            <div class="invalid-validation" v-if="loginError.password">{{ loginError.password }}</div>
            <GlobalButton :btnType="'submit'" :btnName="'Login'" :btnIcon="''" />
          </form>
        </div>
        <div class="register-link">
          <div id="googleButton" style="margin-bottom: 15px;"></div>
          <p>Don't have an account? <RouterLink to="register">Register now!</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGlobalStore } from "../stores/global";
import NavBar from '../components/Navbar.vue';
import GlobalButton from '../components/GlobalButton.vue';

export default {
  data() {
    return {
      loginPwType: 'password',
      isVisibleLogin: 'visibility',
      loginInput: {
        email: '',
        password: ''
      }
    }
  },
  components: {
    NavBar,
    GlobalButton
  },
  computed: {
    ...mapState(useGlobalStore, ['loginError']),
  },
  methods: {
    ...mapActions(useGlobalStore, ["loginMethod", "googleLoginInit"]),
    loginVisibility() {
      if (this.isVisibleLogin === 'visibility') {
        this.isVisibleLogin = 'visibility_off';
        this.loginPwType = 'text';
      } else {
        this.isVisibleLogin = 'visibility';
        this.loginPwType = 'password';
      }
    },
  },
  async created() {
    this.googleLoginInit();
  },
}
</script>