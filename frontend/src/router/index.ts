import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import auth from "../services/auth";

import Calendar from "../views/Calendar.vue";
import Procedures from "../views/Procedures.vue";
import EditProcedure from "../views/EditProcedure.vue";
import ShowProcedure from "../views/ShowProcedure.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";

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
    path: "/procedures/:id",
    name: "procedures.show",
    meta: { title: "Procedure" },
    component: ShowProcedure,
    props: true
  },
  {
    path: "/procedures/:id/edit",
    name: "procedures.edit",
    meta: { title: "Edit Procedure" },
    component: EditProcedure,
    props: true
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "Login", hideNavBar: true },
    component: Login
  },
  {
    path: "*",
    name: "notFound",
    meta: { title: "Not Found", hideNavBar: true },
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated =
    auth.getJWTToken() || ((await auth.refreshToken()) && auth.getJWTToken());
  if (to.name !== "login" && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = to.meta.title || to.name || "frontend";
  });
});

export default router;
