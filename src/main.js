import Vue from 'vue'
import App from './App.vue'
import 'bootstrap';
import axios from 'axios';
import store from './store/store';

axios.defaults.baseURL = 'https://api.github.com'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
