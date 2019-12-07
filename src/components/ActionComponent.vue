<template>
    <div class="md-layout-item md-size-20" v-on:click="goToView">
        <div class="md-layout md-alignment-center-center wrapper md-gutter" :click="goToView">
            <div class="md-layout-item md-size-80 md-body-2">{{actionDescription}}</div>
            <div class="md-layout-item md-size-20">
                <md-icon v-if="isCompleted">check_box</md-icon>
                <md-icon v-else>check_box_outline_blank</md-icon>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components: {
    },
    props: ['actionType', 'link', 'actionDescription'],
    data() {
        return {
        }
    },
    computed: {
        isCompleted() {
            console.log(this.actionType);
            return this.$store.getters.isActionCompleted(this.actionType);
        }
    },
    watch: {
    },
    methods: {
        goToView() {
            console.log("Go to", this.link);
            this.$router.push('/' + this.link);
        }
    },
    mounted: function() {
    }
}
</script>

<style scoped>
</style>
