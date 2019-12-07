<template>
    <md-checkbox class="checkbox-centered" v-model="completed" @change="changeStatus($event, todo.id)"></md-checkbox>
</template>

<script>

export default {
    components: {
    },
    props: ['todo'],
    data: () => ({
        completed: true
    }),
    computed: {
    },
    watch: {
    },
    methods: {
        changeStatus(isCompleted, todoId) {
            console.log(todoId);
            if (isCompleted)
                this.$store.dispatch('markCompleted', todoId);
            else 
                this.$store.dispatch('restore', todoId);
        },
    },
    mounted: function() {
        this.completed = this.todo.completed;
    }
}
</script>

<style scoped>
  
</style>
