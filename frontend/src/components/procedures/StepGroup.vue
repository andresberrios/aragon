<template>
  <div>
    <b-form-group
      id="step-group-group"
      label="Group:"
      :label-for="'step-group-' + step.id"
    >
      <b-form-input
        :id="'step-group-' + step.id"
        v-model="step.title"
        type="text"
        required
        placeholder="Enter group title"
      />
      <b-form-text>
        Group related steps under this one.
      </b-form-text>
    </b-form-group>
    <StepEditor :steps="step.steps" :seq-prefix="`${seqId}.`" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { StepGroup } from "../../interfaces/procedure";
import StepEditor from "./StepEditor.vue";

@Component({ components: { StepEditor } })
export default class StepGroupComponent extends Vue {
  @Prop()
  step!: StepGroup;

  @Prop()
  seqId?: string;
}
</script>
