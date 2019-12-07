<template>
    <div class="loading-wrapper">
        <div class="loading-title">
            Loading...
        </div>
        <div class="loading-spinner">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

.loading-wrapper {
    margin: auto;
    display: table;
}

.loading-spinner {
    display: table;
}

.loading-title {
    display: table;
}

</style>
