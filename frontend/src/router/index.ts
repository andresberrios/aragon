import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Calendar from "../views/Calendar.vue";
import Procedures from "../views/Procedures.vue";
import EditProcedure from "../views/EditProcedure.vue";
import SalesForm from "../views/SalesForm.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "home",
    redirect: { name: "procedures" }
  },
  {
    path: "/calendar",
    name: "calendar",
    meta: { title: "Calendar" },
    component: Calendar
  },
  {
    path: "/procedures",
    name: "procedures",
    meta: { title: "Procedures" },
    component: Procedures
  },
  {
    path: "/procedures/new",
    name: "procedures.new",
    meta: { title: "New Procedure" },
    component: EditProcedure
  },
  {
    path: "/procedures/:id/edit",
    name: "procedures.edit",
    meta: { title: "Edit Procedure" },
    component: EditProcedure,
    props: true
  },
  {
    path: "/sales/new",
    name: "sales.new",
    meta: { title: "New Sales Document" },
    component: SalesForm
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "Login", hideNavBar: true },
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = to.meta.title || to.name || "frontend";
  });
});

export default router;
