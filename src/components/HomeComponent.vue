<template>
    <div>
        <div class="d-flex flex-row-reverse dark-nav">
            <button v-on:click="changeLogin" class="btn btn-secondary">{{ loginButtonText }}</button>
            <span v-if="showSecret" class="username">Hello {{ currentUser }}</span>
        </div>
        <div class="row content">
            <div class="col-sm-10 offset-sm-1">
                <transition name="fade">
                    <login-component class="loginApplet" v-if="showLoginApplet"></login-component>
                </transition>
                <transition name="fade">
                    <secret-component v-if="showSecret"></secret-component>
                </transition>
                <transition name="fade">
                    <div class="d-flex justify-content-center" v-if="showPublicPage">
                        <index-public></index-public>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Login from "./LoginComponent.vue"
import SecretView from "./SecretView.vue"
import PublicMainPage from "./PublicMainPage.vue"

export default {
    components: {
        'login-component': Login,
        'secret-component': SecretView,
        'index-public': PublicMainPage
    },
    data() {
        return {
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
        },
    },
    methods: {
        changeLogin: function() {
            var currentState = this.$store.state.loginStatus;
            if (currentState == "notLogged")
                this.$store.dispatch("displayLoginWindow");
            else
                this.$store.dispatch("logOut");
        }
    }
}
</script>

<style scoped>
.dark-nav{
    background-color: rgb(53, 53, 53);
    padding: 20px;
}

.content{
    height: -webkit-fill-available;
    background-color: rgb(114, 116, 117);
    color: aliceblue;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
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
