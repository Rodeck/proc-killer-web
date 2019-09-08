<template>
    <div v-if="isLoaded">
        <md-card class="" v-on:click.native="showPopup">
                <md-card-header>
                    <div class="md-title">Recent rewards</div>
                </md-card-header>
                <md-card-content>
                    <md-list class="md-dense">
                        <reward v-for="event in events" v-bind:key="event.id" 
                            v-bind:icon="getIcon(event.eventType)" 
                            v-bind:text="event.eventType" 
                            v-bind:points="event.points"
                            v-bind:date="event.eventDate"> 
                        </reward>
                    </md-list>
            </md-card-content>
        </md-card>
        <transition name="fade">
            <popup-window v-if="showPopupWindow"></popup-window>
        </transition>
    </div>
    <div v-else>
        <loading-bar></loading-bar>
    </div>
</template>


<script>
import Loading from './LoadingBar.vue'
import Reward from './RewardItem.vue'
import * as moment from 'moment';
import PopupWindow from './PopupWindow.vue'


export default {
    components: {
        'loading-bar': Loading,
        'reward': Reward,
        'popup-window': PopupWindow
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
        },
        showPopupWindow() {
            return this.$store.getters.showPopup;
        }
    },
    methods: {
        getIcon(eventType) {
            if (eventType == "Daily login")
                return 'account_circle';
            else if (eventType == "Todo completed")
                return 'check'
        },
        showPopup(content) {
            this.$store.dispatch('showPopup', content);
        },
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
