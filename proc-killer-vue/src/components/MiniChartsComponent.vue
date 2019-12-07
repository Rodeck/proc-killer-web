<template>
    <div class="md-layout md-conent">
        <md-card class="md-layout-item md-size-90 md-gutter main-card">
            <md-card-header>
                <div class="md-title">Statistics</div>
            </md-card-header>
            <md-card-content class="md-layout md-gutter md-alignment-center-space-around">
                <md-card id="chart" class="md-layout-item md-size-25">
                    <md-card-content>
                        <loading-bar v-if="!isCurrentChartLoaded"></loading-bar>
                        <points-per-day v-if="isPointsPerDayLoaded" v-bind:data="getPointsPerDayData()" class="chart" :height="height" ></points-per-day>
                    </md-card-content>
                </md-card>

                <md-card id="chart" class="md-layout-item md-size-25">
                    <md-card-content>
                        <loading-bar v-if="!isCurrentChartLoaded"></loading-bar>
                        <points-per-day v-if="isActivityHoursLoaded" v-bind:data="getPointsPerDayData()" class="chart" :height="height" ></points-per-day>
                        <h3 v-else>Not enough data, please visit <router-link to="/home">this link</router-link> to see how can You earn points </h3>
                    </md-card-content>
                </md-card>

                <md-card id="chart" class="md-layout-item md-size-25">
                    <md-card-content>
                        <loading-bar v-if="!isCurrentChartLoaded"></loading-bar>
                        <cumulative v-if="isCumulativeCompletedTasksChartLoaded" v-bind:data="getCumulativeData()" class="chart" :height="height" ></cumulative>
                        <h3 v-else>Not enough data, please visit <router-link to="/home">this link</router-link> to see how can You earn points </h3>
                    </md-card-content>
                </md-card>
            </md-card-content>
        </md-card>
    </div>
</template>


<script>

import PointsPerDay from './charts/PointsPerDay.vue'
import Loading from "./LoadingBar.vue"
import Cumulative from "./charts/Cumulative.vue"

export default {
    components: {
        'points-per-day': PointsPerDay,
        'loading-bar': Loading,
        'cumulative': Cumulative 
    },
    data() {
        return {
            pickedChart: "pointsPerDay",
            height: 400
        }
    },
    computed: {
        isPointsPerDayLoaded() {
            return this.isChartLoaded("pointsPerDay");
        },
        isCurrentChartLoaded() {
            return this.isChartLoaded(this.pickedChart);
        },
        isActivityHoursLoaded() {
            return false;
        },
        isCumulativeCompletedTasksChartLoaded() {
            return this.isChartLoaded("cumulative");
        }
    },
    methods: {
        getPointsPerDayData() {
            return this.$store.getters.chartData("pointsPerDay");
        },
        getCumulativeData() {
            return this.$store.getters.chartData("cumulative");
        },
        isChartLoaded(chartName) {
            return this.$store.getters.isChartLoaded(chartName);
        }
    },
    mounted () {
        console.log("ChartsLoaded");
        this.$store.dispatch("loadChartData", "pointsPerDay");
        this.$store.dispatch("loadChartData", "cumulative");
        this.$store.commit('markAction', { 
            type: 'rewievChart',
            completed: true
        });
        this.height = document.getElementById('chart').clientWidth;
    }
}
</script>

<style scoped>

.chart {
    margin: auto;
}

.main-card {
    height: 100%;
    margin: auto;
    margin-top: 10%;
}

</style>
