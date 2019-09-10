<template>
    <div class="md-layout md-alignment-center md-gutter">
        <md-card class="md-layout-item md-size-90 wrapper">
            <md-card-header>
                <div class="md-title">Your Todos</div>
            </md-card-header>
            <md-card-content>
                <md-list class="md-dense" v-if="isLoaded">
                    <md-list-item class="single-day md-layout">
                        <md-card md-with-hover class="md-layout-item md-size-100">
                            <md-card-content class="md-layout">
                                <div class="md-layout-item md-size-10 md-title">
                                </div>
                                <div class="md-layout-item md-size-90">
                                    <div class="md-dense">
                                        <div class="md-layout">
                                            <div class="md-layout-item md-size-100">
                                                <div class="md-layout">
                                                    <div class="md-layout-item md-size-10 md-headline">
                                                        Title
                                                    </div>
                                                    <div class="md-layout-item md-size-30 md-headline">
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
                    </md-list-item>
                    <md-list-item v-for="day in days" :key="day.date" class="single-day md-layout">
                        <md-card md-with-hover class="md-layout-item md-size-100" :class="{'md-elevation-20': isToday(day.date)}">
                            <md-card-content class="md-layout">
                                <div class="md-layout-item md-size-10 md-title">
                                {{formatDate(day.date)}}
                                </div>
                                <div class="md-layout-item md-size-85"> 
                                    <div v-for="todo in day.todos" :key="todo.id" class="md-layout">
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
                                                <div class="md-layout-item md-size-10 md-headline">
                                                    <span>{{todo.name}}</span>
                                                </div>
                                                <div class="md-layout-item md-size-30 md-headline">
                                                    {{todo.description}}
                                                </div>
                                                <div class="md-layout-item md-size-10 md-headline">
                                                    {{formatDate(todo.finishTime)}}
                                                </div>
                                                <div class="md-layout-item md-size-20">
                                                    <md-chips class="md-primary shake-on-error" v-model="todo.chips" md-placeholder="Add tag...">
                                                    </md-chips>
                                                </div>
                                            </div>
                                                <md-divider></md-divider>
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
                    </md-list-item>
                </md-list>
                <div v-else>
                    <loading-bar></loading-bar>
                </div>
            </md-card-content>
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
    props: {
    },
    computed: {
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
    },
    watch: { 
    },
    methods: {
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
        }
    },
    mounted: function() {
    }
}
</script>

<style scoped>

.wrapper {
    margin-top: 3%;
}

.single-day {
    margin: 5px;
}

.today {

}

</style>
