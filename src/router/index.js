import auth from "@/middleware/auth";
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterView.vue"),
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserProfile.vue"),
  },
  {
    path: "/movie/:id",
    name: "MoviePage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MoviePage.vue"),
    props: true,
  },
  {
    path: "/genre/:id",
    name: "GenrePage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/GenrePage.vue"),
    props: true,
  },
  {
    path: "/add-movie",
    name: "AddMovie",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddMovie.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // código do middleware aqui
  // console.log(this.$apolloProvider);
  auth();
  next();
});

export default router;
