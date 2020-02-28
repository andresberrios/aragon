<template>
  <div>
    <b-form-group id="condition-group" label="Condition:" label-for="condition">
      <b-input-group prepend="IF">
        <b-form-input
          :id="'condition-' + step.id"
          v-model="step.condition"
          type="text"
          required
          placeholder="Enter condition"
        />
      </b-input-group>
      <b-form-text>
        Condition that should be met in order to proceeed with the
        <strong>THEN</strong> block.
      </b-form-text>
    </b-form-group>
    <div>
      <h3 class="h5">THEN</h3>
      <StepEditor :steps="step.then" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Conditional } from "./procedureInterfaces";

@Component({
  components: { StepEditor: () => import("./StepEditor.vue") }
})
export default class ConditionalComponent extends Vue {
  @Prop()
  step!: Conditional;
}
</script>
