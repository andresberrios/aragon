<template>
  <b-container class="my-5">
    <h1>Edit Procedure</h1>
    <div v-if="id && $apollo.queries.procedure.loading">
      <b-spinner small /> Loading...
    </div>
    <b-alert v-else-if="error" show variant="danger">
      {{ error.message }}
    </b-alert>
    <div v-else>
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="name-group" label="Procedure name:" label-for="name">
          <b-form-input
            id="name"
            v-model="procedure.name"
            type="text"
            required
            placeholder="Enter name"
          />
          <b-form-text>
            So you can identify it.
          </b-form-text>
        </b-form-group>

        <b-form-group
          id="description-group"
          label="Description:"
          label-for="description"
        >
          <b-form-textarea
            id="description"
            v-model="procedure.description"
            required
            placeholder="Enter description"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <b-form-text>
            Specify procedure goals, requirements, etc.
          </b-form-text>
        </b-form-group>

        <h2>Steps</h2>
        <StepEditor :steps="procedure.steps" />

        <hr />
        <b-button type="submit" variant="success">Save</b-button>
      </b-form>
      <pre class="my-5 p-3 bg-warning">{{ procedure }}</pre>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Procedure } from "../interfaces/procedure";
import StepEditor from "../components/procedures/StepEditor.vue";
import { GET_PROCEDURE } from "../queries/procedures";

@Component({
  components: { StepEditor },
  apollo: {
    procedure: {
      query: GET_PROCEDURE,
      variables() {
        return { id: this.id };
      },
      skip() {
        return !this.id;
      },
      error(e) {
        this.error = e;
      }
    }
  }
})
export default class EditProcedure extends Vue {
  @Prop()
  id?: string;

  procedure: Procedure = {
    name: "",
    description: "",
    steps: []
  };

  error: Error | null = null;

  onSubmit() {
    // eslint-disable-next-line no-console
    console.log("Oh yeah");
  }
}
</script>
