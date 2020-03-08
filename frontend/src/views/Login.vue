<template>
  <div class="login-form d-flex justify-content-center align-items-center">
    <b-card class="card-login">
      <b-card-body class="text-center">
        <h1>Login</h1>
        <b-input-group class="mt-4">
          <b-input-group-prepend is-text>
            <b-icon icon="person"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="login.userName"
            size="lg"
            placeholder="Enter your user name"
          ></b-form-input>
        </b-input-group>
        <b-input-group class="mt-2">
          <b-input-group-prepend is-text>
            <b-icon icon="lock"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="login.userPassword"
            size="lg"
            placeholder="Enter your password"
          ></b-form-input>
        </b-input-group>
        <b-button class="btn-lg btn-block my-3" variant="primary">
          Login
        </b-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        userName: "",
        userPassword: ""
      }
    };
  }
};
</script>

<style>
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
