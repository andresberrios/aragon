<template>
  <div>
    <div class="text-center">
      <b-button class="mr-4" @click="extendRange('from')">&lt;-|</b-button>
      <MonthSelector v-model="current" class="my-4" @input="selectMonth" />
      <b-button class="ml-4" @click="extendRange('to')">|-&gt;</b-button>
      <br />
      {{ from }} - {{ to }}
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
      <div class="events" ref="events">
        <div class="event-row days" :style="eventRowStyles" ref="eventRow">
          <div
            class="day"
            v-for="(day, index) in days"
            :key="day.start.toMillis()"
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
            :key="day.start.toMillis()"
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
  from: DateTime;
  to: DateTime;
  days: Interval[] = [];
  dayWidth = 8;

  constructor() {
    super();
    const now = DateTime.local();
    this.current = {
      month: now.month,
      year: now.year
    };
    this.from = now;
    this.to = now;
  }

  beforeMount() {
    this.selectMonth();
  }

  selectMonth() {
    this.from = DateTime.fromObject(this.current).startOf("month");
    this.to = DateTime.fromObject(this.current).endOf("month");
    this.updateRange();
  }

  updateRange() {
    this.days = Interval.fromDateTimes(this.from, this.to).splitBy({ days: 1 });
  }

  async extendRange(side: "from" | "to", days = 7) {
    const events = this.$refs.events as Element;
    const dayWidth =
      (this.$refs.eventRow as HTMLElement).offsetWidth / this.days.length;
    if (side === "from") {
      this.from = this.from.minus({ days: 7 });
      this.updateRange();
      await Vue.nextTick();
      events.scroll({ left: days * dayWidth + events.scrollLeft });
      await new Promise(r => setTimeout(r, 0));
      events.scroll({ left: 0, behavior: "smooth" });
    } else {
      this.to = this.to.plus({ days: 7 });
      this.updateRange();
      await Vue.nextTick();
      events.scroll({ left: events.scrollWidth, behavior: "smooth" });
    }
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
