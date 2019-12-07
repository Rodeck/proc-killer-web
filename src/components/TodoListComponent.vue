<template>
    <div class="md-layout md-alignment-center md-gutter clear-margin">
        <md-card class="md-layout-item md-size-90 wrapper md-primary">
            <md-card-content class="md-layout md-gutter md-alignment-center-space-around">
                <action v-for="action in avaliableActions" 
                    :key="action.actionType" 
                    :actionDescription="action.actionDescription"
                    :actionType="action.actionType"
                    :link="action.link">
                </action>
            </md-card-content>
        </md-card>
        <md-card class="md-layout-item md-size-90 wrapper md-primary">
            <div>
                <md-list class="md-dense clear-bg" v-if="isLoaded">
                    <div class="single-day md-layout">
                        <md-card md-with-hover class="md-layout-item md-size-100 md-primary">
                            <md-card-content class="md-layout">
                                <div class="md-layout-item md-size-100 md-layout md-alignment-center-right">
                                    <md-button class="md-layout-item md-size-5 md-raised" v-on:click="switchToCurrentPage()">Today</md-button>
                                </div>
                                <div class="md-layout-item md-size-10 md-title">
                                </div>
                                <div class="md-layout-item md-size-85">
                                    <div class="md-dense">
                                        <div class="md-layout">
                                            <div class="md-layout-item md-size-100">
                                                <div class="md-layout">
                                                    <div class="md-layout-item md-size-20 md-headline">
                                                        Title
                                                    </div>
                                                    <div class="md-layout-item md-size-40 md-headline">
                                                        Description
                                                    </div>
                                                    <div class="md-layout-item md-size-10 md-headline">
                                                        Finish date
                                                    </div>
                                                    <div class="md-layout-item md-size-20 md-headline">
                                                        Tags
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>
                    <transition-group name="list">
                    <div v-for="day in getDays" :key="day.date" class="single-day md-layout">
                        <md-card md-with-hover class="md-layout-item md-size-100 md-primary" :class="{'md-elevation-20': isToday(day.date)}">
                            <md-card-content class="md-layout">
                                <div class="md-layout-item md-size-10" :class="{'md-title': day.todos && day.todos.length > 0}">
                                {{formatDate(day.date)}}
                                </div>
                                <div class="md-layout-item md-size-85"> 
                                    <div v-for="todo in day.todos" :key="todo.id" class="md-layout md-elevation-3 single-todo">
                                        <div class="md-layout-item md-size-100">
                                            <div class="md-layout-item md-size-100 md-layout">
                                                <div class="md-layout-item md-size-5"></div>
                                                <div class="md-layout-item md-size-95">
                                                    <md-button v-if="cannAddForDate(day.date)" class="md-icon-button" v-on:click="deleteTodo(todo.id)">
                                                        <md-icon>delete</md-icon>
                                                    </md-button>
                                                    <md-button v-if="cannAddForDate(day.date)" class="md-icon-button">
                                                        <md-icon>edit</md-icon>
                                                    </md-button>
                                                </div>
                                            </div>
                                            <div class="md-layout md-layout-item md-size-100">
                                                <div class="md-layout-item md-size-5 md-headline checkbox-wrapper">
                                                    <custom-checkbox class="checkbox-centered" :todo="todo"></custom-checkbox>
                                                </div>
                                                <div class="md-layout-item md-size-20 md-headline">
                                                    <span>{{todo.name}}</span>
                                                </div>
                                                <div class="md-layout-item md-size-35 md-headline">
                                                    {{todo.description}}
                                                </div>
                                                <div class="md-layout-item md-size-10 md-headline">
                                                    {{formatDate(todo.finishTime)}}
                                                </div>
                                                <div class="md-layout-item md-size-20">
                                                    <md-chips class="md-primary shake-on-error" v-model="todo.tags" md-placeholder="Add tag..." 
                                                       @md-insert="chipInserted">
                                                    </md-chips>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="md-size-5 md-layout-item">
                                    <md-button v-if="cannAddForDate(day.date)" class="md-icon-button" v-on:click="addTodo(day.date)">
                                        <md-icon>add</md-icon>
                                    </md-button>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>
                    </transition-group>
                     <div class="single-day md-layout">
                        <md-card md-with-hover class="md-layout-item md-size-100 md-primary">
                            <md-card-content class="md-layout">
                                <div class="md-layout-item md-size-100" style="text-align: center">
                                    <md-button v-for="(page, idx) in pagesCount" :key="idx" :class="{'current-page': isCurrentPage(idx)}"  class="md-icon-button" v-on:click="switchPage(idx)">
                                        {{idx+1}}
                                    </md-button>
                                </div>
                            </md-card-content>
                        </md-card>
                    </div>
                </md-list>
                <div v-else>
                    <loading-bar></loading-bar>
                </div>
            </div>
    </md-card>   
    <transition name="fade">
        <add-todo v-if="showAddTodoWindow"></add-todo>
    </transition>
    </div>
</template>

<script>

import * as ViewDay from '../types/ViewDay'
import * as Day from '../types/Day'
import * as moment from 'moment';
import Loading from './LoadingBar.vue'
import AddTodo from './AddTodo.vue'
import CustomChackbox from './CustomCheckbox.vue';
import Action from './ActionComponent.vue'

export default {
    components: {
        'loading-bar': Loading,
        'add-todo': AddTodo,
        'custom-checkbox': CustomChackbox,
        'action': Action
    },
    data() {
        return {
            pageModel: 0,
            daysPerPage: 5,
            avaliableActions: [
            {
                actionDescription: "Add todos for today",
                actionType: "addTodo",
                link: "main"
            },
            {
                actionDescription: "See recent rewards",
                actionType: "seeRewards",
                link: "dashboard"
            },
            {
                actionDescription: "Complete todos for today",
                actionType: "completeTodo",
                link: "simpleView"
            }
            ]
        }
    },
    props: {
    },
    computed: {
        pagesCount() 
        {
            return this.days.slice(0, this.days.length / this.daysPerPage).length;
        },
        page() {
            return parseInt(this.pageModel);
        },
        date() {
            return moment(this.day.date).format("YYYY-MM-DD");
        },
        canAdd() {
            return moment(this.day.date).isSame(moment(), 'day') || moment(this.day.date).isSame(moment().add(1, 'days'), 'day'); 
        },
        days() {
            return this.$store.getters.getCallendar;
        },
        isLoaded() {
            return this.$store.getters.isDataLoaded;
        },
        showAddTodoWindow(){
            return this.$store.getters.showAddTodoWindow;
        },
        getDays() {
            return this.days.slice(this.page * this.daysPerPage, this.page * this.daysPerPage +  this.daysPerPage);
        }
    },
    watch: { 
    },
    methods: {
        isCompleted(todo) {
            console.log(todo);
            return todo.completed;
        },
        deleteTodo(id) {
            console.log(id);
            this.$store.dispatch('deleteTodoById', id);
        },
        isCurrentPage(idx) {
            return idx == this.page;
        },
        switchPage(page) {
            this.pageModel = page;
        },
        switchToCurrentPage() {
            this.pageModel = parseInt(moment().date() / this.daysPerPage);
        },
        changeTodaysTodo() {
            this.$store.dispatch('changePickedTodo', this.day.date);
        },
        markAsCompleted() {
            this.$store.dispatch('markCompleted', this.day.pickedTodo.id);
        },
        restore() {
            this.$store.dispatch('restore', this.day.pickedTodo.id);
        },
        addTodo(date) {
            console.log("Pick day: ", date);
            this.$store.dispatch('pickDay', date);
            this.$store.dispatch('displayAddTodoWindow');
        },
        formatDate(date) {
            if (date)
                return moment(date).format("DD-MM-YYYY");
            else
             return '';
        },
        cannAddForDate(date) {
            return moment(date).startOf('day').isSameOrAfter(moment().startOf('day'));
        },
        isToday(date) {
            return moment(date).startOf('day').isSame(moment().startOf('day'));
        },
        chipInserted(payload) {
            console.log(payload);
        }
    },
    mounted: function() {
        this.switchToCurrentPage();
    },
    events: {

    }
}
</script>

<style scoped>

.clear-margin {
    margin-right: 0px;
}

.checkbox-wrapper {
    display: -webkit-flexbox;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    justify-content: center;
}

.clear-bg {
    background-color: inherit !important;
}

.single-day {
    margin: 5px;
}

.single-todo {
    margin: 5px;
    padding: 5px;
}

.list {
  transition: all 0.5s;

}
.list-enter, .list-leave-to
/* .card-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: scale(0);
}
.list-enter-to {
  opacity: 1;
  transform: scale(1);
}

.list-move {
  opacity: 1;
  transition: all 0.5s;
}

.wrapper {
    margin-top: 3%;
}

.current-page {
    border-bottom: 2px;
    border-style: solid;
}

</style>
