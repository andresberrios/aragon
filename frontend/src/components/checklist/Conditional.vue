<template>
  <div>
    <strong>CONDICIÓN:</strong>
    {{ step.condition }}
    <div>
      <strong>ENTONCES:</strong>
      <StepDisplayer
        :steps="step.then"
        :seq-prefix="`${seqId}.`"
        class="ml-4"
      />
    </div>
    <div v-if="step.else">
      <strong>DE LO CONTRARIO:</strong>
      <StepDisplayer
        :steps="step.else"
        :seq-prefix="`${seqId}.E.`"
        class="ml-4"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Conditional } from "../../interfaces/procedure";
import StepDisplayer from "./StepDisplayer.vue";

@Component({ components: { StepDisplayer } })
export default class ConditionalComponent extends Vue {
  @Prop()
  step!: Conditional;

  @Prop()
  seqId?: string;
}
</script>
