<template>
    <div>
        <md-toolbar md-theme="default" class="md-primary md-layout md-alignment-center-space-between">
            <h1 class="md-layout-item md-size-75">Procrastination killer</h1>
            <div class="md-layout-item md-size-25 align-right md-layout md-gutter md-alignment-center-right">
                <md-button class="md-accent" md-theme="default" v-on:click="changeLogin">{{ loginButtonText }}</md-button>
                <span v-if="showSecret" class="username">Hello {{ currentUser }}</span>
            </div>
        </md-toolbar>
        <div class="row content">
            <transition name="fade">
                <router-view></router-view>
            </transition>
            <transition name="fade">
                <login-component class="loginApplet" v-if="showLoginApplet"></login-component>
            </transition>
        </div>
    </div>
</template>

<script>
import Login from "./LoginComponent.vue"
import SecretView from "./SecretView.vue"
import PublicMainPage from "./PublicMainPage.vue"
import MainView from "./MainViewComponent.vue"

export default {
    components: {
        'login-component': Login,
        'secret-component': SecretView,
        'index-public': PublicMainPage,
        'main-view': MainView
    },
    data() {
        return {
            contentStyle: {
                backgroundColor: 'red'
            },
            background: '../assets/motivational-bg.png' 
        }
    },
    computed: {
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
        }
    },
    methods: {
        changeLogin: function() {
            var currentState = this.$store.state.loginStatus;
            if (currentState == "notLogged")
                this.$store.dispatch("displayLoginWindow");
            else
                this.$store.dispatch("logOut");
        },
        mockLogin: function() {
            this.$store.dispatch("mockLogin");
        }
    },
    mounted: function() {
        this.mockLogin();
    }
}
</script>

<style scoped>

html {
    max-height: 100%;
}

.dark-nav{
    background-color: rgb(53, 53, 53);
    padding: 20px;
    margin-right: 0px;
}

.content{
    background-color: rgb(114, 116, 117);
    color: aliceblue;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-image: url("../assets/motivational-bg.png");
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
</style>
