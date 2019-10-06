<template>
    <div>
        <calendar-view></calendar-view>
    </div>
</template>

<script>

import CalendarView from './CalendarComponent.vue'

export default {
    components: {
        'calendar-view': CalendarView
    },
    data() {
        return {
        }
    },
    computed: {
        state(){
            return this.$store.state.loginStatus;
        }
    },
    methods: {
    }
}
</script>

<style scoped>
#product-list-one{
    background: #FFF8B1;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
}
#product-list-one ul{
    padding: 0;
}
#product-list-one li{
    display: inline-block;
    margin-right: 10px;
    margin-top: 10px;
    padding: 20px;
    background: rgba(255,255,255,0.7);
}
.price{
    font-weight: bold;
    color: #E8800C;
}
</style>
