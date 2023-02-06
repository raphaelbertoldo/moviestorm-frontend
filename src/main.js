import Vue from "vue";
import App from "./App.vue";
import { createProvider } from "./vue-apollo";
import "regenerator-runtime/runtime";
import "./styles/main.scss";

import VueApollo from "vue-apollo";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Bugsnag from "./middleware/bugsnag";
Vue.use(VueApollo);

Vue.config.productionTip = false;
const apolloProvider = createProvider();

new Vue({
  provide: {
    bugsnag: Bugsnag,
  },
  apolloProvider,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
