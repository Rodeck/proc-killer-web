<template>
    <div class="md-content view-content">
        <transition name="fade">
            <add-todo v-if="showAddTodoWindow" :date="date"></add-todo>
        </transition>
        <div class="md-layout md-gutter md-alignment-center-space-around">
            <md-card class="md-layout-item md-size-30">
                <md-card-header>
                    <div class="md-title">Recent rewards</div>
                </md-card-header>
                <md-card-content>
                    <md-list class="md-dense">
                        <md-list-item>
                            <md-icon class="md-primary">email</md-icon>
                            <span class="md-list-item-text">Todo completed</span>
                            <md-button class="md-icon-button md-list-action">
                            <md-badge class="md-square" md-content="+10" />
                            </md-button>
                        </md-list-item>

                        <md-list-item>
                            <md-icon class="md-primary">email</md-icon>
                            <span class="md-list-item-text">Daily login reward</span>
                            <md-button class="md-icon-button md-list-action">
                            <md-badge class="md-square" md-content="+50" />
                            </md-button>
                        </md-list-item>

                        <md-list-item>
                            <md-icon class="md-primary">email</md-icon>
                            <span class="md-list-item-text">Todo completed</span>
                            <md-button class="md-icon-button md-list-action">
                            <md-badge class="md-square" md-content="+50" />
                            </md-button>
                        </md-list-item>

                        <md-list-item>
                            <md-icon class="md-primary">email</md-icon>
                            <span class="md-list-item-text">Completition streak.</span>
                            <md-button class="md-icon-button md-list-action">
                            <md-badge class="md-square" md-content="+150" />
                            </md-button>
                        </md-list-item>
                    </md-list>
                </md-card-content>
            </md-card>
            <md-card class="md-layout-item md-size-60 clostest-wrapper">
                <md-card-header>
                    <div class="md-title">Clostest todos</div>
                </md-card-header>
                <md-card-content class="md-layout md-gutter" v-show="isDataLoaded && filledDays">
                    <div class="md-layout-item md-size-33">
                        <clostest-todo v-bind:day="yesterday" v-bind:key="viewKey"></clostest-todo>
                    </div>

                    <div class="md-layout-item md-size-33">
                        <clostest-todo v-bind:day="today" v-bind:key="viewKey"></clostest-todo>
                    </div>

                    <div class="md-layout-item md-size-33">
                        <clostest-todo v-bind:day="tomorrow" v-bind:key="viewKey"></clostest-todo>
                    </div>
                </md-card-content>
                <md-card-content v-show="!isDataLoaded || !filledDays">
                    <div class="loading-wrapper">
                        <div class="loading-title">
                            Loading...
                        </div>
                        <div class="loading-spinner">
                            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
            <md-card class="md-layout-item md-size-30 second-row">
                <md-card-header>
                    <div class="md-title">Statistics</div>
                </md-card-header>
                <md-card-content class="md-layout md-gutter">
                    
                </md-card-content>
            </md-card>
            <md-card class="md-layout-item md-size-60 second-row">
                <md-card-content class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100">
                        <div class="md-layout md-gutter md-alignment-center-center">
                            <div class="md-layout-item md-size-15">
                                <md-button>
                                    <md-icon class="inline">arrow_left</md-icon>
                                </md-button>
                            </div>
                            <div class="md-layout-item md-size-20 month-title-container">
                                <span class="md-display-3 month-title">May</span>
                            </div>
                            <div class="md-layout-item md-size-15">
                                <md-button>
                                    <md-icon class="inline">arrow_right</md-icon>
                                </md-button>
                            </div>
                        </div>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <div class="week-day-header">
                            Mon
                        </div>
                        <div class="week-day-header">
                            Tue
                        </div>
                        <div class="week-day-header">
                            Wed
                        </div>
                        <div class="week-day-header">
                            Thu
                        </div>
                        <div class="week-day-header">
                            Fri
                        </div>
                        <div class="week-day-header">
                            Sat
                        </div>
                        <div class="week-day-header">
                            Sun
                        </div>
                    </div>
                    <div class="tool-window" id="controll" v-show="showControll" v-closable="{
                            handler: 'closeToolWindow',
                            exclude: ['dayPanel']
                        }">
                        <md-button class="md-icon-button"  v-on:click="addTodo">
                            <md-icon class="inline">add_circle_outlined</md-icon>
                        </md-button>
                        <md-button class="md-icon-button">
                            <md-icon class="inline">clear</md-icon>
                        </md-button>
                    </div>
                    <div class="md-layout-item md-size-100" v-if="isDataLoaded && filledDays">
                        <div v-for="row in rows" v-bind:key="row.no" class="week-wrapper">
                            <div v-for="day in getDays(row.no)" v-bind:key="day.no" class="day-wrapper" v-bind:class="[{deactivatedDay: day.isPast}, {currentDay: day.isToday}]" 
                                 v-on:click="showToolWindow(day.no, $event)" ref="dayPanel"  v-bind:style="{ backgroundColor: calcColor(day.no)}"
                            >
                                <div class="md-body-2 day-no">
                                    {{day.no}}
                                </div>
                                <div class="todos-wrapper" v-if="day.todos">
                                    <div v-for="todo in day.todos.todos" v-bind:key="todo.id" class="single-todo">
                                        {{todo.name}}
                                    </div>
                                </div>
                            </div>  
                        </div>      
                    </div>   
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>

import * as ViewDay from '../types/ViewDay'
import * as Day from '../types/Day'
import * as moment from 'moment';
import TodoView from './TodoView.vue'
import AddTodo from './AddTodo.vue'
import ClostestTodo from './ClostestTodo.vue'

export default {
    components: {
        'todo': TodoView,
        'add-todo': AddTodo,
        'clostest-todo': ClostestTodo
    },
    data() {
        return {
            date: "",
            rows: [ {no: 0}, {no: 1}, {no: 2}, {no: 3}, {no: 4}],
            showControll: false,
            allDays: null,
            filledDays: false,
            today: Object,
            yesterday: Object,
            tomorrow: Object
        }
    },
    computed: {
        callendar(){
            return this.$store.state.callendar;
        },
        isLoadingData(){
            return this.$store.getters.isLoadingData;
        },
        isDataLoaded() {
            return this.$store.getters.isDataLoaded
        },
        showAddTodoWindow(){
            return this.$store.state.showAddTodoWindow;
        },
        showDeleteTodoWindow(){
            return this.$store.state.showDeleteTodoWindow;
        },
        viewKey() {
            return this.$store.state.viewKey;
        },
        dayIsPicked() {
            return this.$store.state.isDayPicked;
        }
    },
    watch: {
        isDataLoaded: function(val) {
            this.fillDays();
        }
    },
    methods: {
        calcColor(day) {
            
            var percent = day/31;
            console.log(day);
            var value = 100 + (80 - (80 * percent));
            return 'rgb(' + value +', ' + value + ', ' + value + ')';
        },
        changeTodaysTodo() {
            console.log("Change todo");
            if (this.today.todos.todos.length == 2)
                this.today.pickedTodo = this.today.todos.todos.filter(x => x.id != this.today.pickedTodo.id)[0];    
        },
        addTodo() {
            this.$store.dispatch('pickDay', this.date);
            this.$store.dispatch('displayAddTodoWindow');
        },
        showToolWindow(dayNo, e) {
            this.showControll = true;

            let x = e.screenX;
            let y = e.screenY - 124;
            var cursor = document.getElementById('controll');
            
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';

            this.pickDay(dayNo)
        },
        closeToolWindow() {
            this.showControll = false;
        },
        getDays(week) {
            return this.allDays.slice(week*7, week*7+7);
        },
        pickDay: function(dayNo) {
            let date = this.allDays.filter(x => x.no == dayNo)[0].date;
            this.date = date.format("DD-MM-YYYY");  
            this.$store.dispatch('pickDay', date);
        },
        hideDeleteWindow: function() {
            this.$store.dispatch('hideDeletingTodoWindow');
        },
        confirmDeleteTodo: function() {
            this.$store.dispatch('deleteTodo');
        },
        fillDays: function() {
            console.log("Fill data");
            this.filledDays = false;
            var daysInMonth = moment().daysInMonth();
            const startOfMonth = moment().startOf('month');
            var dow = startOfMonth.day() - 1;
            var days = new Array();

            for (var no=0;no < dow; no++) {
                days.push({
                    no: 0 - no,
                    date: moment(startOfMonth).subtract(no-1, 'days'),
                    isPast: true
                })
            }

            console.log(this.$store.state.callendar);

            for(var no = 1; no <=daysInMonth; no++) {
                
                var dayDate = moment(startOfMonth).add('days', no-1);
                var momentDate = moment(dayDate, "YYYY-MM-DD[T00:00:00.00]");

                let callendarDays = this.$store.state.callendar.filter( x => {
                    return moment(x.date).isSame(momentDate, 'day');
                });

                let todos = null;
                if (callendarDays.length == 1)
                {
                    todos = callendarDays[0];
                }
                else
                {
                    todos = new Day.Day(dayDate, [], false);
                }

                var isToday = moment(startOfMonth).add('days', no-1).isSame(moment(), 'day');
                var newDay = {
                    no: no,
                    date: dayDate,
                    isToday: isToday,
                    isPast: false,
                    todos: todos
                };

                days.push(newDay);

                if (isToday && todos.todos.length > 0) {
                    newDay.pickedTodo = todos.todos[0];
                }
            }

            this.allDays = days;
            this.filledDays = true;
            this.today = this.$store.state.today;
            this.yesterday = this.$store.state.yesterday;
            this.tomorrow = this.$store.state.tomorrow;
        }
    },
    mounted: function() {
        this.$store.dispatch('loadData');
    }
}
</script>

<style scoped>

.loading-wrapper {
    margin: auto;
    display: table;
}

.loading-spinner {
    display: table;
}

.loading-title {
    display: table;
}

.clostest-wrapper {
    min-height: 280px;
}

.tool-window {
    background-color: #5e5d5d;
    border-radius: 5%;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    position: fixed;
}

.week-wrapper {
    margin-top: 0.7%;
}

.todos-wrapper {
    display: block;
    width: 100%;
}

.single-todo {
    display: inline-block;
    margin-top: 1px;
    width: 110%;
    background-color: rgba(255, 255, 255, 0.342);
    color: red;
    position: relative;
    top: 18px;
    left: -20px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    padding: 2px;
    white-space:nowrap;
    overflow:hidden;
}

.day-no {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    position: relative;
    top: 0px;
}

.month-title-container {
    text-align: center;
    margin-bottom: 1.5%;
}

.inline {
    display: -webkit-inline-box;
}

.day-tools {
    position: relative;
    left: -50px;
    top: -20px;
}

.month-title{ 
    margin: 0 auto;
    display: inline-block;
    width: 100px;
}

.deactivatedDay {
    visibility: hidden !important;
}

.day-wrapper {
    height: 80px;
    width: 13.28%;
    display: inline-flex;
    margin-left: 1%;
    cursor: pointer;
    transition: 0.3s;
}

.currentDay {
    background-color: #919090;
}

.week-day-header {
    width: 12.9%;
    display: inline-block;
    margin-left: 1%;
    text-align: center;
}

.day-wrapper:hover {
    background-color: #6e6e6e;
    -webkit-box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.75);
}

.second-row {
    margin-top: 0.5%;
}

.view-content {
    width: 100%;
    margin-top: 0.5%;
}

.close-button-div i {
    cursor: pointer;
      -webkit-transition: -webkit-transform .8s ease-in-out;
          transition:         transform .8s ease-in-out;
}

.close-button-div i:hover {
    cursor: pointer;
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.main-view-container {
    -webkit-box-shadow: -10px 0px 26px 0px rgba(0,0,0,0.75);
-moz-box-shadow: -10px 0px 26px 0px rgba(0,0,0,0.75);
box-shadow: -10px 0px 26px 0px rgba(0,0,0,0.75);
}

.container * {
    font-family: Ubuntu;
}

.material{
    font-family: 'Material Icons';
}

.delete-form {
    background-color: gray;
    position: absolute;
    width: 30%;
    z-index: 10;
    margin-left: 25%;
    -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
    box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
    margin-top: 150px;
    padding: 30px;
    text-align: center;
}

.content_ {
    height: 550px;
}
.main-view-container {
    height: 75%;
    background-color: rgb(90, 68, 40);
}

.content {
    background-color: rgb(107, 68, 39);
}

.viewDay {
    cursor: pointer;
    background-color: rgb(85, 44, 44);
    padding: 10px;
      -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.viewDay:hover {
    background-color: rgb(129, 69, 69);
}

.row{
    overflow: hidden; 
}

.hide {
    visibility: hidden;
}

.todos-container {
    height: 80%;
}

.content_ [class*="col-"]{
    margin-bottom: -99999px;
    padding-bottom: 99999px;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.delete-buttons {
    margin-top: 20px;
}

.delete-buttons button{
    margin-right: 10px;
}

</style>
