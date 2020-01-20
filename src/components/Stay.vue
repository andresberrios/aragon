<template>
  <div class="stay">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped lang="scss">
$cell-width: 4em;
$cell-height: 2em;

.stay {
  position: absolute;
  height: 100%;
  $booking-border-width: 1px;
  $booking-border: solid $booking-border-width black;
  border-top: $booking-border;
  border-bottom: $booking-border;
  $booking-background: darken(greenyellow, 10%);
  background: $booking-background;
  z-index: 1;
  cursor: pointer;
  opacity: 0.7;
  &::before {
    content: "";
    z-index: -1;
    display: block;
    position: absolute;
    top: -$booking-border-width;
    left: -$cell-width / 6;
    height: $cell-height;
    width: $cell-width / 2;
    border: $booking-border;
    border-right: none;
    background: $booking-background;
    transform: skewX(-10deg);
  }
  &::after {
    content: "";
    z-index: -1;
    display: block;
    position: absolute;
    top: -$booking-border-width;
    right: -$cell-width / 6;
    height: $cell-height;
    width: $cell-width / 2;
    border: $booking-border;
    border-left: none;
    background: $booking-background;
    transform: skewX(-10deg);
  }
}
</style>
