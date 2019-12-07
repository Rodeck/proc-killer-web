<template>
    <md-content class="popup-container md-secondary md-elevation-5">
        <div class="md-layout md-alignment-center"> 
            <md-toolbar>
                <h3 class="md-title">{{componentName}}</h3>
                <div class="ml-auto close-button-div">
                    <i class="material-icons" v-on:click="hideWindow">close</i>
                </div>
            </md-toolbar>
            <!-- <rewards v-if="isRewardsPicked" class="md-layout-item md-size-100"></rewards> -->
        </div>
    </md-content>
</template>

<script>

import moment from 'moment'
import Rewards from './RewardsComponent.vue'

export default {
    components: {
        'rewards': Rewards
    },
    props: { 

    },
    computed: {
        isRewardsPicked() {
            return true;
        },
        componentName() {
            if (this.isRewardsPicked)
                return "Rewards";
            else
                return "Unknown";
        }
    },
    methods: {
        hideWindow() {
            this.$store.dispatch('hidePopupWindow');
        }
    }
}
</script>
<style scoped>

.popup-container {
    width: 80%;
    height: 80%;
    position: fixed;
    z-index: 10;
    left: 10%;
    top: 10%;
}

.close-button-div {
    display: inline;
    padding: 15px 0px 15px 0px;
}

.close-button-div i {
    cursor: pointer;
      -webkit-transition: -webkit-transform .8s ease-in-out;
          transition:         transform .8s ease-in-out;
}

.close-button-div i:hover {
    cursor: pointer;
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

</style>


