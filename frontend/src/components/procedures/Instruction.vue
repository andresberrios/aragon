<template>
  <div>
    <b-form-group
      id="instruction-group"
      label="Instruction:"
      :label-for="'instruction-' + step.id"
    >
      <b-input-group>
        <b-form-input
          :id="'instruction-' + step.id"
          v-model="step.text"
          required
          placeholder="Enter instruction"
        />
        <b-input-group-append>
          <b-button
            :variant="
              step.details === undefined ? 'outline-info' : 'outline-danger'
            "
            @click="toggleInstructionDetails(step)"
          >
            <b-icon icon="plus" v-if="step.details === undefined" />
            <b-icon icon="dash" v-if="step.details !== undefined" />
            Details
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <b-form-text>
        Describe how to perform this step.
      </b-form-text>
    </b-form-group>
    <b-form-group
      id="instruction-group-details"
      label="Details:"
      :label-for="'details-' + step.id"
      v-if="step.details !== undefined"
    >
      <b-form-textarea
        :id="'details-' + step.id"
        v-model="step.details"
        required
        placeholder="Enter details"
        rows="2"
        max-rows="6"
      ></b-form-textarea>
      <b-form-text>
        Explain details on how to perform this step.
      </b-form-text>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Instruction } from "./procedureInterfaces";

@Component
export default class InstructionComponent extends Vue {
  @Prop()
  step!: Instruction;

  toggleInstructionDetails(step: Instruction) {
    if (step.details === undefined) {
      this.$set(step, "details", "");
    } else {
      step.details = undefined;
    }
  }
}
</script>
