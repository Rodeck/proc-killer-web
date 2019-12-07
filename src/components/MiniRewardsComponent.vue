<template>
    <md-card class="md-primary" v-on:click.native="showPopup">
        <md-card-content>
            <!-- <md-list class="md-dense" v-if="isLoaded">
                <reward v-for="event in events" v-bind:key="event.id" 
                    v-bind:icon="getIcon(event.eventType)" 
                    v-bind:text="event.eventType" 
                    v-bind:points="event.points"
                    v-bind:date="event.eventDate"> 
                </reward>
            </md-list> -->
            <md-table v-model="events" v-if="isLoaded" md-fixed-header class="md-primary">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="" md-sort-by="eventType" md-numeric><md-icon class="md-primary no-margin">{{getIcon(item.eventType)}}</md-icon></md-table-cell>
                    <md-table-cell md-label="Aquired date" md-sort-by="eventDate">{{ item.eventDate }}</md-table-cell>
                    <md-table-cell md-label="Type" md-sort-by="eventType">{{ item.eventType }}</md-table-cell>
                    <md-table-cell md-label="Points" md-sort-by="points">{{ item.points }}</md-table-cell>
                </md-table-row>
            </md-table>
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
            return this.$store.getters.isEventsLoaded;
        },
        events() {
            return this.$store.getters.getEvents.slice().sort((x, y) => {
                return moment(x.eventDate).isAfter(moment(y.eventDate)) ? -1 : 1
            }).map(event => {
                console.log(event.eventDate);
                event.eventDate = this.getDate(event.eventDate);
                return event;
            });
        },
        allEents() {
            return this.$store.getters.getEvents.slice().sort((x, y) => moment(x.eventDate).diff(moment(y.eventDate), 'seconds') < 0);
        }
    },
    methods: {
        getIcon(eventType) {
            if (eventType == "Daily login")
                return 'account_circle';
            else if (eventType == "Todo completed")
                return 'check'
        },
        showPopup() {
            this.$store.dispatch('showPopup');
        },
        getDate(date) {
            return moment(date).format("DD-MM-YYYY hh:mm:ss");
        }
    },
    mounted () {
        this.$store.dispatch('markAction', { 
            type: 'seeRewards',
            completed: true
        });
    }
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


</style>
