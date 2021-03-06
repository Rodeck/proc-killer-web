import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import * as User from '../types/User'
import * as moment from 'moment';
import * as Day from '../types/Day'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

var config = {
    api: "https://localhost:44390/api"
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

function getUserId(context) {
    if (context && context.state.user)
    {
        return context.state.user.id;
    }
    else if (localStorage.getItem('userId'))
    {
        return localStorage.getItem('userId')
    }
}

export const store = new Vuex.Store({
    strict: true,
    plugins: [
        createPersistedState({
          getState: (key) => Cookies.getJSON(key),
          setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
        })
    ],
    state: {
        // notLogged, displayingLoginApplet, loggingIn, loggedIn
        user: null,
        viewKey: 0,
        pickedDay: null,
        isDayPicked: false,
        appState: {
            login: {
                state: "notLogged",
                message: null
            },
            register: {
                state: "idle",
                message: null
            },
            events: {
                state: "notLoaded",
                message: null
            },
            callendar: {
                state: "notLoaded",
                message: null
            },
            charts: {
                pointsPerDay: { 
                    state: "notLoaded",
                    message: null
                }
            },
            deletingTodo: {
                state: "idle",
                message: null,
                todoToDelete: 0,
                showWindow: false
            },
            addingTodo: {
                state: "idle",
                message: null,
                showWindow: false
            },
            popup: {
                show: false,
                content: 'None'
            }
        }
    },
    getters: {
        isRegistering(state) {
            return state.appState.register.state == 'registering';
        },
        isRegisterError(state) {
            return state.appState.register.state == 'error';
        },
        registerMessage(state) {
            return state.appState.register.message;
        },
        isRegisterSuccess(state) {
            return state.appState.register.state == 'success';
        },
        isChartLoaded(state) {
            return chart => {
                return state.appState.charts[chart].state == "loaded";
            }
        },
        showLoginButton: state => {
            return state.appState.login.state == "logginIn" 
                || state.appState.login.state == "notLogged" 
                || state.appState.login.state == "displayingLoginApplet";
        },
        showLoginApplet: state => {
            return state.appState.login.state== "displayingLoginApplet" 
                || state.appState.login.state == "logginIn"
                || state.appState.login.state == "error";
        },
        showSecretApplet: state => {
            return state.appState.login.state == "loggedIn";
        },
        showAddTodoWindow: state => {
            return state.appState.addingTodo.showWindow;
        },
        userName: state => {
            if (state.user != null)   
                return state.user.username || "None";
            return "None";
        },
        isLoadingData: state => {
            return state.appState.callendar.state == "loading";
        },
        isDataLoaded: state => {
            return state.appState.callendar.state != "loading" 
                && state.appState.callendar.state != 'notLoaded';
        },
        isLoadingEvents: state => {
            return state.appState.events.state == "loading";
        },
        isEventsLoaded: state => {
            return state.appState.events.state != "loading" 
                && state.appState.events.state != 'notLoaded';
        },
        getEvents: state => state.events,
        isAddingTodo: state => {
            return state.appState.addingTodo.state == 'inProgress';
        },
        showAddingTodoError: state => {
            return state.appState.addingTodo.state == 'failed';
        },
        getCallendar: state => {
            return state.callendar;
        },
        pickedDayDate: state => {
            if(state.pickedDay)
                return state.pickedDay.date;
            else
                return null;
        },
        isLogged: state => {
            return state.appState.login.state == "loggedIn";
        },
        registerError: state => {
            return state.appState.register.state == "error";
        },
        isLoginError: state => {
            return state.appState.login.state == "error";
        },
        loginErrorMessage: state => {
            return state.appState.login.message;
        },
        user: state => {
            if (state.user == null)
                return null;

            return {
                username: state.user.username,
                points: state.user.currentState.points,
                currentLoginStreak: state.user.currentState.currentLoginStreak,
                longestLoginStreak: state.user.currentState.longestLoginStreak,
                todosCompleted: state.user.currentState.totalTodosCompleted,
            }
        },
        chartData: state => {
            return chart => {
                if (state.appState.charts[chart] != null)
                    return state.appState.charts[chart].data;
                else
                    return null;
            }
        },
        showPopup: state => {
            return state.appState.popup.show;
        },
        today: state => {
            return state.today;
        },
        tomorrow: state => {
            return state.tomorrow;
        },
        yesterday: state => {
            return state.yesterday;
        }
    },
    mutations: {
        changeLoginStatus: (state, newStatus) => {
            state.appState.login.state = newStatus;
        },
        loginError: (state, error) => {
            state.appState.login.state = error.state;
            state.appState.login.message = error.message;
        },
        logIn: (state) => {
            state.appState.login.state = "logged";
        },
        logOut: (state) => {
            state.appState.login.state = "notLogged";
            localStorage.setItem('token', null);
            state.user = null;
        },
        saveToken: (state, token) => {
            localStorage.setItem('token', token);
        },
        saveLoggedUser: (state, userData) => {
            localStorage.setItem('token', userData.user.token);
            localStorage.setItem('userId', userData.user.id);
            state.appState.login.state = "loggedIn";
            state.user = userData.user;
        },
        setUser: (state, user) => {
            state.user = user;
        },
        startLoadingData: (state) => {
            state.appState.callendar.state = 'loading';
        },
        startLoadingEvents: (state) => {
            state.appState.events.state = 'loading';
        },
        loadingDataSuccess: (state, data) => { 
            state.callendar = data;

            var today = data.filter( x => {
                return moment(x.date).isSame(moment(), 'day');
            })[0];

            state.today = today == undefined ? {
                date: moment().format("YYYY-MM-DD"),
                todos: new Array(),
                allCompleted: false
            }: today;

            if (state.today.todos.length > 0)
                state.today.pickedTodo = state.today.todos[0];
            else
                state.today.pickedTodo = false;

            var yesterday = data.filter( x => {
                return moment(x.date).isSame(moment().subtract(1, 'days'), 'day');
            })[0];

            state.yesterday = yesterday == undefined ? {
                date: moment().subtract(1, 'days').format("YYYY-MM-DD"),
                todos: new Array(),
                allCompleted: false
            }: yesterday;

            if (state.yesterday.todos.length > 0)
                state.yesterday.pickedTodo = state.yesterday.todos[0];
            else
                state.yesterday.pickedTodo = false;

            var tomorrow = data.filter( x => {
                return moment(x.date).isSame(moment().add(1, 'days'), 'day');
            })[0];

            state.tomorrow = tomorrow == undefined ? {
                date: moment().add(1, 'days').format("YYYY-MM-DD"),
                todos: new Array(),
                allCompleted: false
            }: tomorrow; 

            if (state.tomorrow.todos.length > 0)
                state.tomorrow.pickedTodo = state.tomorrow.todos[0];
            else
                state.tomorrow.pickedTodo = false;

            console.log("Data loaded.");
            state.appState.callendar.state = 'loaded';
            state.viewKey += 1;
        },
        loadingChartDataSuccess: (state, data) => {
            state.appState.charts[data.chart].data = data.data;
            state.appState.charts[data.chart].state = "loaded";
        },
        loadingEventsSuccess: (state, data) => { 
            state.events = data;
            state.appState.events.state = 'loaded';
        },
        displayAddTodoWindow: (state) => {
            state.appState.addingTodo.showWindow = true;
        },
        hideAddTodoWindow: (state) => {
            state.appState.addingTodo.showWindow = false;
            state.appState.addingTodo.message = "";
            state.appState.addingTodo.state = 'idle';
        },
        startAddingTodo: (state) => {
            state.appState.addingTodo.state = 'inProgress';
        },
        endAddingTodoSuccess: (state) => {
            state.appState.addingTodo.state = 'idle';
        },
        endAddingTodoError: (state, message) => {
            state.appState.addingTodo.state = 'failed';
            state.appState.addingTodo.message = message;
        },
        pickDay: (state, day) => {
            state.pickedDay = day;
            state.isDayPicked = true;
        },
        displayDeleteTodoWindow: (state, todoId) => {
            state.appState.deletingTodo.showWindow = true;
            state.appState.deletingTodo.todoToDelete = todoId;
        },
        hideDeleteTodoWindow: (state) => {
            state.appState.deletingTodo.showWindow = false;
            state.appState.deletingTodo.message = "";
            state.appState.deletingTodo.state = 'idle';
            state.appState.deletingTodo.todoToDelete = 0;
        },
        startDeletingTodo: (state) => {
            state.appState.deletingTodo.state = 'inProgress';
        },
        endDeleteingTodoSuccess: (state) => {
            state.appState.deletingTodo.statee = 'idle';
            state.appState.deletingTodo.message = "";
        },
        endDeleteingTodoError: (state, message) => {
            state.appState.deletingTodo.state = 'failed';
            state.appState.deletingTodo.message = message;
        },
        changePickedTodo: (state, date) => {
            if (state.today.date == date) {
                if (state.today.todos.length == 1 && state.today.pickedTodo == false)
                {
                    state.today.pickedTodo = state.today.todos[0];
                }
                else if (state.today.todos.length == 1 && state.today.pickedTodo != false)
                {
                    state.today.pickedTodo = false;
                }
                else {
                    state.today.pickedTodo = state.today.todos.filter(x => {
                        return x.id != state.today.pickedTodo.id;
                    })[0];
                }
            }
            else if (state.yesterday.date == date) {
                if (state.yesterday.todos.length == 1 && state.yesterday.pickedTodo == false)
                {
                    state.yesterday.pickedTodo = state.yesterday.todos[0];
                }
                else if (state.yesterday.todos.length == 1 && state.yesterday.pickedTodo != false)
                {
                    state.yesterday.pickedTodo = false;
                }
                else {
                    state.yesterday.pickedTodo = state.yesterday.todos.filter(x => {
                        return x.id != state.yesterday.pickedTodo.id;
                    })[0];
                }
            }
            else if (state.tomorrow.date == date) {
                console.log("Change tomorrow todo.");
                if (state.tomorrow.todos.length == 1 && state.tomorrow.pickedTodo == false)
                {
                    state.tomorrow.pickedTodo = state.tomorrow.todos[0];
                }
                else if (state.tomorrow.todos.length == 1 && state.tomorrow.pickedTodo != false)
                {
                    state.tomorrow.pickedTodo = false;
                }
                else {
                    state.tomorrow.pickedTodo = state.tomorrow.todos.filter(x => {
                        return x.id != state.tomorrow.pickedTodo.id;
                    })[0];
                }
            }
        },
        showPopup: (state, content) => {
            state.appState.popup = {
                show: true,
                content: content
            };
        },
        hidePopup: (state) => {
            state.appState.popup = {
                show: false,
                content: 'None'
            };
        },
        setRegistering: (state) => {
            state.appState.register = {
                state: 'registering',
                message: ''
            };
        },
        setRegisterSuccess: (state) => {
            state.appState.register = {
                state: 'success',
                message: 'Successfuly registred, check your email adress and confirm account.'
            };
        },
        setRegisterError: (state, message) => {
            state.appState.register = {
                state: 'error',
                message: message
            };
        }
    },
    actions: {
        showPopup: (context, content) => {
            context.commit('showPopup', content);
        },
        hidePopup: (context) => {
            context.commit('hidePopup');
        },
        logIn: (context, payload) => {
            // use payload pass and login
            context.commit('changeLoginStatus', "logginIn");
            console.log("Login: " + payload.username + ", pass: " + payload.password);

            axios.post(config.api + '/Users/authenticate', {
                Username: payload.username,
                Password: payload.password
            })
            .then(function (response) {
                console.log(response);
                if (response && response.data && response.data.result && response.data.result.token)
                {
                    console.log('Udalo sie zalogowac. ' + response.data.result.token);
                    context.commit('saveLoggedUser', {
                        user: response.data.result
                    });
                }
                else
                {
                    console.log("Nie udalo sie zalogowac.");

                    if (response && response.data && response.data.statusCode == 401)
                        context.commit('loginError', { state: "error", message: response.data.validationState.errors[0].message});
                    else
                        context.commit('loginError', { state: "error", message: "There was an error during logging in, try again later." });
                }
            })
            .catch(function (error) {
                console.log(error);
                context.commit('loginError', { state: "error", message: "There was an error during logging in, try again later." });
            });
        },
        logOut: (context, payload) => {
            // use payload pass and login
            context.commit('changeLoginStatus', "notLogged");
            context.commit('logOut');
        },
        register: (context, payload) => {

            console.log("Register: " + JSON.stringify(payload));
            context.commit('setRegistering');

            axios.post(config.api + '/Users/register', {
                Username: payload.username,
                Password: payload.password,
                Email: payload.email
            })
            .then(function (response) {
                console.log(response);
                if (response.status && response.status == 200)
                {
                    console.log('Udalo sie zarejestrowac. ');
                    context.commit('setRegisterSuccess');
                }
                else
                {
                    console.log("Nie udalo sie zarejestrowac.");
                    context.commit('setRegisterError', 'Error during register process, try again later.');
                }
            })
            .catch(function (error) {
                if (error && error.response && error.response.data && error.response.data.errors)
                    var message = error.response.data.errors.map(e => e.object + ': ' + e.message).reduce((map, obj) => {
                        map[obj.key] = obj.val;
                        return map;
                    });
                context.commit('setRegisterError', 'Error during register process. ' + (message ? message : ""));
            });
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
            
            console.log("Starting downloading data.");

            const options = {
                method: 'GET',
                headers : authHeader(),
                url: config.api + '/Users/getCallendar/' + getUserId(context)
            };

            axios(options)
            .then(function (response) {
                if (response.data.result)
                {
                    context.commit('loadingDataSuccess', response.data.result);
                    context.dispatch('loadEvents');
                }
                else
                {
                    context.commit('loadingDataFailed');
                }
            })
            .catch(function (error) {
                console.log(error);
                context.commit('loadingDataFailed');
            });
        },
        loadEvents: (context) => {
            context.commit('startLoadingEvents');
            
            console.log("Starting downloading events.");

            const options = {
                method: 'GET',
                headers : authHeader(),
                url: config.api + '/Users/getEvents/' + getUserId(context)
            };

            axios(options)
            .then(function (response) {
                if (response.data.result)
                {
                    context.commit('loadingEventsSuccess', response.data.result);
                }
                else
                {
                    context.commit('loadingEventsFailed');
                }
            })
            .catch(function (error) {
                context.commit('loadingEventsFailed');
            });

            console.log("End downloading data.");
        },
        loadChartData: (context, chart) => {
            //context.commit('startLoadingChartData');

            const options = {
                method: 'GET',
                headers : authHeader(),
                url: config.api + '/Statistics/' + chart + '/' + getUserId(context)
            };

            axios(options)
            .then(function (response) {
                if (response.data.result)
                {
                    context.commit('loadingChartDataSuccess', {
                        chart: chart,
                        data: response.data.result
                    });
                }
                else
                {
                    context.commit('loadingChartDataFailed');
                }
            })
            .catch(function (error) {
                context.commit('loadingChartDataFailed');
            });

            console.log("End downloading data.");
        },
        markCompleted: (context, id) => {
            const options = {
                method: 'POST',
                headers : authHeader(),
                url: config.api + '/Todo/MarkCompleted',
                data: {UserId: getUserId(context), Id: id}
            };

            axios(options)
            .then(function (response) {
                console.log("Succes while marking todo as completed.")
                context.dispatch('loadData');
            })
            .catch(function (error) {
                console.log("Error while marking todo as completed.")
            });
        },
        restore: (context, id) => {
            const options = {
                method: 'POST',
                headers : authHeader(),
                url: config.api + '/Todo/Restore',
                data: {UserId: getUserId(context), Id: id}
            };

            axios(options)
            .then(function (response) {
                console.log("Succes while restoring todo.")
                context.dispatch('loadData');
            })
            .catch(function (error) {
                console.log("Error while restoring todo.")
            });
        },
        displayAddTodoWindow: (context) => {
            context.commit('displayAddTodoWindow');
        },
        hideAddWindow: (context) => {
            context.commit('hideAddTodoWindow');
        },
        addTodo: (context, payload) => {
            context.commit('startAddingTodo');

            console.log(payload.date);
            var apiDate = moment(payload.date, "YYYY-MM-DD").format("YYYY-MM-DD[T00:00:00.00]");

            const options = {
                method: 'POST',
                headers : authHeader(),
                url: config.api + '/Todo/AddTodo',
                data: {Name: payload.name, Description: payload.description, UserId: getUserId(context), TargetDate: apiDate}
            };

            axios(options)
            .then(function (response) {
                context.commit('hideAddTodoWindow');
                context.dispatch('loadData');
            })
            .catch(function (error) {
                context.commit('endAddingTodoError', 'An error occured!');
            });
        },
        pickDay: (context, date) => {

            var momentDate = moment(date, "YYYY-MM-DD[T00:00:00.00]");

            let callendarDays = context.state.callendar.filter( x => {
                return moment(x.date).diff(momentDate) == 0;
            });

            if (callendarDays.length == 1)
            {
                context.commit('pickDay', callendarDays[0]);
            }
            else
            {
                context.commit('pickDay', new Day.Day(date, [], false));
            }
        },
        displayDeleteTodoWindow(context, todoId) {
            context.commit('displayDeleteTodoWindow', todoId);
        },
        changePickedTodo(context, date) {
            context.commit('changePickedTodo', date);
        },
        hideDeletingTodoWindow(context) {
            context.commit('hideDeleteTodoWindow');
        },
        deleteTodo: (context) => {

            context.commit("startDeletingTodo")

            const options = {
                method: 'DELETE',
                headers : authHeader(),
                url: config.api + '/Todo/deleteTodo/'+ context.state.user.id + "/" + context.state.todoToDelete,
            };

            axios(options)
            .then(function (response) {
                context.dispatch('loadData');
                context.commit('endDeleteingTodoSuccess');
                context.commit('hideDeleteTodoWindow');
            })
            .catch(function (error) {
                context.commit('endDeleteingTodoError', 'An error occured!');
            });
        },
        mockLogin: (context) => {
            context.dispatch('logIn', { username: "test10", password: "123456"});
        }
    }
});
