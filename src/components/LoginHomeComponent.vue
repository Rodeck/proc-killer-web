<template>
    <div class="md-layout md-alignment-center-left wrapper md-gutter home-container">
        <div class="md-layout-item md-size-45 actions-card">
            <md-card>
                <md-card-header>
                    <div class="md-title">Please, review those actions:</div>
                </md-card-header>
                <md-card-content class="md-layout md-gutter md-alignment-center-space-around">
                    <action v-for="action in avaliableActions" 
                        :key="action.actionType" 
                        :actionDescription="action.actionDescription"
                        :actionType="action.actionType"
                        :link="action.link">
                    </action>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>

import * as ViewDay from '../types/ViewDay'
import * as Day from '../types/Day'
import * as moment from 'moment';
import Action from './ActionComponent.vue'

import Loading from './LoadingBar.vue'

export default {
    components: {
        'action': Action
    },
    data() {
        return {
            avaliableActions: [
            {
                actionDescription: "Add todos for today",
                actionType: "addTodo",
                link: "main"
            },
            {
                actionDescription: "See recent rewards",
                actionType: "seeRewards",
                link: "simpleView"
            },
            {
                actionDescription: "Complete todos for today",
                actionType: "completeTodo",
                link: "simpleView"
            },
            {
                actionDescription: "Rewiew your activity charts",
                actionType: "rewievChart",
                link: "main"
            },
            ]
        }
    },
    computed: {
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

.home-container {
    margin-left: 5%;
}

.actions-card {
    margin-top: 10%;
}

</style>
