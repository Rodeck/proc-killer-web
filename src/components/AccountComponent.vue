<template>
        <md-card>
            <md-card-header>
                <div class="md-title">Account</div>
            </md-card-header>
            <md-card-content>
                <div v-if="isLoaded" class="md-layout">
                <md-list class="md-dense md-layout-item md-size-30">
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
                <div class="md-layout-item md-size-70 md-layout level-wrapper">
                    <div class="md-layout-item md-size-100 md-layout">
                        <div class="md-layout-item md-size-100 md-display-1 league-info">
                            {{levelInfo.league}}
                        </div>
                    </div>
                    <div class="progress-bar-container md-layout-item md-size-80">
                        <p class="currentExp" :style="{left: levelInfo.expPercent + '%'}"> {{levelInfo.currentExp}}</p>
                        <p class="currentExp" :style="{left: 100 + '%'}"> {{levelInfo.requiredExp}}</p>
                        <md-progress-bar md-mode="determinate" :md-value="levelInfo.expPercent"></md-progress-bar>
                    </div>
                </div>
                </div>
                <div v-else>
                    <loading-bar></loading-bar>
                </div>
            </md-card-content>
    </md-card>

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
        },
        levelInfo() {
            return this.$store.getters.getLevel;
        }
    },
    methods: {
    },
    mounted () {
    }
}
</script>

<style scoped>

.currentExp {
    margin: 0px;
    display: inline;
    position: relative;
}

.level-number {
    background-color: red;
}

.league-info {
    text-align: center;
}

.level-wrapper {
    border: 5px solid #000000;
}

</style>
