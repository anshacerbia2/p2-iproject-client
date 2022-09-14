<template>
  <header>
    <NavBar />
  </header>
  <section class="auth-section">
    <div id="register-page">
      <div class="register-page-wrapper">
        <h1>Register</h1>
        <div class="register-page-form">
          <form v-on:submit.prevent="registerMethod(registerInput)">
            <div class="form-floating">
              <input v-model="registerInput.fName" type="text" name="fName" id="register-fName" class="form-control"
                placeholder="johndoe" autocomplete="none" autofocus required>
              <label for="register-fName">First Name</label>
            </div>
            <div class="invalid-validation" v-if="registerError.fName">{{ registerError.fName }}</div>
            <div class="form-floating">
              <input v-model="registerInput.lName" type="text" name="lName" id="register-lName" class="form-control"
                placeholder="johndoe" autocomplete="none" autofocus required>
              <label for="register-lName">Last Name</label>
            </div>
            <div class="invalid-validation" v-if="registerError.lName">{{ registerError.lName }}</div>
            <div class="form-floating">
              <input v-model="registerInput.username" type="text" name="username" id="register-username"
                class="form-control" placeholder="johndoe" autocomplete="none" autofocus required>
              <label for="register-username">Username</label>
            </div>
            <div class="invalid-validation" v-if="registerError.username">{{ registerError.username }}</div>
            <div class="form-floating">
              <input v-model="registerInput.email" type="email" name="email" id="register-email" class="form-control"
                placeholder="example@mail.com" autocomplete="none" autofocus>
              <label for="register-email">Email Address</label>
            </div>
            <div class="invalid-validation" v-if="registerError.email">{{ registerError.email }}</div>
            <div class="form-floating">
              <input v-model="registerInput.password" :type="registerPwType" name="password" id="register-password"
                class="form-control" placeholder="Password">
              <label for="register-password">Password</label>
              <div class="password-visibility" @click="registerVisibility">
                <span class="material-icons">{{ isVisibleRegister }}</span>
              </div>
            </div>
            <div class="invalid-validation" v-if="registerError.password">{{ registerError.password }}</div>
            <div class="form-floating">
              <input v-model="registerInput.city" type="text" name="city" id="register-city" class="form-control"
                placeholder="johndoe" autocomplete="none" autofocus required>
              <label for="register-city">City</label>
            </div>
            <div class="invalid-validation" v-if="registerError.city">{{ registerError.city }}</div>
            <GlobalButton :btnType="'submit'" :btnName="'Register'" :btnIcon="''" />
          </form>
        </div>
        <div class="login-link">
          <p>Already have an account? <RouterLink to="/login">Login now!</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { mapState, mapActions } from "pinia";
import { useGlobalStore } from "../stores/global";
import NavBar from '../components/Navbar.vue';
import GlobalButton from '../components/GlobalButton.vue';

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
  data() {
    return {
      registerPwType: 'password',
      isVisibleRegister: 'visibility',
      registerInput: {
        fName: '',
        lName: '',
        username: '',
        email: '',
        password: '',
        city: ''
      },
    }
  },
  components: {
    NavBar,
    GlobalButton
  },
  computed: {
    ...mapState(useGlobalStore, ["registerError"]),
  },
  methods: {
    ...mapActions(useGlobalStore, ["registerMethod"]),
    registerVisibility() {
      if (this.isVisibleRegister === 'visibility') {
        this.isVisibleRegister = 'visibility_off';
        this.registerPwType = 'text';
      } else {
        this.isVisibleRegister = 'visibility';
        this.registerPwType = 'password';
      }
    }
  }
}
</script>