<template>
  <b-button-group class="month-selector">
    <b-button @click="prevMonth">&lt;</b-button>
    <b-dropdown class="month" :text="currentMonthName">
      <b-dropdown-item
        v-for="[num, month] in months"
        :key="num"
        :active="num === current.month"
        @click="
          current.month = num;
          emitChange();
        "
      >
        {{ month }}
      </b-dropdown-item>
    </b-dropdown>
    <b-dropdown class="year" :text="current.year.toString()">
      <b-dropdown-item
        v-for="year in yearOptions"
        :key="year"
        :active="year === current.year"
        @click="
          current.year = year;
          emitChange();
        "
      >
        {{ year }}
      </b-dropdown-item>
    </b-dropdown>
    <b-button @click="nextMonth">&gt;</b-button>
  </b-button-group>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
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
  current!: { month: number; year: number };

  @Prop({
    default: () => {
      const now = DateTime.local();
      return {
        month: now.month,
        year: now.year
      };
    }
  })
  value!: { month: number; year: number };

  @Watch("value", { immediate: true })
  onValueChanged(value: { month: number; year: number }) {
    this.current = value;
  }

  emitChange() {
    this.$emit("input", this.current);
  }

  get currentMonthName() {
    return this.months.get(this.current.month);
  }

  get yearOptions() {
    const range = 3;
    const options = [];
    for (
      let i = this.current.year - range;
      i < this.current.year + range + 1;
      i++
    ) {
      options.push(i);
    }
    return options;
  }

  prevMonth() {
    this.current.month--;
    this.normalizeMonth();
    this.emitChange();
  }

  nextMonth() {
    this.current.month++;
    this.normalizeMonth();
    this.emitChange();
  }

  normalizeMonth() {
    if (this.current.month < 1) {
      this.current.month = 12;
      this.current.year--;
    } else if (this.current.month > 12) {
      this.current.month = 1;
      this.current.year++;
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
