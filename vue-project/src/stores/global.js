import { defineStore } from 'pinia';
import axios from "@/api/axios";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

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

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      product: null,
      products: [],
      cart: [],
      paymentLink: null,
      amountError: '',
      loginError: {
        global: '',
        email: '',
        password: ''
      },
      registerError: {
        fName: '',
        lName: '',
        username: '',
        email: '',
        password: '',
        city: '',
      },
    }
  },
  actions: {
    async registerMethod(...resArgs) {
      try {
        for (const key in this.registerError) this.registerError[key] = '';
        const { fName, lName, username, email, password, city } = resArgs[0];
        await axios.post('/register', { fName, lName, username, email, password, city });
        this.router.push('/login');
        Toast.fire({ icon: 'success', title: 'Register success, please login..' });
      } catch (error) {
        console.log(error.response.data);
        if (error.response.data.errors) {
          error.response.data.errors.forEach(v => {
            if (v.path === 'fName' && this.registerError.fName === '') this.registerError.fName = v.message;
            if (v.path === 'lName' && this.registerError.lName === '') this.registerError.lName = v.message;
            if (v.path === 'username' && this.registerError.username === '') this.registerError.username = v.message;
            if (v.path === 'city' && this.registerError.city === '') this.registerError.city = v.message;
            if (v.path === 'email' && this.registerError.email === '') this.registerError.email = v.message;
            if (v.path === 'password' && this.registerError.password === '') this.registerError.password = v.message;
          });
        } else {
          console.log(error.response.data);
        }
      }
    },
    async loginMethod(...resArgs) {
      try {
        this.loginError.global = this.loginError.email = this.loginError.password = '';
        const { email, password } = resArgs[0];
        const response = await axios.post('/login', { email, password })
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        Toast.fire({ icon: 'success', title: 'Login Success' });
        this.router.push('/');
      } catch (error) {
        if (error.response.data.errors) {
          error.response.data.errors.forEach(v => {
            if (v.path === 'email' && this.loginError.email === '') this.loginError.email = v.message;
            if (v.path === 'password' && this.loginError.password === '') this.loginError.password = v.message;
          });
        } else if (error.response.data.message === 'Invalid email or password') {
          this.loginError.global = error.response.data.message;
        } else {
          console.log(error.response.data);
        }
      }
    },
    async handleCredentialResponse(response) {
      try {
        const data = await axios.post('/google-login', { gToken: response.credential });
        localStorage.setItem('access_token', data.data.access_token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        Toast.fire({ icon: 'success', title: 'You are logged in' });
        this.router.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    googleLoginInit() {
      const cb = this.handleCredentialResponse;
      google.accounts.id.initialize({ client_id: '649901350137-29vi9eqvftf5smgfilq0ug79ut58fe6j.apps.googleusercontent.com', callback: cb });
      google.accounts.id.renderButton(document.getElementById("googleButton"), { width: 290, theme: 'dark', });
    },
    async fetchProduct(id) {
      try {
        const response = await axios.get(`/products/${id}`);
        console.log(response);
        this.product = response.data;
        this.router.push(`/product/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('/products');
        console.log(response);
        this.products = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCart() {
      try {
        const access_token = localStorage.getItem('access_token');
        console.log(access_token);
        const response = await axios.get('/carts', { headers: { access_token } });
        this.cart = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addCart(id, amount) {
      try {
        this.amountError = '';
        const access_token = localStorage.getItem('access_token');
        const response = await axios({
          method: 'post',
          url: `/carts/${id}`,
          data: { amount },
          headers: { access_token }
        });
        this.products = response.data;
        swalWithBootstrapButtons.fire({
          title: 'Berhasil Ditambahkan',
          text: response.data.name,
          imageUrl: response.data.img,
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: response.data.name,
          timer: 3000,
        })
        console.log(response);
      } catch (error) {
        console.log(error);
        if (error.response.data.errors) {
          error.response.data.errors.forEach(v => {
            if (v.path === 'amount' && this.amountError === '') this.amountError = v.message;
          });
        } else {
          console.log(error.response.data);
        }
      }
    },
    async deleteCart(id) {
      try {
        console.log(id);
        const access_token = localStorage.getItem('access_token');
        await axios.delete(`/carts/${id}`, { headers: { access_token } });
        await this.fetchCart();
        this.router.push('/mycart')
      } catch (error) {
        console.log(error);
      }
    },
    async charge(bank) {
      try {
        const access_token = localStorage.getItem('access_token');
        const response = await axios({
          method: 'post',
          url: '/charge',
          data: { bank },
          headers: { access_token }
        });
        swalWithBootstrapButtons.fire({
          title: 'Detail Pembayaran',
          text: 'VA: ' + response.data.va_number + ', (' + response.data.bank + ')',
          imageUrl: response.data.img,
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: response.data.name,
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
});


