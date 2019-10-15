import Vue from "vue";
import { Dialog, Toast } from "vant";
import VueClipboard from "vue-clipboard2";
import "amfe-flexible";
import App from "./App.vue";
import Empty from "./components/Empty";
import MixList from "./components/MixList";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 配置页面是否展示底部导航
const showMenuList = ["home", "partner", "cart", "user"];

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  console.log(to.name, showMenuList.includes(to.name));
  Vue.prototype.isShowMenu = showMenuList.includes(to.name);
  Vue.prototype.activeIdx = showMenuList.indexOf(to.name);
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

Vue.use(Dialog);
Vue.use(Toast);
Vue.use(VueClipboard);
Vue.component("empty", Empty);
Vue.component("MixList", MixList);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
