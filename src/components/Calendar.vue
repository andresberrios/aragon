<template>
  <MonthSelector />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DateTime, Info } from "luxon";
import MonthSelector from "./MonthSelector.vue";

@Component({
  components: { MonthSelector }
})
export default class Calendar extends Vue {}
</script>

<style scoped lang="scss"></style>
