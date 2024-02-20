// js/router.js
const Home = { template: '<div>Home Page</div>' }
const About = { template: '<div>About Page</div>' }
const Portfolio = { template: '<div>Portfolio Page</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/portfolio', component: Portfolio }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

const app = new Vue({
  router
}).$mount('#app')
