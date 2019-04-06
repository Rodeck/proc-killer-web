<template>
    <div class="container main-view-container">
        <div class="row">
            <div class="col-sm-11 d-flex justify-content-center">
                <div v-for="(viewDay, index) in CurrentWeek" v-bind:key="viewDay.id" class="viewDay" v-on:click="pickDay(index)">
                    {{viewDay.name}}
                </div>
            </div>
            <div v-if="isLoadingData" class="col-sm-1 lds-ripple"><div></div><div></div></div>
        </div>
        <div class="row content">
            <div class="col-sm-5">
                
            </div>
        </div>
    </div>
</template>

<script>

import * as ViewDay from '../types/ViewDay'

export default {
    data() {
        return {
            CurrentWeek: [new ViewDay.ViewDay(0, "Sunday"), new ViewDay.ViewDay(1, "Monday"), new ViewDay.ViewDay(2, "Tuesday"), 
            new ViewDay.ViewDay(3, "Wednesday"), new ViewDay.ViewDay(4, "Thursday"), new ViewDay.ViewDay(5, "Friday"), new ViewDay.ViewDay(6, "Saturday")],
            dayIsPicked: false
        }
    },
    computed: {
        callendar(){
            return this.$store.state.callendar;
        },
        isLoadingData(){
            return this.$store.getters.isLoadingData;
        }
    },
    methods: {
        pickDay: (no) => {
            console.log(no);
        }
    },
    mounted: function() {
        this.$store.dispatch('loadData');
    }
}
</script>

<style scoped>

.container * {
    font-family: Ubuntu;
}


.content {
    height: 550px;
}
.main-view-container {
    height: 75%;
    background-color: rgb(90, 68, 40);
}

.content {
    background-color: rgb(107, 68, 39);
}

.viewDay {
    cursor: pointer;
    background-color: rgb(85, 44, 44);
    padding: 10px;
      -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}

.viewDay:hover {
    background-color: rgb(129, 69, 69);
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}


</style>
