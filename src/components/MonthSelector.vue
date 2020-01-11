<template>
  <b-button-group class="month-selector">
    <b-button @click="prevMonth">&lt;</b-button>
    <b-dropdown class="month" :text="currentMonthName">
      <b-dropdown-item
        v-for="[num, month] in months"
        :key="num"
        :active="num === currentMonth"
        @click="currentMonth = num"
      >
        {{ month }}
      </b-dropdown-item>
    </b-dropdown>
    <b-dropdown class="year" :text="currentYear.toString()">
      <b-dropdown-item
        v-for="year in yearOptions"
        :key="year"
        :active="year === currentYear"
        @click="currentYear = year"
      >
        {{ year }}
      </b-dropdown-item>
    </b-dropdown>
    <b-button @click="nextMonth">&gt;</b-button>
  </b-button-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { DateTime, Info } from "luxon";

@Component
export default class MonthSelector extends Vue {
  readonly months = Info.months("long").reduce<Map<number, string>>(
    (result, month, index) => {
      result.set(index + 1, month);
      return result;
    },
    new Map()
  );
  currentMonth: number;
  currentYear: number;

  constructor() {
    super();
    const now = DateTime.local();
    this.currentYear = now.year;
    this.currentMonth = now.month;
  }

  get currentMonthName() {
    return this.months.get(this.currentMonth);
  }

  get yearOptions() {
    const range = 3;
    const options = [];
    for (
      let i = this.currentYear - range;
      i < this.currentYear + range + 1;
      i++
    ) {
      options.push(i);
    }
    return options;
  }

  prevMonth() {
    this.currentMonth--;
    this.normalizeMonth();
  }

  nextMonth() {
    this.currentMonth++;
    this.normalizeMonth();
  }

  normalizeMonth() {
    if (this.currentMonth < 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else if (this.currentMonth > 12) {
      this.currentMonth = 1;
      this.currentYear++;
    }
  }
}
</script>

<style scoped lang="scss">
.month-selector {
  .month {
    min-width: 140px;
  }
  .year {
    min-width: 100px;
  }
}
</style>
