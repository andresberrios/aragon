import client from "nhost-js-sdk";
import Auth from "nhost-js-sdk/lib/auth";

const original = Auth.prototype.refreshToken;
const HelplessAuth = Auth as any;

HelplessAuth.prototype.refreshToken = function patchedRefreshToken() {
  if (!this._refreshing) {
    this._refreshing = original.call(this);
    const clearPromise = () => (this._refreshing = null);
    this._refreshing.then(clearPromise, clearPromise);
  }
  return this._refreshing;
};

HelplessAuth.prototype.getUser = async function() {
  const res = await fetch(process.env.VUE_APP_AUTH_URL + "/auth/user", {
    headers: { Authorization: `Bearer ${this.getJWTToken()}` }
  });
  if (!res.ok) {
    throw new Error("Failed to get user data");
  }
  return (await res.json()).user;
};

interface ImprovedAuth extends Auth {
  getUser(): Promise<any>;
}

client.initializeApp({
  endpoint: process.env.VUE_APP_AUTH_URL
});

export default client.auth() as ImprovedAuth;
