<template>
  <b-container class="my-5">
    <h1>Create Procedure</h1>
    <div>
      <b-form @submit="onSubmit">
        <b-form-group
          id="name-group"
          label="Procedure name:"
          label-for="name"
          description="So you can identify it."
        >
          <b-form-input
            id="name"
            v-model="procedure.name"
            type="text"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="description-group"
          label="Description:"
          label-for="description"
          description="Specify procedure goals, requirements, etc."
        >
          <b-form-input
            id="description"
            v-model="procedure.description"
            required
            placeholder="Enter description"
          ></b-form-input>
        </b-form-group>

        <h2>Steps</h2>

        <b-button type="submit" variant="success">Submit</b-button>
      </b-form>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface Instruction {
  text: string;
  details: string;
}

interface Conditional {
  condition: string;
  then: Step[];
  else?: Step[];
}

type Step = Instruction | Conditional;

interface Procedure {
  name: string;
  description: string;
  steps: Step[];
}

@Component
export default class Procedures extends Vue {
  procedure: Procedure = {
    name: "",
    description: "",
    steps: []
  };

  onSubmit() {
    // eslint-disable-next-line no-console
    console.log("Oh yeah");
  }
}
</script>
