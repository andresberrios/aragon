<template>
  <div>
    I'm a conditional
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Conditional } from "./procedureInterfaces";

@Component
export default class ConditionalComponent extends Vue {
  @Prop()
  step!: Conditional;
}
</script>
