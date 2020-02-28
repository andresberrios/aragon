<template>
  <div>
    <b-form-group
      id="instruction-group"
      label="Instruction:"
      :label-for="'instruction-' + instruction.id"
    >
      <b-input-group>
        <b-form-input
          :id="'instruction-' + instruction.id"
          v-model="instruction.text"
          required
          placeholder="Enter instruction"
        />
        <b-input-group-append>
          <b-button
            :variant="
              instruction.details === undefined
                ? 'outline-info'
                : 'outline-danger'
            "
            @click="toggleInstructionDetails(instruction)"
          >
            <b-icon icon="plus" v-if="instruction.details === undefined" />
            <b-icon icon="dash" v-if="instruction.details !== undefined" />
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
      :label-for="'details-' + instruction.id"
      v-if="instruction.details !== undefined"
    >
      <b-form-textarea
        :id="'details-' + instruction.id"
        v-model="instruction.details"
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
  instruction!: Instruction;

  toggleInstructionDetails(instruction: Instruction) {
    if (instruction.details === undefined) {
      this.$set(instruction, "details", "");
    } else {
      instruction.details = undefined;
    }
  }
}
</script>
