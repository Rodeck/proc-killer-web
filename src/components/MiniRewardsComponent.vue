<template>
    <div v-if="isLoaded">
        <md-list class="md-dense">
            <reward v-for="event in events" v-bind:key="event.id" 
                v-bind:icon="getIcon(event.eventType)" 
                v-bind:text="event.eventType" 
                v-bind:points="event.points"
                v-bind:date="event.eventDate"> 
            </reward>
        </md-list>
    </div>
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
            return this.$store.getters.isEventsLoaded;
        },
        events() {
            return this.$store.getters.getEvents.sort((x, y) => {
                return moment(x.eventDate).isAfter(moment(y.eventDate)) ? -1 : 1
            }).slice(0, 4);
        },
        allEents() {
            return this.$store.getters.getEvents.sort((x, y) => moment(x.eventDate).diff(moment(y.eventDate), 'seconds') < 0);
        }
    },
    methods: {
        getIcon(eventType) {
            if (eventType == "Daily login")
                return 'account_circle';
            else if (eventType == "Todo completed")
                return 'check'
        }
    },
    mounted () {
    }
}
</script>

<style scoped>


</style>
