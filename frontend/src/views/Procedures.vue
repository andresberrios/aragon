<template>
  <b-container class="my-5">
    <h1>Procedures</h1>
    <div v-if="$apollo.queries.procedures.loading">
      <b-spinner small />
      Loading...
    </div>
    <b-alert v-else-if="error" show variant="danger">
      {{ error.message }}
    </b-alert>
    <ul v-else class="list-unstyled">
      <li class="mt-4" v-for="procedure in procedures" :key="procedure.id">
        <h2 class="h4">{{ procedure.name }}</h2>
        <p>{{ procedure.description }}</p>
      </li>
    </ul>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Procedure } from "../interfaces/procedure";
import gql from "graphql-tag";

@Component({
  apollo: {
    procedures: {
      query: gql`
        query {
          procedures {
            id
            name
            description
            steps
          }
        }
      `,
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
