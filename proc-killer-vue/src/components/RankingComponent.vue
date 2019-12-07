<template>
    <div class="md-layout wrapper md-alignment-top-center">
        <badges/>
        <div class="md-layout-item md-size-90 md-display-3 title margin wrapper">
             <md-table v-if="rankingLoaded">
                <md-table-row>
                    <md-table-head md-numeric>Place</md-table-head>
                    <md-table-head md-numeric>Name</md-table-head>
                    <md-table-head>Points</md-table-head>
                </md-table-row>
                <md-table-row v-for="user in ranking" v-bind:key="user.name">
                    <md-table-cell md-numeric>{{user.place}}</md-table-cell>
                    <md-table-cell>{{user.name}}</md-table-cell>
                    <md-table-cell>{{user.points}}</md-table-cell>
                </md-table-row>
             </md-table>
        </div>
    </div>
</template>

<script>
import Loading from './LoadingBar.vue'
import Badges from './BadgesComponent.vue'

export default {
        components: {
        'loading-bar': Loading,
        'badges': Badges,
    },
    data() {
        return {
        }
    },
    computed: {
        ranking() 
        {
            return this.$store.getters.ranking;
        },
        rankingLoaded() {
            return this.$store.getters.rankingLoaded;
        }
    },
    methods: {
        
    },
    mounted: function() {
        this.$store.dispatch('loadRanking');
    },
}
</script>

<style scoped>

.wrapper {
    margin-top: 3%;
}

</style>
