// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import routes from './router';


Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
