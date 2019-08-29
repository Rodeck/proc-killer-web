<template>
    <div class="chart">
        <md-card>
            <md-card-header>
                <div class="md-title">Statistics</div>
            </md-card-header>
            <md-card-content class="md-layout md-gutter">
                <loading-bar v-if="!isCurrentChartLoaded"></loading-bar>
                <points-per-day v-if="isPointsPerDayLoaded" :width="size" :height="size"  v-bind:data="getPointsPerDayData()" ></points-per-day>
            </md-card-content>
        </md-card>
    </div>
</template>


<script>

import PointsPerDay from './charts/PointsPerDay.vue'
import Loading from "./LoadingBar.vue"

export default {
    props: ['size'],
    components: {
        'points-per-day': PointsPerDay,
        'loading-bar': Loading
    },
    data() {
        return {
            pickedChart: "pointsPerDay"
        }
    },
    computed: {
        isPointsPerDayLoaded() {
            return this.isChartLoaded("pointsPerDay");
        },
        isCurrentChartLoaded() {
            return this.isChartLoaded(this.pickedChart);
        }
    },
    methods: {
        getPointsPerDayData() {
            return this.$store.getters.chartData("pointsPerDay");
        },
        isChartLoaded(chartName) {
            return this.$store.getters.isChartLoaded(chartName);
        }
    },
    mounted () {
        this.$store.dispatch("loadChartData", "pointsPerDay");
    }
}
</script>

<style scoped>

.chart {
    margin: auto;
    display: inline;
}


</style>
