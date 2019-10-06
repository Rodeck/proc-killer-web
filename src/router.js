import Router from 'vue-router'
import PublicMainPage from "./components/PublicMainPage.vue"
import CalendarView from "./components/CalendarComponent.vue"
import SimpleView from "./components/SimpleViewComponent.vue"
import LoginHome from "./components/LoginHomeComponent.vue"
import Statistics from './components/MiniChartsComponent.vue'
import List from './components/TodoListComponent.vue'
import Activate from './components/ActivateAccount.vue'
import Vue from 'vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PublicMainPage
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: CalendarView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: SimpleView
    },
    {
      path: '/home',
      name: 'LoginHome',
      component: LoginHome
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Statistics
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/activate/:secret',
      name: 'ActivateAccount',
      component: Activate
    }
  ]
})

Vue.router = router;

export let requiresLogin = ["Calendar", 'Dashboard', 'LoginHome', 'Charts', 'List'];

router.beforeEach((to, from, next) => {
  if (requiresLogin.some(e => e == to.name) && !localStorage.getItem("token")) {
    
    console.log("Requires page: " + to.name + " , no token, redirect to main.");
    next('LoginHome');
  }
  else
  {
    console.log("Requires page: " + to.name);
    next();
  }
})