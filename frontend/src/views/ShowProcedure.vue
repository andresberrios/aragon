<template>
  <b-container class="my-5">
    <span class="lead font-weight-bold">Procedimiento:</span>
    <b-button
      class="float-right"
      variant="primary"
      :to="{ name: 'procedures.edit', params: { id } }"
    >
      <b-icon icon="pencil" />
      Editar
    </b-button>
    <div v-if="$apollo.queries.procedure.loading">
      <b-spinner small /> Cargando...
    </div>
    <b-alert v-else-if="error" show variant="danger">
      {{ error.message }}
    </b-alert>
    <div v-else>
      <h1 class="mb-3 font-weight-light">{{ procedure.name }}</h1>
      <hr />
      <h2 class="lead font-weight-bold">Descripción:</h2>
      <vue-simple-markdown :source="procedure.description" />
      <hr />
      <h2 class="lead font-weight-bold mt-3">Pasos:</h2>
      <StepDisplayer :steps="procedure.steps" />
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Procedure } from "../interfaces/procedure";
import { GET_PROCEDURE } from "../queries/procedures";
import StepDisplayer from "../components/checklist/StepDisplayer.vue";

@Component({
  components: { StepDisplayer },
  apollo: {
    procedure: {
      query: GET_PROCEDURE,
      variables() {
        return { id: this.id };
      },
      error(e) {
        this.error = e;
      }
    }
  }
})
export default class EditProcedure extends Vue {
  @Prop({ required: true })
  id!: string;
  procedure: Procedure | null = null;
  error: Error | null = null;
}
</script>
