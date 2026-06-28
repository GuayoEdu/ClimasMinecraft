import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlaceDetailView from "../views/PlaceDetailView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import FavoritesView from "../views/FavoritesView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/lugar/:id",
    name: "detalle",
    component: PlaceDetailView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/registro",
    name: "registro",
    component: RegisterView
  },
  {
    path: "/favoritos",
    name: "favoritos",
    component: FavoritesView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    next({
      name: "login",
      query: {
        redirect: to.fullPath
      }
    });
    return;
  }
  if ((to.name === "login" || to.name === "registro") && store.state.isAuthenticated) {
    next({ name: "home" });
    return;
  }
  next();
});

export default router;
