<template>
    <div class="md-layout wrapper md-alignment-top-center">
        <div class="md-layout-item md-size-90 md-display-3 title margin">
            <p>Do you need to raise your productivity?</p>
        </div>
        <div class="md-layout-item md-size-90 md-display-3 title">
            <img class="raise-img" src="./../assets/raise.png"/>
        </div>
        <div class="md-layout-item md-size-90 md-display-1 title">
            <span>Start improving Your life </span><router-link to="/login">TODAY</router-link>
        </div>
    </div>
</template>

<script>

export default {
    components: {
    },
    data() {
        return {
        }
    },
    computed: {

    },
    methods: {
        
    }
}
</script>

<style scoped>

.wrapper {
    width: 90%;
    margin: auto;
    height: 100%;
}

.title {
    text-align: center;
}

.margin {  
    margin-top: 5%;
}

.raise-img {
    width: 200px;
    height: 200px;
}

</style>
