import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Chartist from 'chartist-vuejs'
import VueChartist from 'v-chartist'
Vue.use(Chartist)
Vue.use(require('vue-chartist'))
Vue.config.productionTip = false
Vue.use(VueChartist)
new Vue({
  router,
  store,
  data: function(){
    return {
      currentUser: '',
      users: [
          {username: "test", password: "qwe123"},
          {username: "test2", password: "qwe123"},
          {username: "test3", password: "qwe123"}
      ],
      // users: [],
    }
  },
  async created() {
    // this.$root.users = await axios.get('http://localhost:5000/api/users');
    this.$root.currentUser = document.cookie.split('=')[1];
  },
  render: function (h) { return h(App) }
}).$mount('#app');
