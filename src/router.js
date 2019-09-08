import Router from 'vue-router'
import PublicMainPage from "./components/PublicMainPage.vue"
import MainView from "./components/MainViewComponent.vue"
import SimpleView from "./components/SimpleViewComponent.vue"
import LoginHome from "./components/LoginHomeComponent.vue"
import Statistics from './components/MiniChartsComponent.vue'
import Vue from 'vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
    },
    {
      path: '/simpleView',
      name: 'SimpleView',
      component: SimpleView
    },
    {
      path: '/home',
      name: 'LoginHome',
      component: LoginHome
    },
    {
      path: '/stats',
      name: 'Statistics',
      component: Statistics
    }
  ]
})

Vue.router = router;

const requiresLogin = ["Main", 'SimpleView', 'LoginHome', 'Statistics'];

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

export default router;