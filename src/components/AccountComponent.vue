<template>
        <md-card v-if="isLoaded">
            <md-card-header>
                <div class="md-title">Account</div>
            </md-card-header>
            <md-card-content>
                <md-list class="md-dense">
                    <md-list-item>
                        <md-icon>account_circle</md-icon>
                        <span class="md-list-item-text">{{user.username}}</span>
                    </md-list-item>
                    <md-list-item>
                        <md-icon>local_parking</md-icon>
                        <span class="md-list-item-text">{{user.points}}</span>
                        <md-tooltip md-direction="top">Total points earned</md-tooltip>
                    </md-list-item>
                    <md-list-item>
                        <md-icon>face</md-icon>
                        <span class="md-list-item-text">{{user.currentLoginStreak}} ({{user.longestLoginStreak}})</span>
                        <md-tooltip md-direction="top">Current login streak (longest login streak)</md-tooltip>
                    </md-list-item>
                    <md-list-item>
                        <md-icon>check</md-icon>
                        <span class="md-list-item-text">{{user.todosCompleted}}</span>
                        <md-tooltip md-direction="top">Total todos completed</md-tooltip>
                    </md-list-item>
                </md-list>
            </md-card-content>
    </md-card>
    <div v-else>
        <loading-bar></loading-bar>
    </div>
</template>


<script>
import Loading from './LoadingBar.vue'
import Reward from './RewardItem.vue'
import * as moment from 'moment';

export default {
    components: {
        'loading-bar': Loading,
        'reward': Reward
    },
    data() {
        return {
        }
    },
    computed: {
        isLoaded() {
            return this.$store.getters.isLogged;
        },
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
    },
    mounted () {
    }
}
</script>

<style scoped>


</style>
