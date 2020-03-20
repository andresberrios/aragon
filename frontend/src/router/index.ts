import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import auth from "../services/auth";

import Calendar from "../views/Calendar.vue";
import Procedures from "../views/Procedures.vue";
import EditProcedure from "../views/EditProcedure.vue";
import ShowProcedure from "../views/ShowProcedure.vue";
import InvoicesForm from "../views/InvoicesForm.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import ContactForm from "../views/ContactForm.vue";

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
    path: "/invoices/new",
    name: "invoices.new",
    meta: { title: "New Invoice" },
    component: InvoicesForm
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
  },
  {
    path: "/contact/new",
    name: "contact.new",
    meta: { title: "New Contact" },
    component: ContactForm
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await auth.isAuthenticated();
  if (to.name !== "login" && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated) {
    next({ name: "home" });
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
