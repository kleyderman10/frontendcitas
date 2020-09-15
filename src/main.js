import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bootstrap from 'bootstrap-vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Vuemodal from 'vue-js-modal'
import vSelect from 'vue-select' 
import { Datetime } from 'vue-datetime'
//middleware
Vue.use(Bootstrap);
Vue.use(VueAxios,Axios);
Vue.use(Vuemodal);
Vue.component('v-select', vSelect);
Vue.component('datetime', Datetime);
//archivos css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css';
import 'vue-datetime/dist/vue-datetime.css'
//ruta base para la api
Axios.defaults.baseURL="http://192.168.0.83:4000/api";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
