<template>
  <div class="step-editor p-3">
    <transition-group name="list-animations" tag="div">
      <div
        class="row list-animations-item mb-2"
        style="border-bottom: solid 1px rgba(0, 0, 0, 0.2)"
        v-for="(step, index) in steps"
        :key="step.id"
      >
        <div class="col-md-auto pr-4">
          <h3 class="h5">Step {{ seqPrefix }}{{ index + 1 }}</h3>
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
              :disabled="index > steps.length - 2"
              @click="moveStepDown(index)"
            >
              <b-icon icon="arrow-down" />
            </b-button>
            <b-button size="sm" variant="danger" @click="removeStep(index)">
              <b-icon icon="trash" />
            </b-button>
          </b-button-group>
        </div>
        <div class="col-md">
          <Instruction :step="step" v-if="step.type === 'instruction'" />
          <StepGroup
            :step="step"
            :seq-id="`${seqPrefix || ''}${index + 1}`"
            v-if="step.type === 'group'"
          />
          <Conditional
            :step="step"
            :seq-id="`${seqPrefix || ''}${index + 1}`"
            v-if="step.type === 'conditional'"
          />
        </div>
      </div>
    </transition-group>

    <b-button-group>
      <b-button variant="primary" @click="addInstruction()">
        <b-icon icon="plus" class="rounded-circle border" />
        Instruction
      </b-button>
      <b-button variant="secondary" @click="addGroup()">
        <b-icon icon="plus" class="rounded-circle border" />
        Group
      </b-button>
      <b-button variant="info" @click="addConditional()">
        <b-icon icon="plus" class="rounded-circle border" />
        Conditional
      </b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Step } from "../../interfaces/procedure";
import Instruction from "./Instruction.vue";

@Component({
  components: {
    Instruction,
    StepGroup: () => import("./StepGroup.vue"),
    Conditional: () => import("./Conditional.vue")
  }
})
export default class StepEditor extends Vue {
  @Prop()
  steps!: Step[];

  @Prop()
  seqPrefix?: string;

  generateStepId() {
    return Math.floor(Math.random() * 1e9).toString();
  }

  addInstruction() {
    this.steps.push({
      id: this.generateStepId(),
      type: "instruction",
      text: ""
    });
  }

  addConditional() {
    this.steps.push({
      id: this.generateStepId(),
      type: "conditional",
      condition: "",
      then: []
    });
  }

  addGroup() {
    this.steps.push({
      id: this.generateStepId(),
      type: "group",
      title: "",
      steps: []
    });
  }

  moveStepUp(index: number) {
    if (index > 0) {
      const [removed] = this.steps.splice(index, 1);
      this.steps.splice(index - 1, 0, removed);
    }
  }

  moveStepDown(index: number) {
    if (index < this.steps.length - 1) {
      const [removed] = this.steps.splice(index, 1);
      this.steps.splice(index + 1, 0, removed);
    }
  }

  removeStep(index: number) {
    this.steps.splice(index, 1);
  }
}
</script>

<style lang="scss">
.step-editor {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
