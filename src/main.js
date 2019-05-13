import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  data: function(){
    return {
      currentUser: '',
      users: []
    }
  },
  async created() {
    this.$root.users = await axios.get('http://localhost:5000/api/users');
    this.$root.currentUser = document.cookie.split('=')[1];
  },
  render: function (h) { return h(App) }
}).$mount('#app');
