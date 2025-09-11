import { createRouter, createWebHistory } from "vue-router";
import SignUpForm from "../components/auth/SignUpForm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/signUp",
      name: "signUp",
      component: SignUpForm,
    },
  ],
});

export default router;
