import client from "nhost-js-sdk";

client.initializeApp({
  endpoint: process.env.VUE_APP_AUTH_URL
});

export default client.auth();
