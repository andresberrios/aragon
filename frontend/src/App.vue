<template>
  <div>
    <NavBar v-if="!$route.meta.hideNavBar" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "./components/NavBar.vue";
import auth from "./services/auth";

@Component({
  components: { NavBar }
})
export default class App extends Vue {
  kickOut() {
    this.$apollo.getClient().clearStore();
    if (this.$route.name !== "login") {
      this.$router.replace({ name: "login" });
    }
  }

  async mounted() {
    auth.onAuthStateChanged(data => {
      if (data === null) {
        this.kickOut();
      }
    });
    if (!(await auth.refreshToken())) {
      this.kickOut();
    }
  }
}
</script>
