import { createRouter, createWebHistory } from "vue-router";
import SignUpForm from "../components/auth/SignUpForm.vue";
import SignInForm from "../components/auth/SignInForm.vue";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout.vue";
import Dashboard from "../components/home/Dashboard.vue";
import DeviceView from "../components/home/DeviceView.vue";
import UserView from "../components/home/UserView.vue";
import ContractView from "../components/home/ContractView.vue";
import ProviderView from "../components/home/ProviderView.vue";

const routes = [
  {
    path: "/sign-up",
    name: "signUp",
    component: SignUpForm,
  },
  {
    path: "/sign-in",
    name: "signIn",
    component: SignInForm,
  },
  {
    path: "/",
    component: AuthenticatedLayout,
    children: [
      {
        path: "dashboard",
        component: Dashboard,
      },
      {
        path: "device",
        component: DeviceView,
      },
      {
        path: "user",
        component: UserView,
      },
      {
        path: "contract",
        component: ContractView,
      },
      {
        path: "provider",
        component: ProviderView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
