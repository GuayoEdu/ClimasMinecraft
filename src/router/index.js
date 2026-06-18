import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlaceDetailView from "../views/PlaceDetailView.vue";

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
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
