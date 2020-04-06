<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand :to="{ name: 'home' }">Aragón</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'calendar' }" active-class="active">
          Calendar
        </b-nav-item>
        <b-nav-item :to="{ name: 'procedures' }" active-class="active">
          Procedures
        </b-nav-item>
        <b-nav-item :to="{ name: 'invoices.new' }" active-class="active">
          Invoices
        </b-nav-item>
        <b-nav-item :to="{ name: 'contacts' }" active-class="active">
          Contacts
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav v-if="loading">
          <b-spinner />
        </b-navbar-nav>
        <b-navbar-nav v-else-if="error">
          <span class="text-danger">Error al cargar usuario</span>
        </b-navbar-nav>
        <b-nav-item-dropdown right v-else>
          <template v-slot:button-content>
            <b-icon icon="person-fill" shift-v="-1" scale="1.2" />
            {{ user.display_name }}
          </template>
          <b-dropdown-item @click="logout">Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import auth from "../services/auth";
import { User } from "../interfaces/app";

@Component
export default class NavBar extends Vue {
  loading = true;
  user: User | null = null;
  error: Error | null = null;

  async mounted() {
    try {
      if (!auth.getJWTToken()) {
        await auth.refreshToken();
      }
      this.user = await auth.getUser();
    } catch (e) {
      this.error = e;
    } finally {
      this.loading = false;
    }
  }

  logout() {
    auth.logout();
  }
}
</script>
