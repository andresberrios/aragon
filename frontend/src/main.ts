/// <reference types="../@types/types" />

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import BootstrapVue, { IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import "./assets/bootstrap.scss";
import "./assets/global.scss";

import VueSimpleMarkdown from "vue-simple-markdown";
Vue.use(VueSimpleMarkdown);
import "vue-simple-markdown/dist/vue-simple-markdown.css";

import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import auth from "./services/auth";

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URI,
  fetch
});

const authLink = setContext(async (_, { headers }) => {
  let token =
    auth.getJWTToken() || ((await auth.refreshToken()) && auth.getJWTToken());
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
