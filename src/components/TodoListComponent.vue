<template>
    <div class="md-layout md-alignment-center md-gutter">
        <md-card class="md-layout-item md-size-90 wrapper">
            <md-card-header>
                <div class="md-title">Your Todos</div>
            </md-card-header>
            <div>
                <md-list class="md-dense" v-if="isLoaded">
                    <div class="single-day md-layout">
                        <md-card md-with-hover class="md-layout-item md-size-100">
                            <md-card-content class="md-layout">
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
                        <md-card md-with-hover class="md-layout-item md-size-100" :class="{'md-elevation-20': isToday(day.date)}">
                            <md-card-content class="md-layout">
                                <div class="md-layout-item md-size-10" :class="{'md-title': day.todos && day.todos.length > 0}">
                                {{formatDate(day.date)}}
                                </div>
                                <div class="md-layout-item md-size-85"> 
                                    <div v-for="todo in day.todos" :key="todo.id" class="md-layout md-elevation-3 single-todo">
                                        <div class="md-layout-item md-size-100">
                                            <div>
                                                <md-button v-if="todo.completed" class="md-icon-button">
                                                    <md-icon  style="color: green;">thumb_up_alt</md-icon>
                                                </md-button>
                                                <md-button v-else class="md-icon-button">
                                                    <md-icon style="color: red;">thumb_down_alt</md-icon>
                                                </md-button>
                                                <md-button v-if="cannAddForDate(day.date)" class="md-icon-button" v-on:click="addTodo(day.date)">
                                                    <md-icon>delete</md-icon>
                                                </md-button>
                                                <md-button v-if="cannAddForDate(day.date) && !todo.completed" class="md-icon-button">
                                                    <md-icon>check_circle_outline</md-icon>
                                                </md-button>
                                                <md-button v-if="cannAddForDate(day.date) && todo.completed" class="md-icon-button">
                                                    <md-icon>replay</md-icon>
                                                </md-button>
                                                <md-button v-if="cannAddForDate(day.date)" class="md-icon-button">
                                                    <md-icon>edit</md-icon>
                                                </md-button>
                                            </div>
                                            <div class="md-layout">
                                                <div class="md-layout-item md-size-20 md-headline">
                                                    <span>{{todo.name}}</span>
                                                </div>
                                                <div class="md-layout-item md-size-40 md-headline">
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
                        <md-card md-with-hover class="md-layout-item md-size-100">
                            <md-card-content class="md-layout">
                                <div class="md-layout-item md-size-100" style="text-align: center">
                                    <md-button v-for="(page, idx) in pagesCount" :key="idx" :class="{'current-page': isCurrentPage(idx)}"  class="md-icon-button md-primary" v-on:click="switchPage(idx)">
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

export default {
    components: {
        'loading-bar': Loading,
        'add-todo': AddTodo,
    },
    data() {
        return {
            pageModel: 0,
            daysPerPage: 5
        }
    },
    props: {
    },
    computed: {
        pagesCount() 
        {
            return  this.days.slice(0, this.days.length / this.daysPerPage);
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
        isCurrentPage(idx) {
            return idx == this.page;
        },
        switchPage(page) {
            this.pageModel = page;
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
    },
    events: {

    }
}
</script>

<style scoped>

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
