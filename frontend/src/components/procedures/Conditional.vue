<template>
  <div>
    <b-form-group
      id="condition-group"
      label="Condition:"
      :label-for="'condition-' + step.id"
    >
      <b-input-group prepend="IF">
        <b-form-input
          :id="'condition-' + step.id"
          v-model="step.condition"
          type="text"
          required
          placeholder="Enter condition"
        />
        <b-input-group-append>
          <b-button
            :variant="
              step.else === undefined ? 'outline-info' : 'outline-danger'
            "
            @click="toggleElse(step)"
          >
            <b-icon icon="plus" v-if="step.else === undefined" />
            <b-icon icon="dash" v-if="step.else !== undefined" />
            ELSE
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <b-form-text>
        Condition that should be met in order to proceed with the
        <strong>THEN</strong> block.
      </b-form-text>
    </b-form-group>
    <div>
      <h3 class="h5">THEN</h3>
      <StepEditor :steps="step.then" :seq-prefix="`${seqId}.`" />
    </div>
    <div v-if="step.else !== undefined" class="mt-2">
      <h3 class="h5">ELSE</h3>
      <StepEditor :steps="step.else" :seq-prefix="`${seqId}.E.`" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Conditional } from "../../interfaces/procedure";
import StepEditor from "./StepEditor.vue";

@Component({ components: { StepEditor } })
export default class ConditionalComponent extends Vue {
  @Prop()
  step!: Conditional;

  @Prop()
  seqId?: string;

  toggleElse(step: Conditional) {
    if (step.else === undefined) {
      this.$set(step, "else", []);
    } else {
      step.else = undefined;
    }
  }
}
</script>
