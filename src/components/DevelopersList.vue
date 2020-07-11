<template>
    <div class="col-2 developers-list-root-col">
        <div class="row active-developers-row">
            Active developers.
        </div>
        <div class="row removed-developers-row">
            Removed developers.
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .developers-list-root-col {
        background-color:  lightblue;
        height: 100%;
    }
    .active-developers-row {
        height: 50%;
        border: 3px dotted blue;
    }
    .removed-developers-row {
        height: 50%;
        border: 3px dotted red;
    }
    .parent-div {
        height: 100%;
    }
</style>