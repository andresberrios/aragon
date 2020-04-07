import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import auth from "../services/auth";

import Calendar from "../views/Calendar.vue";
import Procedures from "../views/Procedures.vue";
import EditProcedure from "../views/EditProcedure.vue";
import ShowProcedure from "../views/ShowProcedure.vue";
import InvoicesForm from "../views/InvoicesForm.vue";
import Auth from "../views/Auth.vue";
import NotFound from "../views/NotFound.vue";
import Contacts from "../views/Contacts.vue";
import ShowContact from "../views/ShowContact.vue";
import EditContact from "../views/EditContact.vue";
import PaymentsForm from "../views/PaymentsForm.vue";

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
    path: "/procedures/:id",
    name: "procedures.show",
    meta: { title: "Procedure" },
    component: ShowProcedure,
    props: true
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
    path: "/invoices/new",
    name: "invoices.new",
    meta: { title: "New Invoice" },
    component: InvoicesForm
  },
  {
    path: "/contacts",
    name: "contacts",
    meta: { title: "Contacts" },
    component: Contacts
  },
  {
    path: "/contacts/:id",
    name: "contacts.show",
    meta: { title: "Contact" },
    component: ShowContact,
    props: true
  },
  {
    path: "/contacts/new",
    name: "contacts.new",
    meta: { title: "New Contact" },
    component: EditContact
  },
  {
    path: "/contacts/:id/edit",
    name: "contacts.edit",
    meta: { title: "Edit Contact" },
    component: EditContact,
    props: true
  },
  {
    path: "/payments/new",
    name: "payments.new",
    meta: { title: "New Payment" },
    component: PaymentsForm
  },
  {
    path: "/auth",
    name: "auth",
    meta: { title: "Authenticate", hideNavBar: true },
    component: Auth
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
  const isAuthenticated = await auth.isAuthenticated();
  if (to.name !== "auth" && !isAuthenticated) {
    next({ name: "auth" });
  } else if (to.name === "auth" && isAuthenticated) {
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
