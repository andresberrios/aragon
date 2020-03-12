<template>
  <div>
    {{ step.title }}
    <StepDisplayer :steps="step.steps" :seq-prefix="`${seqId}.`" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { StepGroup } from "../../interfaces/procedure";
import StepDisplayer from "./StepDisplayer.vue";

@Component({ components: { StepDisplayer } })
export default class StepGroupComponent extends Vue {
  @Prop()
  step!: StepGroup;

  @Prop()
  seqId?: string;
}
</script>
