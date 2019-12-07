<template>
    <div class="md-content view-content md-layout md-alignment-center md-gutter">
        <md-card class="md-layout-item md-size-80" id="callendar">
            <md-card-content class="md-layout md-gutter">
                <transition name="fade">
                    <div class="loading-bar-wrapper" v-if="isActivating">
                        <loading />
                    </div>
                    <div class="success" v-if="activationSuccess">
                        <p class="md-display-2">Activated successfuly.<p>
                        <p class="md-subheading">You can now <router-link to="/home">login</router-link></p>
                    </div>
                    <div class="error" v-if="activationError">
                        <p class="md-display-2">Activation error<p>
                        <p class="md-subheading">{{activationMessage}}</p>
                    </div>
                </transition>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import Loading from './LoadingBar.vue'

export default {
    components: {
        'loading': Loading
    },
    data() {
        return {
            
        }
    },
    computed: {
        isActivating() {
            return this.$store.getters.isActivating;
        },
        activationSuccess() {
            return this.$store.getters.isActivationSuccess;
        },
        activationError() {
            return this.$store.getters.isActivationError;
        },
        activationMessage() {
            return this.$store.getters.activationMessage;
        }
    },
    watch: {
    },
    methods: {
        activate() {
            var routeParams = this.$route.params;
            this.$store.dispatch('activateAccount', routeParams.secret);
        }
    },
    mounted: function() {
        this.activate();
    }
}
</script>

<style scoped>

.view-content {
    width: 100%;
    height: 100%;
}

.loading-bar-wrapper {
    width: 100%;
}

.loading-component {
    margin: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
