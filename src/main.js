import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
	debug:true,
	connection:'http://10.8.94.235:8080'
}))

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
