<template>
  <div class="auth-form d-flex justify-content-center align-items-center">
    <b-card class="card-auth">
      <b-card-body class="text-center">
        <h1>Identificación</h1>
        <b-form @submit.prevent="action === 'login' ? login() : signup()">
          <b-input-group class="mt-4">
            <b-input-group-prepend is-text>
              <b-icon icon="person"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="email"
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
              v-model="password"
              type="password"
              size="lg"
              placeholder="Enter your password"
              required
            ></b-form-input>
          </b-input-group>
          <b-button
            type="submit"
            @click="action = 'login'"
            class="btn-lg btn-block mt-3 mb-2"
            variant="primary"
          >
            Entrar
          </b-button>
          <b-button
            type="submit"
            @click="action = 'signup'"
            class="btn-lg btn-block"
            variant="outline-success"
          >
            Crear cuenta
          </b-button>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import auth from "../services/auth";

@Component
export default class Auth extends Vue {
  email = "";
  password = "";
  action = "login";

  async login() {
    await auth.login(this.email, this.password);
    this.$router.push({ name: "home" });
  }

  async signup() {
    await auth.register(this.email, this.email, this.password);
    await this.login();
  }
}
</script>

<style scoped>
.auth-form {
  height: 100vh;
  background-color: rgb(230, 230, 230);
}

.card.card-auth {
  width: 28rem;
  border: none;
  box-shadow: 5px 5px 20px rgb(90, 89, 89);
}
</style>
