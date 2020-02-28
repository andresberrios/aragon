<template>
  <b-container class="my-5">
    <h1>Create Procedure</h1>
    <div>
      <b-form @submit="onSubmit">
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

        <transition-group name="list-animations" tag="div">
          <div
            class="d-flex list-animations-item"
            v-for="(step, index) in procedure.steps"
            :key="step.id"
          >
            <div class="pr-4">
              <h3 class="h5">Step {{ index + 1 }}</h3>
              <b-button-group>
                <b-button
                  size="sm"
                  variant="info"
                  :disabled="index < 1"
                  @click="moveStepUp(index)"
                >
                  <b-icon icon="arrow-up" />
                </b-button>
                <b-button
                  size="sm"
                  variant="info"
                  :disabled="index > procedure.steps.length - 2"
                  @click="moveStepDown(index)"
                >
                  <b-icon icon="arrow-down" />
                </b-button>
                <b-button size="sm" variant="danger" @click="removeStep(index)">
                  <b-icon icon="trash" />
                </b-button>
              </b-button-group>
            </div>
            <div class="flex-grow-1">
              <Instruction :instruction="step" />
            </div>
          </div>
        </transition-group>

        <b-button-group>
          <b-button variant="primary" @click="addInstruction()">
            <b-icon icon="plus" class="rounded-circle border" />
            Instruction
          </b-button>
          <b-button variant="info" @click="addConditional()">
            <b-icon icon="plus" class="rounded-circle border" />
            Conditional
          </b-button>
        </b-button-group>

        <hr />
        <b-button type="submit" variant="success">Submit</b-button>
      </b-form>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Procedure } from "../components/procedures/procedureInterfaces";
import Instruction from "../components/procedures/Instruction.vue";

@Component({ components: { Instruction } })
export default class Procedures extends Vue {
  procedure: Procedure = {
    name: "",
    description: "",
    steps: []
  };

  addInstruction() {
    this.procedure.steps.push({
      id: Math.floor(Math.random() * 1e6).toString(),
      text: ""
    });
  }

  moveStepUp(index: number) {
    if (index > 0) {
      const [removed] = this.procedure.steps.splice(index, 1);
      this.procedure.steps.splice(index - 1, 0, removed);
    }
  }

  moveStepDown(index: number) {
    if (index < this.procedure.steps.length - 1) {
      const [removed] = this.procedure.steps.splice(index, 1);
      this.procedure.steps.splice(index + 1, 0, removed);
    }
  }

  removeStep(index: number) {
    this.procedure.steps.splice(index, 1);
  }

  onSubmit() {
    // eslint-disable-next-line no-console
    console.log("Oh yeah");
  }
}
</script>
