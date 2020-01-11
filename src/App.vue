<template>
  <div id="app">
    <h1>Hotel</h1>
    <Calendar />
  </div>
</template>

<script lang="ts">
import "./assets/bootstrap.scss";

import { Component, Vue } from "vue-property-decorator";
import Calendar from "./components/Calendar.vue";

@Component({
  components: {
    Calendar
  }
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
