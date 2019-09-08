<template>
    <div class="text-center border border-dark p-5 add-form md-layout">
        <div class="md-layout-item md-size-100 close-button-div">
            <div class="ml-auto" style="display: flex; justify-content: flex-end">
                <i class="material-icons" v-on:click="hideWindow">close</i>
            </div>
        </div>
        <div class="md-layout-item md-size-100 md-display-2" style="margin-bottom: 20px;">
            {{formatDate(day.date)}}
        </div>
        <div class="md-layout-item md-size-100 md-layout">
            <div class="md-layout-item md-size-100 md-layout">
                <div v-for="todo in day.todos" :key="todo.id" class="md-layout-item md-size-25">
                    <todo :todo="todo" />
                </div>
                <div class="md-layout-item md-size-25">
                    <todo/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import * as ViewDay from '../types/ViewDay'
import * as Day from '../types/Day'
import * as moment from 'moment';
import Todo from './TodoView.vue'
import Loading from './LoadingBar.vue'

export default {
    components: {
        todo: Todo 
    },
    props: ['day'],
    data() {
        return {
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
        hideWindow() {
            this.$store.dispatch('clearPickedDay');
        },
        formatDate(date) {
            return moment(date).format('DD-MM-YYYY');
        }
    },
    mounted: function() {
    }
}
</script>

<style scoped>

    .add-form {
        background-color: gray;
        position: absolute;
        width: 70%;
        z-index: 10;
        -webkit-box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
        box-shadow:  0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
        margin-top: 10px;
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

    .header {
        padding-top: 14px;
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

    .hide {
        visibility: hidden;
    }
</style>
