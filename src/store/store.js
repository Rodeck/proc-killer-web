import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import * as User from '../types/User'

Vue.use(Vuex);

var config = {
    api: "https://localhost:44390/api/"
}

function authHeader() {
    // return authorization header with jwt token
    let token = localStorage.getItem('token');

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}

export const store = new Vuex.Store({
    strict: true,
    state: {
        // notLogged, displayingLoginApplet, loggingIn, loggedIn
        loginStatus: "notLogged",
        isLoged: false,
        user: null,
        loadingDataState: "notLoaded"
    },
    getters: {
        showLoginButton: state => {
            return state.loginStatus == "logginIn" || state.loginStatus == "notLogged" || state.loginStatus == "displayingLoginApplet";
        },
        showLoginApplet: state => {
            return state.loginStatus == "displayingLoginApplet" || state.loginStatus == "logginIn";
        },
        showSecretApplet: state => {
            return state.loginStatus == "loggedIn";
        },
        userName: state => {
            return state.user.username || "None";
        },
        isLoadingData: state => {
            return state.loadingDataState == "loading";
        },
    },
    mutations: {
        changeLoginStatus: (state, newStatus) => {
            state.loginStatus = newStatus;
        },
        logIn: (state) => {
            state.isLoged = true;
        },
        logOut: (state) => {
            state.isLoged = false;
            localStorage.setItem('token', null);
            state.user = null;
        },
        saveToken: (state, token) => {
            localStorage.setItem('token', token);
        },
        setUser: (state, user) => {
            state.user = user;
        },
        startLoadingData: (state) => {
            state.loadingDataState = 'loading';
        },
        loadingDataSuccess: (state, data) => {
            state.callendar = data;
            state.loadingDataState = 'loaded';
        }
    },
    actions: {
        logIn: (context, payload) => {
            // use payload pass and login
            context.commit('changeLoginStatus', "logginIn");
            console.log("Login: " + payload.username + ", pass: " + payload.password);

            axios.post(config.api + '/Users/authenticate', {
                Username: payload.username,
                Password: payload.password
            })
            .then(function (response) {
                if (response.data.result.token)
                {
                    console.log('Udalo sie zalogowac. ' + response.data.result.token);
                    context.commit('saveToken', response.data.result.token);
                    context.commit('setUser', response.data.result);
                    context.commit('changeLoginStatus', "loggedIn");
                    context.commit('logIn');
                }
                else
                {
                    console.log("Nie udalo sie zalogowac.");
                    context.commit('changeLoginStatus', "displayingLoginApplet");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        logOut: (context, payload) => {
            // use payload pass and login
            context.commit('changeLoginStatus', "notLogged");
            context.commit('logOut');
        },
        displayLoginWindow: (context, payload) => {
            // use payload pass and login
            context.commit('changeLoginStatus', "displayingLoginApplet");
        },
        hideLoginWindow: (context, payload) => {
            // use payload pass and login
            if (context.state.isLoged)
                context.commit('changeLoginStatus', "loggedIn");
            else
                context.commit('changeLoginStatus', "notLogged");
        },
        loadData: (context) => {
            context.commit('startLoadingData');

            

            const options = {
                method: 'GET',
                headers : authHeader(),
                url: config.api + '/Users/getCallendar/' + context.state.user.id
            };

            console.log('/Users/getCallendar/' + context.state.user.id);

            axios(options)
            .then(function (response) {
                if (response.data.result)
                {
                    context.commit('loadingDataSuccess', response.data.result);
                }
                else
                {
                    context.commit('loadingDataFailed');
                }
            })
            .catch(function (error) {
                context.commit('loadingDataFailed');
            });
        }
    }
});
