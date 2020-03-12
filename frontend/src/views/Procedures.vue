<template>
  <b-container class="my-5">
    <h1>Procedures</h1>
    <b-button variant="success" to="/procedures/new">Create new</b-button>
    <div class="mt-5">
      <div v-if="$apollo.queries.procedures.loading">
        <b-spinner small />
        Loading...
      </div>
      <b-alert v-else-if="error" show variant="danger">
        {{ error.message }}
      </b-alert>
      <ul v-else class="list-unstyled">
        <li
          class="mt-4 d-flex"
          v-for="procedure in procedures"
          :key="procedure.id"
        >
          <div class="pr-3">
            <b-button
              size="sm"
              variant="primary"
              :to="{ name: 'procedures.edit', params: { id: procedure.id } }"
            >
              <b-icon icon="pencil" />
            </b-button>
          </div>
          <div class="flex-grow-1">
            <h2 class="h4">
              <router-link
                :to="{ name: 'procedures.show', params: { id: procedure.id } }"
              >
                {{ procedure.name }}
              </router-link>
            </h2>
            <vue-simple-markdown :source="procedure.description" />
          </div>
        </li>
      </ul>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Procedure } from "../interfaces/procedure";
import { GET_PROCEDURES } from "../queries/procedures";

@Component({
  apollo: {
    procedures: {
      query: GET_PROCEDURES,
      error(e) {
        this.error = e;
      }
    }
  }
})
export default class Procedures extends Vue {
  procedures: Procedure[] = [];
  error: Error | null = null;
}
</script>
