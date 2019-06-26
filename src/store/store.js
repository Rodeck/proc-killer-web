import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import * as User from '../types/User'
import * as moment from 'moment';
import * as Day from '../types/Day'

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
    state: {
        // notLogged, displayingLoginApplet, loggingIn, loggedIn
        loginStatus: "notLogged",
        isLoged: false,
        user: null,
        loadingDataState: "notLoaded",
        loadingEventsState: "notLoaded",
        showAddTodoWindow: false,
        addingTodoState: 'idle', // idle, inProgress, failed,
        addingTodoErrorMessage: "",
        viewKey: 0,
        pickedDay: null,
        isDayPicked: false,
        showDeleteTodoWindow: false,
        deletingTodoState: 'idle',
        deletingTodoErrorMessage: "",
        todoToDelete: 0
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
            if (state.use)   
                return state.user.username || "None";
            return "None";
        },
        isLoadingData: state => {
            return state.loadingDataState == "loading";
        },
        isDataLoaded: state => {
            return state.loadingDataState != "loading" && state.loadingDataState != 'notLoaded';
        },
        isLoadingEvents: state => {
            return state.loadingEventsState == "loading";
        },
        isEventsLoaded: state => {
            return state.loadingEventsState != "loading" && state.loadingEventsState != 'notLoaded';
        },
        getEvents: state => state.events,
        isAddingTodo: state => {
            return state.addingTodoState == 'inProgress';
        },
        showAddingTodoError: state => {
            return state.addingTodoState == 'failed';
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
            return state.isLoged;
        },
        user: state => {
            return {
                username: state.user.username,
                points: state.user.currentState.points,
                currentLoginStreak: state.user.currentState.currentLoginStreak,
                longestLoginStreak: state.user.currentState.longestLoginStreak,
                todosCompleted: state.user.currentState.totalTodosCompleted,
            }
        },
        pointsPerDay: state => {

            const options = {
                method: 'GET',
                headers : authHeader(),
                url: config.api + '/Statistics/pointsPerDay/' + getUserId()
            };

            axios(options)
            .then(function (response) {
                if (response.data.result)
                {
                    return response.data.result
                }
                else
                {
                    console.log("Error.");
                }
            })
            .catch(function (error) {
                console.log("Error.");
            });
        }
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
        saveLoggedUser: (state, userData) => {
            localStorage.setItem('token', userData.user.token);
            localStorage.setItem('userId', userData.user.id);
            state.isLoged = true;
            state.user = userData.user;
            state.loginStatus = 'loggedIn';
        },
        setUser: (state, user) => {
            state.user = user;
        },
        startLoadingData: (state) => {
            state.loadingDataState = 'loading';
        },
        startLoadingEvents: (state) => {
            state.loadingEventsState = 'loading';
        },
        loadingDataSuccess: (state, data) => { 
            console.log("Refreshing data.");
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

            state.loadingDataState = 'loaded';
            console.log("Update view key. Today is: " + JSON.stringify(state.today));
            state.viewKey += 1;
            console.log("End refreshing data.");
        },
        loadingEventsSuccess: (state, data) => { 

            state.events = data;
            state.loadingEventsState = 'loaded';
        },
        displayAddTodoWindow: (state) => {
            state.showAddTodoWindow = true;
        },
        hideAddTodoWindow: (state) => {
            state.showAddTodoWindow = false;
            state.addingTodoErrorMessage = "";
            state.addingTodoState = 'idle';
        },
        startAddingTodo: (state) => {
            state.addingTodoState = 'inProgress';
        },
        endAddingTodoSuccess: (state) => {
            state.addingTodoState = 'idle';
        },
        endAddingTodoError: (state, message) => {
            state.addingTodoState = 'failed';
            state.addingTodoErrorMessage = message;
        },
        pickDay: (state, day) => {
            state.pickedDay = day;
            state.isDayPicked = true;
        },
        displayDeleteTodoWindow: (state, todoId) => {
            state.showDeleteTodoWindow = true;
            state.todoToDelete = todoId;
        },
        hideDeleteTodoWindow: (state) => {
            state.showDeleteTodoWindow = false;
            state.deleteTodoErrorMessage = "";
            state.deletingTodoState = 'idle';
            state.todoToDelete = 0;
        },
        startDeletingTodo: (state) => {
            state.deletingTodoState = 'inProgress';
        },
        endDeleteingTodoSuccess: (state) => {
            state.deletingTodoState = 'idle';
            state.deleteTodoErrorMessage = "";
        },
        endDeleteingTodoError: (state, message) => {
            state.deletingTodoState = 'failed';
            state.deleteTodoErrorMessage = message;
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
                console.log(response);
                if (response.data.result.token)
                {
                    console.log('Udalo sie zalogowac. ' + response.data.result.token);
                    context.commit('saveLoggedUser', {
                        user: response.data.result
                    });
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
                context.commit('loadingDataFailed');
            });

            console.log("End downloading data.");
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
            //context.dispatch('logIn', { username: "test", password: "123456"});
        }
    }
});
