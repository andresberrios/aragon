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

        <transition-group name="list-complete" tag="div">
          <div
            class="d-flex list-complete-item"
            v-for="(step, index) in procedure.steps"
            :key="step.id"
          >
            <div class="pr-4">
              <h3 class="h5">Step {{ index + 1 }}</h3>
              <b-button-group>
                <b-button
                  size="sm"
                  variant="info"
                  v-if="index > 0"
                  @click="moveStepUp(index)"
                >
                  <b-icon icon="arrow-up" />
                </b-button>
                <b-button
                  size="sm"
                  variant="info"
                  v-if="index < procedure.steps.length - 1"
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
              <b-form-group
                id="step-group"
                label="Instruction:"
                label-for="instruction"
                description="Describe how to perform this step."
              >
                <b-form-input
                  id="instruction"
                  v-model="step.text"
                  required
                  placeholder="Enter instruction"
                ></b-form-input>
              </b-form-group>
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

interface Instruction {
  text: string;
  details?: string;
}

interface Conditional {
  condition: string;
  then: Step[];
  else?: Step[];
}

type Step = (Instruction | Conditional) & { id: string };

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

  addInstruction() {
    this.procedure.steps.push({
      id: (Math.random() * 1e6).toString(),
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

  removeStep(index) {
    this.procedure.steps.splice(index, 1);
  }

  onSubmit() {
    // eslint-disable-next-line no-console
    console.log("Oh yeah");
  }
}
</script>

<style lang="scss" scoped>
.list-complete-item {
  transition: all 0.5s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
