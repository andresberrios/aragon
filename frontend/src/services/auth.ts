import client from "nhost-js-sdk";
import Auth from "nhost-js-sdk/lib/auth";

const original = Auth.prototype.refreshToken;
Auth.prototype.refreshToken = function patchedRefreshToken() {
  if (!this._refreshing) {
    this._refreshing = original.call(this);
    const clearPromise = () => (this._refreshing = null);
    this._refreshing.then(clearPromise, clearPromise);
  }
  return this._refreshing;
};

client.initializeApp({
  endpoint: process.env.VUE_APP_AUTH_URL
});

export default client.auth();
