<template>
  <div>
    {{ step.text }}
    <vue-simple-markdown :source="step.details" style="font-size: 80%" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Instruction } from "../../interfaces/procedure";

@Component
export default class InstructionComponent extends Vue {
  @Prop()
  step!: Instruction;
}
</script>
