<template>
    <div class="todo-wrapper md-elevation-3">
        <div class="container todo-wrapper md-layout" v-if="todo != null">
            <div class="md-layout-item md-size-10">
                <md-icon v-if="todo.completed" style="color: green;">thumb_up_alt</md-icon>
                <md-icon v-else style="color: red;">thumb_down_alt</md-icon>
            </div>
            <div class="md-layout-item md-size-75 md-body-2">
                {{ todo.name }}
            </div>
            <div class="md-layout-item md-size-15" v-if="!todo.completed">
                <md-button class="md-icon-button">
                    <md-icon style="color: red;">delete</md-icon>
                </md-button>
            </div>
            <div class="md-layout-item md-size-100 md-body-1">
                {{ todo.description }}
            </div>
            <div class="md-layout-item md-size-100 md-body-1">
                <md-button class="md-raised">Complete</md-button>
            </div>
        </div>
        <div v-else>
            <md-button class="md-icon-button md-raised" v-on:click="displayAddWindow">
                <md-icon>add</md-icon>
            </md-button>
        </div>
    </div>
</template>

<script>

import * as Todo from '../types/TodoItem'

export default {
    data() {
        return {
        }
    },
    computed: {

    },
    props: ['todo'],
    methods: {
        displayAddWindow: function() {
            this.$store.dispatch('displayAddTodoWindow');
        },
        displayDeleteWindow: function() {
            this.$store.dispatch('displayDeleteTodoWindow', this.todo.id);
        }
    },
    updated() {
        console.log("Component todo updated");
    }
}
</script>

<style scoped>

.todo-wrapper {
    height: 100%;
    padding: 3px;
    margin: 3px;
}

</style>
