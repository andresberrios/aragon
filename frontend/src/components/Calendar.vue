<template>
  <div>
    <div class="text-center">
      <b-button class="mr-4" @click="extendRange('from')">&lt;-|</b-button>
      <MonthSelector v-model="current" class="my-4" @input="selectMonth" />
      <b-button class="ml-4" @click="extendRange('to')">|-&gt;</b-button>
    </div>
    <div class="calendar">
      <div class="days-wrapper">
        <div class="days-scroller" :style="{ left: `${-scrollX}px` }">
          <div class="months">
            <div
              class="month"
              v-for="month in months"
              :key="month.start.toMillis()"
              :style="monthStyles(month)"
            >
              <div class="month-label" :style="monthLabelStyles(month)">
                {{ month.start.monthLong }}
              </div>
            </div>
          </div>
          <div class="days" ref="days">
            <div
              class="day"
              v-for="day in days"
              :key="day.start.toMillis()"
              :style="{ background: day.contains(Date.now()) ? 'gold' : null }"
            >
              {{ day.start.day }}
            </div>
          </div>
        </div>
      </div>
      <div class="units-wrapper">
        <div class="units" :style="{ top: `${-scrollY}px` }">
          <div class="unit" v-for="unit in units" :key="unit.id">
            <div class="name">{{ unit.name }}</div>
          </div>
        </div>
      </div>
      <div class="events" ref="events" @scroll="eventsScrolled">
        <div class="unit-events" v-for="unit in units" :key="unit.id">
          <div class="days">
            <div
              class="day"
              v-for="day in days"
              :key="day.start.toMillis()"
              :style="{ background: day.contains(Date.now()) ? 'gold' : null }"
            ></div>
          </div>
          <div class="stays">
            <Stay
              v-for="{ stay, booking } in stays[unit.id]"
              :key="stay.id"
              :style="stayStyles(stay)"
              @click.native="showBookingDetails(booking)"
            >
              {{ stay.guests[0].firstName }}
              {{ stay.guests[0].lastName }}
            </Stay>
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
import StayComponent from "./Stay.vue";
import data from "../assets/testData";
import { Booking, Stay } from "../interfaces";

@Component({
  components: { MonthSelector, Stay: StayComponent }
})
export default class Calendar extends Vue {
  units = data.units;
  bookings = data.bookings;

  current: { month: number; year: number };
  from: DateTime;
  to: DateTime;
  days: Interval[] = [];
  months: Interval[] = [];
  scrollX = 0;
  scrollY = 0;
  dayWidth = 0;

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
    this.months = Interval.fromDateTimes(
      this.from.startOf("month"),
      this.to.endOf("month")
    ).splitBy({ month: 1 });
  }

  @Watch("days.length")
  async computeDayWidth() {
    await Vue.nextTick();
    this.dayWidth =
      (this.$refs.days as HTMLElement).offsetWidth / this.days.length;
  }

  getPosition(datetime: DateTime, from = this.from) {
    return datetime.diff(from, "days").days * this.dayWidth;
  }

  async extendRange(side: "from" | "to", days = 7) {
    const events = this.$refs.events as Element;
    if (side === "from") {
      this.from = this.from.minus({ days: 7 });
      this.updateRange();
      await Vue.nextTick();
      events.scroll({ left: days * this.dayWidth + events.scrollLeft });
      await new Promise(r => setTimeout(r, 0));
      events.scroll({ left: 0, behavior: "smooth" });
    } else {
      this.to = this.to.plus({ days: 7 });
      this.updateRange();
      await Vue.nextTick();
      events.scroll({ left: events.scrollWidth, behavior: "smooth" });
    }
  }

  eventsScrolled() {
    const events = this.$refs.events as Element;
    this.scrollX = events.scrollLeft;
    this.scrollY = events.scrollTop;
  }

  monthStyles(month: Interval) {
    const position = this.getPosition(month.start);
    return {
      left: `${position}px`,
      width: `${this.getPosition(month.end) - position}px`
    };
  }

  monthLabelStyles(month: Interval) {
    let position = this.getPosition(this.from, month.start) + this.scrollX;
    if (position < 0) {
      position = 0;
    }
    return { left: position + "px" };
  }

  get stays() {
    const stays: { [unitId: string]: { stay: Stay; booking: Booking }[] } = {};
    for (const booking of this.bookings) {
      for (const stay of booking.stays) {
        stays[stay.unitId] = stays[stay.unitId] || [];
        stays[stay.unitId].push({ stay, booking });
      }
    }
    return stays;
  }

  stayStyles(stay: Stay) {
    const position = this.getPosition(stay.checkIn);
    return {
      left: `${position + (4 * this.dayWidth) / 6}px`,
      width: `${this.getPosition(stay.checkOut) -
        position -
        this.dayWidth / 3}px`
    };
  }

  showBookingDetails(booking: Booking) {
    alert(JSON.stringify(booking));
  }
}
</script>

<style scoped lang="scss">
$months-height: 2em;
$days-height: 2em;
$header-height: $months-height + $days-height;
$header-width: 10em;
$cell-width: 4em;
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
  .days-scroller {
    position: absolute;
    height: 100%;
  }
  .days {
    position: absolute;
    top: $months-height;
    height: $days-height;
    text-align: center;
    background: lightgray;
    border-bottom: $border;
  }
  .months {
    position: absolute;
    top: 0;
    height: $months-height;
    .month {
      position: absolute;
      height: 100%;
      overflow: hidden;
      border: solid 2px black;
      background: lightgray;
      .month-label {
        position: relative;
      }
    }
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
    position: relative;
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
    position: relative;
    height: $cell-height;
    border-bottom: $border;
    &:last-child {
      border-bottom: none;
    }
    .stays {
      position: absolute;
      top: 0;
      height: $cell-height;
    }
  }
}
</style>
