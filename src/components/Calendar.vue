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
      <div class="events" :style="{ width: `${days.length * 3}em` }">
        <div class="event-row days">
          <div
            class="day"
            v-for="(day, index) in days"
            :key="index"
            :style="dayStyles(index)"
          >
            {{ day.start.day }}
          </div>
        </div>
        <div class="event-row" v-for="unit in units" :key="unit.id">
          <div
            class="day"
            v-for="(day, index) in days"
            :key="index"
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
  from!: DateTime;
  to!: DateTime;
  days!: Interval[];

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
    return { left: `${day * 3}em` };
  }
}
</script>

<style scoped lang="scss">
$unit-width: 10em;
$row-height: 2em;
$day-width: 3em;
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
    left: $unit-width;
    top: 0;
    // width is determined in inline styles
    height: 100%;
    .event-row {
      position: relative;
      width: 100%;
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
      left: 0; // Actually defined in inline styles
      width: $day-width;
      height: 100%;
      border-right: $border;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
