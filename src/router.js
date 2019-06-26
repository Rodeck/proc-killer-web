import Router from 'vue-router'
import Home from './components/HomeComponent.vue'
import PublicMainPage from "./components/PublicMainPage.vue"
import Login from "./components/LoginComponent.vue"
import MainView from "./components/MainViewComponent.vue"
import Vue from 'vue'
import { store } from './store/store';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PublicMainPage
    },
    {
        path: '/main',
        name: 'Main',
        component: MainView
    }
  ]
})

const requiresLogin = ["Main"];

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(requiresLogin);
  console.log(requiresLogin.some(e => e === to.name));
  if (requiresLogin.some(e => e == to.name) && !localStorage.getItem("token")) {
    
    console.log("Requires page: " + to.name + " , no token, redirect to main.");
    next('Main');
  }
  else
  {
    console.log("Requires page: " + to.name);
    next();
  }
})

export default router;