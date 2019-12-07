<template>
    <div class="md-layout md-alignment-center">
        <loading-bar v-if="!isLoaded"></loading-bar>
        <div v-else class="md-layout-item md-layout md-gutter md-alignment-center-left md-size-100">
            <md-toolbar class="md-primary md-layout-item md-size-100 md-layout">
                <md-menu md-direction="bottom-end" :mdCloseOnClick="true" :mdCloseOnSelect="true">
                    <md-button md-menu-trigger>Filter</md-button>

                    <md-menu-content>
                        <md-menu-item v-for="type in eventTypes" v-bind:key="type" @click="filterType(type)">{{type}}</md-menu-item>
                    </md-menu-content>
                </md-menu>
                <md-datepicker class="md-layout-item md-size-15" v-model="selectedDate" />
            </md-toolbar>
            <md-card v-for="item in filteredEvents" v-bind:key="item.id" class="md-layout-item md-size-15 reward">
                <md-card-header-text>
                    <md-badge class="md-square badge" v-bind:mdContent="item.points" />
                    <div class="md-title">{{item.eventType}} </div>
                    <div class="md-subhead">{{formatDate(item.eventDate)}}</div>
                    
                </md-card-header-text>
            
            </md-card>
        </div>
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
    data: function() {
        return {
            typeFilter: "",
            selectedDate: ""
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
        filteredEvents() {
            if (this.typeFilter != "" || this.selectedDate != '')
            {
                console.log("Filter by date: ", this.selectedDate != '');
                var formatedDate = moment(this.selectedDate).format('DD-MM-YYYY');
                return this.$store.getters.getEvents
                    .filter(t => (this.typeFilter === '' || t.eventType == this.typeFilter) && 
                    (this.selectedDate === '' || moment(this.eventDate).format("DD-MM-YYYY") === formatedDate))
                    .sort((x, y) => moment(x.eventDate)
                                    .diff(moment(y.eventDate), 'seconds') < 0
                        );
            }
            return this.allEvents;
        },
        allEvents() {
            return this.$store.getters.getEvents.sort((x, y) => moment(x.eventDate).diff(moment(y.eventDate), 'seconds') < 0);
        },
        eventTypes() {
            var types = this.allEvents.map(x => x.eventType).filter((v, i, a) => {
                return a.indexOf(v) === i});
            types.push("Clear");
            return types;
        }
    },
    methods: {
        getIcon(eventType) {
            if (eventType == "Daily login")
                return 'account_circle';
            else if (eventType == "Todo completed")
                return 'check'
        },
        formatDate(date) 
        {
            return moment(date).format("DD-MM-YYYY");
        },
        getPointsToBadge(points) {
            return "+" + points;
        },
        filterType(type) {
            if (type == "Clear")
                this.typeFilter = "";
            else {
                this.typeFilter = type;
            }
        },
        clearDateFilter() {
            this.selectedDate = '';
            
        }
    },
    watch: {
        selectedDate: function (value) {
            var clear = document.getElementsByClassName("md-button md-icon-button md-dense md-input-action md-clear md-theme-default")[0];
            if (clear != undefined)
                clear.addEventListener("click", this.clearDateFilter);
        }
    },
    mounted () {
    }
}
</script>

<style scoped>

.reward {
    margin-top: 1%;
    margin-left: 10px;
    background-color: rgb(43, 42, 42);
}

.badge {
    padding: 5px;
}

.md-menu-content-bottom-end {
    z-index: 11;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
