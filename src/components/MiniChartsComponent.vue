<template>
    <points-per-day v-bind:data="getPointsPerDayData()" ></points-per-day>
</template>


<script>

import PointsPerDay from './charts/PointsPerDay.vue'

export default {
    components: {
        'points-per-day': PointsPerDay
    },
    data() {
        return {
            
        }
    },
    computed: {

    },
    methods: {
        getPointsPerDayData() {
            return this.$store.getters.pointsPerDay;
        }
    },
    mounted () {
        console.log("duddpa");
        console.log(this.getPointsPerDayData());
    }
}
</script>

<style scoped>


</style>
