<template>
    <div class="todo-wrapper">
        <div class="container todo-wrapper" v-if="todo != null">
            <div class="row row-name">
                <h1> {{ todo.name }} </h1>
            </div>
            <div class="row row-description">
                <h3> {{ todo.description }} </h3>
            </div>
            <div class="row row-controls">
                <i class="material-icons add-btn todo-controll">check_circle</i>
                <i class="material-icons add-btn todo-controll" v-on:click="displayDeleteWindow">delete_forever</i>
            </div>
        </div>
        <div class="container add-wrapper" v-if="todo == null">
            <i class="material-icons add-btn" v-on:click="displayAddWindow">add</i>
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
}

.add-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.row-name{
    height: 15%;
}

.row-description {
    height: 70%;
}

.row-controls {
    height: 10%;
}

.todo-controll {
    margin-right: 10px;
}

.add-btn {
    margin-top: auto;
    margin-bottom: auto;
    background-color: rgb(122, 97, 65);
    border-radius: 50%;
    border-width: 3px;
    border: 1px solid bisque;
    width: 50px;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    padding: 12px;
    -webkit-transition: background-color 1s; /* Safari */
    transition: background-color 1s;
          -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.add-btn:hover {
    background-color: rgb(170, 135, 90);
}
</style>
