<template>
  <div>
    <div class="d-flex py-2" v-for="(step, index) in steps" :key="step.id">
      <div class="pr-2">
        <strong>{{ seqPrefix }}{{ index + 1 }}</strong>
      </div>
      <div class="flex-grow-1">
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
}
</script>
