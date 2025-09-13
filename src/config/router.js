import { createRouter, createWebHistory } from "vue-router";
import SignUpForm from "../components/auth/SignUpForm.vue";
import SignInForm from "../components/auth/SignInForm.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
  ],
});

export default router;
