import Vue from 'vue'
import App from './App.vue'
import './assets/styles/style.scss'

import Ws from './plugins/Ws.js'

Vue.config.productionTip = false
Vue.use(Ws)


new Vue({
  render: h => h(App),
}).$mount('#app')
