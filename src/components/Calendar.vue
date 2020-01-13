<template>
  <div>
    <div class="text-center">
      <b-button class="mr-4" @click="extendRange('from')">&lt;-|</b-button>
      <MonthSelector v-model="current" class="my-4" @input="selectMonth" />
      <b-button class="ml-4" @click="extendRange('to')">|-&gt;</b-button>
    </div>
    <div class="calendar">
      <div class="days-wrapper">
        <div class="days" ref="days">
          <div class="day" v-for="day in days" :key="day.start.toMillis()">
            {{ day.start.day }}
          </div>
        </div>
      </div>
      <div class="units-wrapper">
        <div class="units">
          <div class="unit" v-for="unit in units" :key="unit.id">
            <div class="name">{{ unit.name }}</div>
          </div>
        </div>
      </div>
      <div class="events" ref="events">
        <div class="unit-events" v-for="unit in units" :key="unit.id">
          <div class="days">
            <div
              class="day"
              v-for="day in days"
              :key="day.start.toMillis()"
            ></div>
          </div>
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
      (this.$refs.days as HTMLElement).offsetWidth / this.days.length;
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
$header-width: 10em;
$header-height: 3em;
$cell-width: 6em;
$cell-height: 2em;
$border: solid 1px gray;

.calendar {
  position: relative;
  overflow: hidden;
}
.days-wrapper {
  position: relative;
  left: $header-width;
  width: calc(100% - #{$header-width});
  height: $header-height;
  border-bottom: $border;
  .days {
    text-align: center;
    background: lightgray;
  }
}
.days {
  height: 100%;
  display: inline-flex;
  flex-flow: row nowrap;
  .day {
    width: $cell-width;
    border-right: $border;
    &:last-child {
      border-right: none;
    }
  }
}
.units-wrapper {
  position: relative;
  width: $header-width;
  border-right: $border;
  .units {
    display: flex;
    flex-flow: column nowrap;
    background: lightgray;
    .unit {
      height: $cell-height;
      border-bottom: $border;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
.events {
  position: absolute;
  top: $header-height;
  left: $header-width;
  width: calc(100% - #{$header-width});
  height: calc(100% - #{$header-height});
  overflow: scroll;
  .unit-events {
    float: left;
    height: $cell-height;
    border-bottom: $border;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
