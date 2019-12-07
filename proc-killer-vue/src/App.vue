<template>
  <div id="app" class="background">
    <md-toolbar class="md-primary md-layout md-alignment-center-space-between toolbar">
        <div class="md-layout-item md-size-70 align-left md-layout md-gutter">
            <div class="md-layout-item md-size-35 align-left md-layout md-gutter md-display-2 logo-wrapper">
                Procrastination killer
            </div>
            <div class="md-layout-item md-size-40 align-left md-layout md-gutter md-alignment-center-left">
                <router-link to="/" v-if="!isLogged" :class="{ current: currentView == '' }"><md-button>Home</md-button></router-link>
                <router-link to="/home" v-else :class="{ current: currentView == 'home'}"><md-button>Home</md-button></router-link>
                <router-link to="/calendar" v-if="canBeDisplayed('Calendar')" :class="{ current: currentView == 'calendar'}"><md-button>Calendar</md-button></router-link>
                <!-- <router-link to="/list" v-if="canBeDisplayed('List')" :class="{ current: currentView == 'list'}"><md-button>Todo List</md-button></router-link> -->
                <router-link to="/dashboard" v-if="canBeDisplayed('Dashboard')" :class="{ current: currentView == 'dashboard'}"><md-button>Dashboard</md-button></router-link>
                <router-link to="/ranking" v-if="canBeDisplayed('Ranking')" :class="{ current: currentView == 'ranking'}"><md-button>Ranking</md-button></router-link>
                <!--<router-link to="/charts" v-if="canBeDisplayed('Charts')"><md-button>Charts</md-button></router-link>-->
            </div>
        </div>
        <md-menu md-align-trigger>
            <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>account_circle</md-icon>
            </md-button>

            <md-menu-content>
                <md-menu-item>
                    <md-button v-on:click="changeLogin">Settings</md-button>
                </md-menu-item>
                <md-menu-item>
                    <md-button class="md-accent" v-on:click="changeLogin">{{ loginButtonText }}</md-button>
                </md-menu-item>
            </md-menu-content>
        </md-menu>
    </md-toolbar>
    <div class="content">
        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transition>
        <transition name="fade">
            <login-component class="loginApplet" v-if="showLoginApplet"></login-component>
        </transition>
    </div>
  </div>
</template>

<script>
import '../Viewport.scss'
import { router, requiresLogin} from './router'
import Login from "./components/LoginComponent.vue"
import SecretView from "./components/SecretView.vue"
import PublicMainPage from "./components/PublicMainPage.vue"

export default {
    name: 'app',
    router,
    components: {
        'login-component': Login,
        'secret-component': SecretView,
        'index-public': PublicMainPage
    },
    computed: {
        currentView() {
            return this.$route.fullPath.replace('/', '');
        },
        showLoginButton(){
            return this.$store.getters.showLoginButton;
        },
        showSecret(){
            return this.$store.getters.showSecretApplet;
        },
        showPublicPage(){
            return !this.$store.getters.showSecretApplet;
        },
        showLoginApplet(){
            return this.$store.getters.showLoginApplet;
        },
        loginButtonText(){
            return this.showLoginButton ? "Login" : "Logout";
        },
        currentUser(){
            return this.$store.getters.userName;
        },
        isLogged() {
            return this.$store.getters.isLogged;
        }
    },
    watch: {
        showSecret: function(value) {
            if (value)
            {
                //this.$router.push('Main');
            }
                else
            {
                //this.$router.push('Home');
            }
        }
    },
    methods: {
        changeLogin: function() {
            var isLogged = this.$store.getters.isLogged;
            if (!isLogged)
                this.$store.dispatch("displayLoginWindow");
            else
                this.$store.dispatch("logOut");
        },
        mockLogin: function() {
            this.$store.dispatch("mockLogin");
        },
        canBeDisplayed(component) {
            const requires = requiresLogin.filter(e => e === component.length > 0);
            if (requires && this.isLogged)
            {
                return true;
            }
            else if (requires && !this.isLogged)
            {
                return false;
            }

            return true;
        }
    },
    mounted: function() {
        this.mockLogin();
    }
}
</script>

<style scoped>

body{
    font-family: Ubuntu;
    color: #555;
}

.background {
    background-color: rgb(92, 93, 134);
}

.toolbar {
    height: 8%;
}

.current {
    border-bottom: 2px solid black;
}

.content{
    color: aliceblue;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* background-image: url("./assets/motivational-bg.png"); */
    background-size: cover;
    height: 92%;
}

.loginApplet{
    position: absolute;
    margin-top: 100px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.username {
    color: white;
    margin: 0px 20px 0px 20px;
    font-size: 1.5em;
    font-family: Ubuntu;
}

.logo-wrapper {
    height: 100%;
}

</style>
