<template>
  <div>
    <div class="text-center">
      <MonthSelector v-model="current" class="my-4" @input="updateRange" />
    </div>
    <div class="calendar">
      <div class="units">
        <div class="table-origin"></div>
        <div class="unit" v-for="unit in units" :key="unit.id">
          <div class="name">
            {{ unit.name }}
          </div>
        </div>
      </div>
      <div class="events">
        <div class="event-row days" :style="eventRowStyles">
          <div
            class="day"
            v-for="(day, index) in days"
            :key="day.start.toISO()"
            :style="dayStyles(index)"
          >
            {{ day.start.day }}
          </div>
        </div>
        <div
          class="event-row"
          v-for="unit in units"
          :key="unit.id"
          :style="eventRowStyles"
        >
          <div
            class="day"
            v-for="(day, index) in days"
            :key="day.start.toISO()"
            :style="dayStyles(index)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { DateTime, Info, Interval } from "luxon";
import MonthSelector from "./MonthSelector.vue";
import data from "../assets/testData";

@Component({
  components: { MonthSelector }
})
export default class Calendar extends Vue {
  units = data.units;
  current: { month: number; year: number };
  from: DateTime = DateTime.local();
  to: DateTime = DateTime.local();
  days: Interval[] = [];
  dayWidth = 8;

  constructor() {
    super();
    const now = DateTime.local();
    this.current = {
      month: now.month,
      year: now.year
    };
  }

  beforeMount() {
    this.updateRange();
  }

  updateRange() {
    this.from = DateTime.fromObject(this.current).startOf("month");
    this.to = DateTime.fromObject(this.current).endOf("month");
    this.days = Interval.fromDateTimes(this.from, this.to).splitBy({ days: 1 });
  }

  dayStyles(day: number) {
    return { width: `${this.dayWidth}em`, left: `${day * this.dayWidth}em` };
  }

  get eventRowStyles() {
    return { width: `${this.days.length * this.dayWidth}em` };
  }
}
</script>

<style scoped lang="scss">
$unit-width: 10em;
$row-height: 2em;
$border: solid 1px gray;

.calendar {
  position: relative;
  .units {
    width: $unit-width;
    border-right: $border;
    .table-origin {
      width: 100%;
      height: $row-height;
      border-bottom: $border;
    }
    .unit {
      width: 100%;
      height: $row-height;
      border-bottom: $border;
      &:last-child {
        border-bottom: none;
      }
      .name {
        background: lightgray;
        height: 100%;
      }
    }
  }
  .events {
    position: absolute;
    top: 0;
    left: $unit-width;
    width: calc(100% - #{$unit-width});
    height: 100%;
    overflow-x: scroll;
    .event-row {
      position: relative;
      // `width` is determined in inline styles
      height: $row-height;
      text-align: center;
      border-bottom: $border;
      &:last-child {
        border-bottom: none;
      }
    }
    .days {
      background: lightgray;
    }
    .day {
      position: absolute;
      // `left` defined in inline styles
      // `width` defined in inline styles
      height: 100%;
      border-right: $border;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
