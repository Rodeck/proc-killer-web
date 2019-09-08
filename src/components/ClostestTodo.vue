<template>
    <md-card md-with-hover class="md-primary md-raised" md-theme="danger" :key="clostestTodosKey">
        <div v-if="day.todos.length > 0">
            <div v-if="day.pickedTodo != false">
                <div class="completed-mark" v-if="day.pickedTodo.completed">
                    Completed!
                </div>
                <md-card-header>
                    <md-ripple>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <md-button class="arrow-button md-icon-button" v-on:click="changeTodaysTodo">
                                    <md-icon>arrow_left</md-icon>
                                </md-button>
                                <div class="big-todo-title md-body-2">
                                    {{day.pickedTodo.name}}
                                </div>
                                <md-button class="arrow-button md-icon-button" v-on:click="changeTodaysTodo">
                                    <md-icon>arrow_right</md-icon>
                                </md-button>
                            </div>
                            <div class="md-subhead md-layout-item md-size-100">{{date}}</div>
                        </div>
                    </md-ripple>
                </md-card-header>
                <md-card-content>
                    {{day.pickedTodo.description}}
                </md-card-content>

                <md-card-actions>
                    <md-button v-on:click="markAsCompleted" v-if="!day.pickedTodo.completed">Complete</md-button>
                    <md-button v-on:click="restore" v-if="day.pickedTodo.completed">Restore</md-button>
                    <md-button>Delete</md-button>
                </md-card-actions>
            </div>
            <div v-else>
                <md-card-header>
                    <md-ripple>
                        <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <md-button class="arrow-button md-icon-button" v-on:click="changeTodaysTodo">
                                    <md-icon>arrow_left</md-icon>
                                </md-button>
                                <div class="big-todo-title md-title">
                                    {{date}}
                                </div>
                                <md-button class="arrow-button md-icon-button" v-on:click="changeTodaysTodo">
                                    <md-icon>arrow_right</md-icon>
                                </md-button>
                            </div>
                        </div>
                    </md-ripple>
                </md-card-header>
                <md-card-content>
                    <md-button class="md-icon-button md-raised center-button" disabled v-if="!canAdd">
                        <md-icon>add</md-icon>
                    </md-button>
                    <md-button class="md-icon-button md-raised center-button" v-if="canAdd" v-on:click="addTodo">
                        <md-icon>add</md-icon>
                    </md-button>
                </md-card-content>
            </div>
        </div>
        <div v-else>
            <md-card-header>
                <div class="md-title big-todo-title-empty">
                    Empty :(
                </div>
                <div class="md-subhead">{{date}}</div>
            </md-card-header>
            <md-card-content>
                <md-button class="md-icon-button md-raised center-button" disabled v-if="!canAdd">
                    <md-icon>add</md-icon>
                </md-button>
                <md-button class="md-icon-button md-raised center-button" v-if="canAdd" v-on:click="addTodo">
                    <md-icon>add</md-icon>
                </md-button>
            </md-card-content>
        </div>
    </md-card>
</template>

<script>

import * as ViewDay from '../types/ViewDay'
import * as Day from '../types/Day'
import * as moment from 'moment';

export default {
    components: {
    },
    props: { 
        day: Object
    },
    computed: {
        date() {
            return moment(this.day.date).format("YYYY-MM-DD");
        },
        canAdd() {
            return moment(this.day.date).isSame(moment(), 'day') || moment(this.day.date).isSame(moment().add(1, 'days'), 'day'); 
        },
        clostestTodosKey() {
            return this.$store.getters.clostestTodosKey;
        }
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
        addTodo() {
            console.log("Pick day: " + this.date);
            this.$store.dispatch('pickDay', this.date);
            this.$store.dispatch('displayAddTodoWindow');
        }
    },
    mounted: function() {
    }
}
</script>

<style scoped>

.completed-mark {
    position: absolute;
    left: -30px;
    transform: rotate(-20deg);
    display: inline-block;
    color: green;
    font-size: 2em;
    text-shadow: 2px 2px #2f6351;
}

.card-header {
    margin-top: 10px;
}

.arrow-button {
    display: inline-block;
    width: 12%;
}

.big-todo-title {
    display: inline-block;
    width: 66%;
    text-align: center;
}

.big-todo-title-empty {
    display: inline-block;
    width: 100%;
    text-align: center;
}

.center-button {
    margin: 0 auto;
    display: block;
}

</style>
