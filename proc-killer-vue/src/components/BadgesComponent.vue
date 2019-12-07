<template>
    <div class="md-layout md-alignment-top-center md-layout-item md-size-90">
        <div class="md-layout md-alignment-top-center md-layout-item md-size-100 badges-container" v-if="!isLoading">
            <div class="md-layout-item md-size-100 md-title title">
                Achivements
            </div>
            <div class="md-layout-item md-size-100">
                90/100 (90%)
            </div>
            <div class="md-layout-item md-size-100 sub-container">
                <div v-for="badge in aquiredRewards" :key="badge.id" class="badge">
                    <img :src="badge.definition.image" :id="badge.id" class="badge-img aquired" @mouseover="hoverAquired" @mouseleave="notHoverAquired()"/>
                </div>
                <div v-if="isHoveringAquired" class="info-box">
                    <div v-for="condition in badge.conditions" :key="condition.id">
                        {{getConditionName(condition.condition)}} {{condition.amount}}/{{getConditionAmount(condition.condition, badge.definition.conditions)}}
                        <p> Aquired date: {{badge.aquiredDate}} </p>
                    </div>
                </div>
            </div>
            <div class="md-layout-item md-size-100 sub-container">
                <md-divider></md-divider>
            </div>
            <div class="md-layout-item md-size-100 sub-container">
                <div v-for="badge in lockedRewards" :key="badge.id" class="badge">
                    <img :src="badge.definition.image" :id="badge.id" class="badge-img not-aquired" @mouseover="hoverLocked" @mouseleave="notHoverLocked()"/>
                </div>
                <div v-if="isHovering" class="info-box">
                    <div v-for="condition in badge.conditions" :key="condition.id">
                        {{getConditionName(condition.condition)}} {{condition.amount}}/{{getConditionAmount(condition.condition, badge.definition.conditions)}}
                    </div>
                </div>
            </div>
        </div>
        <loading-bar v-else />
    </div>
</template>

<script>

import * as moment from 'moment';
import Loading from './LoadingBar.vue'

export default {
    components: {
        'loading-bar': Loading
    },
    data() {
        return {
            conditionDefinitions: [
                { id: 1, text: "Daily login"},
                { id: 2, text: "Completed todos"},
                { id: 3, text: "Points earned"},
            ],
            isHovering: false,
            badge: null,
            isHoveringAquired: false,
        }
    },
    computed: {
        isLoading() {
            return this.$store.getters.isLoadingRewards;
        },
        aquiredRewards() {
            return this.$store.getters.aquiredRewards;
        },
        lockedRewards() {
            return this.$store.getters.lockedRewards;
        },
    },
    methods: {
        getConditionName: function (condition) {
            return this.conditionDefinitions.find(x => x.id == condition).text;
        },
        getConditionAmount: function (conditionId, definitions) {
            return definitions.find(x => x.id == conditionId).amount;
        },
        hoverLocked(event) {
            this.badge = this.lockedRewards.find(x => x.id == event.target.id);
            this.isHovering = true;
        },
        notHoverLocked() {
            this.isHovering = false;
            this.badge = null;
        },
        hoverAquired(event) {
            this.badge = this.aquiredRewards.find(x => x.id == event.target.id);
            this.isHoveringAquired = true;
        },
        notHoverAquired() {
            this.isHoveringAquired = false;
            this.badge = null;
        }
    }
}
</script>

<style scoped>

.sub-container {
    margin-top: 1%;
}

.wrapper {
    margin-top: 3%;
}

.badge {
    display: inline;
}

.badge-img {
    width: 50px;
    height: 50px;
} 

.not-aquired {
    filter: grayscale(100%);
}

.info-box {
    background-color: #1976D2;
    position: absolute;
    padding: 5px;
    border:2px solid #1d2222;
    z-index: 10;
}

.badges-container {
    background-color: #1976D2;
    padding: 10px;
}

.title {
    text-align: center;
}
</style>
