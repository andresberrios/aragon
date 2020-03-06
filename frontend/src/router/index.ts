import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Calendar from "../views/Calendar.vue";
import Procedures from "../views/Procedures.vue";
import EditProcedure from "../views/EditProcedure.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Calendar
  },
  {
    path: "/procedures",
    name: "procedures",
    component: Procedures
  },
  {
    path: "/procedures/new",
    name: "procedures.new",
    component: EditProcedure
  },
  {
    path: "/procedures/:id/edit",
    name: "procedures.edit",
    component: EditProcedure,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
