import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },

  {
    path: "/",
    name: "userboard",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserBoard.vue"),
    redirect: "/score",
    children: [
      // Pages
      // {
      //   name: 'Dass',
      //   path: '/das',
      //   component: () => import('../views/DashBoard.vue'),
      // },
      {
        name: "User Profile",
        path: "/score",
        component: () => import("../views/UserProfile.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
