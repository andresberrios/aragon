import Vue from "vue";
import VueRouter from "vue-router";
import Calendar from "../views/Calendar.vue";
import Procedures from "../views/Procedures.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Calendar",
    component: Calendar
  },
  {
    path: "/procedures",
    name: "Procedures",
    component: Procedures
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
