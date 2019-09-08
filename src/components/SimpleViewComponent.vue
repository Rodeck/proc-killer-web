<template>
    <div class="md-layout md-alignment-center wrapper md-gutter">
        <div class="md-layout-item md-size-30">
            <account></account>
        </div>
        <div class="md-layout-item md-size-30">
            <mini-rewards></mini-rewards>
        </div>
        <div class="md-layout-item md-size-60">
            <clostest-todos :key="todoKey"></clostest-todos>
        </div>
        <transition name="fade">
            <add-todo v-if="showAddTodoWindow"></add-todo>
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

export default {
    components: {
        'loading-bar': Loading,
        'account': Account,
        'clostest-todos': ClostestTodos,
        'add-todo': AddTodo,
        'mini-rewards': MiniRewards,
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
}

.content {
    flex: 1 1 auto;
    min-height: 80%;
    max-height: 80%;
}

.scrollable {
    max-height: 100%;
    display: inline;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
