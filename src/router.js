import Vue from "vue";
import Router from "vue-router";
import App from './App'
Vue.use(Router);

export default new Router({
  mode: "history", //默认是hash模式
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: App,
      children: [{
      path: '',
        component: () =>
        import(/* webpackChunkName: "about" */ "./views/Home/home.vue")
      }, {
          path: '/item',
          component: () =>
          import(/* webpackChunkName: "about" */ "./views/Item/itemlist.vue")
      }, {
          path: '/score',
          component: () =>
          import(/* webpackChunkName: "about" */ "./views/Score/score.vue")
      }]
    }
  ]
});
