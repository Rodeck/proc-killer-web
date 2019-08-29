<template>
<md-card>
    <md-card-header>
        <div class="md-title">Clostest todos</div>
    </md-card-header>
    <md-card-content class="md-layout md-gutter" v-if="isDataLoaded">
        <div class="md-layout-item md-size-33">
            <todo v-bind:day="yesterday"></todo>
        </div>

        <div class="md-layout-item md-size-33">
            <todo v-bind:day="today"></todo>
        </div>

        <div class="md-layout-item md-size-33">
            <todo v-bind:day="tomorrow"></todo>
        </div>
    </md-card-content>
    <md-card-content v-show="!isDataLoaded">
        <loading-bar></loading-bar>
    </md-card-content>
</md-card>
</template>

<script>

import * as ViewDay from '../types/ViewDay'
import * as Day from '../types/Day'
import * as moment from 'moment';
import Todo from './ClostestTodo.vue'
import Loading from './LoadingBar.vue'

export default {
    components: {
        'todo': Todo,
        'loading-bar': Loading 
    },
    props: { 
    },
    data() {
        return {
        }
    },
    computed: {
        isLoadingData(){
            return this.$store.getters.isLoadingData;
        },
        isDataLoaded() {
            return this.$store.getters.isDataLoaded;
        },
        today() {
            return this.$store.getters.today;
        },
        tomorrow() {
            return this.$store.getters.tomorrow;
        },
        yesterday() {
            return this.$store.getters.yesterday;
        }
    },
    watch: { 
    },
    methods: {

    },
    mounted: function() {
    }
}
</script>

<style scoped>

</style>
