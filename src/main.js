import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueSocketIO from 'vue-socket.io'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(new VueSocketIO({
	debug:true,
	connection:'http://10.239.161.26:3535'
}))

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
