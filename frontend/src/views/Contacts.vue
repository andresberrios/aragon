<template>
  <b-container class="my-5">
    <h1>Contactos</h1>
    <b-button variant="success" :to="{ name: 'contacts.new' }">
      Crear nuevo
    </b-button>
    <div class="mt-5">
      <div v-if="$apollo.queries.contacts.loading">
        <b-spinner small />
        Loading...
      </div>
      <b-alert v-else-if="error" show variant="danger">
        {{ error.message }}
      </b-alert>
      <ul v-else class="list-unstyled">
        <li class="mt-4 d-flex" v-for="contact in contacts" :key="contact.id">
          <div class="pr-3">
            <b-button
              size="sm"
              variant="primary"
              :to="{ name: 'contacts.edit', params: { id: contact.id } }"
            >
              <b-icon icon="pencil" />
            </b-button>
          </div>
          <div class="flex-grow-1">
            <h2 class="h4">
              <router-link
                :to="{ name: 'contacts.show', params: { id: contact.id } }"
              >
                {{ contact.name }}
              </router-link>
            </h2>
          </div>
        </li>
      </ul>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GET_CONTACTS } from "../queries/accounting";
import { Contact } from "../interfaces/accounting";

@Component({
  apollo: {
    contacts: {
      query: GET_CONTACTS,
      error(e) {
        this.error = e;
      }
    }
  }
})
export default class Contacts extends Vue {
  contacts: Contact[] = [];
  error: Error | null = null;
}
</script>
