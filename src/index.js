import Vue from 'vue'
import { Notify } from './notify'
import App from './App.vue'
import './notify/index.css'

Vue.use(Notify)

new Vue({
  render: h => h(App),
}).$mount('#app')