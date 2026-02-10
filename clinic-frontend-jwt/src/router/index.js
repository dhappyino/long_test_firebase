import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/medical-home",
      name: "medical-home",
      component: () => import("../views/MedicalHome.vue"),
      children: [
        { path: "", redirect: { name: "case-work" } },
        {
          path: "case-work",
          name: "case-work",
          component: () => import("../views/dashboard/CaseWork.vue"),
        },
        {
          path: "social-work",
          name: "social-work",
          component: () => import("../views/dashboard/SocialWork.vue"),
        },
        {
          path: "nursing",
          name: "nursing",
          component: () => import("../views/dashboard/NursingService.vue"),
        },
        {
          path: "rehab",
          name: "rehab",
          component: () => import("../views/dashboard/RehabService.vue"),
        },
        {
          path: "care",
          name: "care",
          component: () => import("../views/dashboard/CareService.vue"),
        },
        {
          path: "nutrition",
          name: "nutrition",
          component: () => import("../views/dashboard/NutritionService.vue"),
        },
        {
          path: "billing",
          name: "billing",
          component: () => import("../views/dashboard/BillingService.vue"),
        },
        {
          path: "interdisciplinary",
          name: "interdisciplinary",
          component: () => import("../views/dashboard/Interdisciplinary.vue"),
        },
        {
          path: "quality",
          name: "quality",
          component: () => import("../views/dashboard/QualityIndicators.vue"),
        },
        {
          path: "staff",
          name: "staff",
          component: () => import("../views/dashboard/CaseWork.vue"), // Placeholder
        },
        {
          path: "admin",
          name: "admin",
          component: () => import("../views/dashboard/CaseWork.vue"), // Placeholder
        },
      ],
    },
  ],
});

export default router;
