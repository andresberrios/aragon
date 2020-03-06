import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import BootstrapVue, { IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import "./assets/bootstrap.scss";
import "./assets/global.scss";

import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const link = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URI,
  fetch,
  headers: { "X-Hasura-Role": "anonymous" }
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ addTypename: true })
});

import VueApollo from "vue-apollo";
Vue.use(VueApollo);

const apolloProvider = new VueApollo({ defaultClient: client });

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
