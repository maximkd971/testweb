import Vue from 'vue'
import vuetify from './plugins/vuetify'
import VueSocketIO from 'vue-socket.io'
import VueRouter from 'vue-router'
import home from './components/home.vue'
import room from './components/room.vue'
import salons from './components/salons.vue'
import App from './App.vue'


Vue.config.productionTip = false
Vue.use(VueRouter)
const routes = [
  { path: '/', component: home },
  { path: '/room', component: room, name: 'room' },
  { path: '/salons/:id', component: salons, name:'post'},
  { path: '*', component: home }

]

const router = new VueRouter({
  mode : 'history',
  routes
 })

Vue.use(new VueSocketIO({
	debug:true,
	connection:'http://127.0.0.1:3535'
}))

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
