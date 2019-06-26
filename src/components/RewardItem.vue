<template>
    <md-list-item>
        <md-icon class="md-primary no-margin">{{icon}}</md-icon>
        <p class="date-span">{{getDate}}</p>
        <span class="md-list-item-text">{{text}}</span>
        <md-button class="md-icon-button md-list-action">
        <md-badge class="md-square" v-bind:mdContent="points" />
        </md-button>
    </md-list-item>
</template>

<script>

import moment from 'moment'

export default {
    props: { 
        icon: String,
        text: String,
        points: Number,
        date: String
    },
    computed: {
        getDate() {
            return moment(this.date).format("DD-MM-YYYY hh:mm:ss");
        }
    }
}
</script>
<style scoped>

.no-margin {
    margin-right: 5px !important;
}

.date-span {
    width: 25%;
    overflow-wrap: break-word;
    margin-bottom: 0px;
    white-space: initial;
    text-align: center;
    margin-right: 7px;
}

</style>


