<template>
  <div>
    <h1>Hotel</h1>
    <Calendar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Calendar from "../components/calendar/Calendar.vue";

@Component({
  components: {
    Calendar
  }
})
export default class CalendarView extends Vue {}
</script>
