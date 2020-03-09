<template>
  <div class="login-form d-flex justify-content-center align-items-center">
    <b-card class="card-login">
      <b-card-body class="text-center">
        <h1>Login</h1>
        <b-form @submit.prevent="submit">
          <b-input-group class="mt-4">
            <b-input-group-prepend is-text>
              <b-icon icon="person"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="login.email"
              type="email"
              size="lg"
              placeholder="Enter your email"
              required
            ></b-form-input>
          </b-input-group>
          <b-input-group class="mt-2">
            <b-input-group-prepend is-text>
              <b-icon icon="lock"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="login.password"
              type="password"
              size="lg"
              placeholder="Enter your password"
              required
            ></b-form-input>
          </b-input-group>
          <b-button
            type="submit"
            class="btn-lg btn-block my-3"
            variant="primary"
          >
            Login
          </b-button>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import auth from "../services/auth";

@Component
export default class Login extends Vue {
  login = {
    email: "",
    password: ""
  };

  async submit() {
    await auth.login(this.login.email, this.login.password);
    this.$router.push({ name: "home" });
  }
}
</script>

<style scoped>
.login-form {
  height: 100vh;
  background-color: rgb(230, 230, 230);
}

.card.card-login {
  width: 28rem;
  border: none;
  box-shadow: 5px 5px 20px rgb(90, 89, 89);
}
</style>
