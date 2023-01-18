import Vue from "vue";
import App from "./App.vue";
import { createProvider } from "./vue-apollo";
import "regenerator-runtime/runtime";
import "./styles/main.scss";

import VueApollo from "vue-apollo";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
Vue.use(VueApollo);

Vue.config.productionTip = false;
const apolloProvider = createProvider();

new Vue({
  apolloProvider,

  // apolloProvider: createProvider().then(console.log("asdadsa")),

  // vuetify,

  router,

  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
