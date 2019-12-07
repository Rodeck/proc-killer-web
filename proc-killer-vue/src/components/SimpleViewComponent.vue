<template>
    <div class="md-layout md-alignment-center wrapper md-gutter">
        <div class="md-layout-item md-size-90">
            <clostest-todos :key="todoKey"></clostest-todos>
        </div>
        <div class="md-layout-item md-size-90">
            <mini-rewards></mini-rewards>
        </div>
        <transition name="fade">
            <add-todo v-if="showAddTodoWindow"></add-todo>
            <popup-window v-if="showPopupWindow"></popup-window>
        </transition>
    </div>
</template>

<script>

import * as moment from 'moment';
import Account from './AccountComponent.vue'
import Loading from './LoadingBar.vue'
import ClostestTodos from './ClostestTodosComponent.vue'
import AddTodo from './AddTodo.vue'
import MiniRewards from './MiniRewardsComponent.vue'
import PopupWindow from './PopupWindow.vue'

export default {
    components: {
        'loading-bar': Loading,
        'account': Account,
        'clostest-todos': ClostestTodos,
        'add-todo': AddTodo,
        'mini-rewards': MiniRewards,
        'popup-window': PopupWindow
    },
    data() {
        return {
        }
    },
    computed: {
        callendar() {
            return this.$store.getters.getCallendar;
        },
        showAddTodoWindow(){
            return this.$store.getters.showAddTodoWindow;
        },
        todoKey() {
            return this.$store.getters.clostestTodosKey;
        },
        showPopupWindow() {
            return this.$store.getters.showPopup;
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format("DD-MM-YYYY");
        }
    },
    watch: {
    },
}
</script>

<style scoped>

.wrapper {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
}

.wrapper > div {
    margin-top: 50px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
