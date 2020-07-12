<template>
    <div class="col-2 developers-list-root-col">
        <div class="card text-left row developers-card-row border-primary">
            <h5 class="card-header bg-primary text-white">Developers List</h5>
            <div class="card-body">
                <h6 class="card-title">Active:</h6>
                <div class="row active-developers-row">
                    <div class="col-4">
                        <a href="#" class="badge badge-primary" v-for="developer in activeDevelopers" :key=developer.name>{{ developer.name }}</a>
                    </div>
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                    </div>
                    
                </div>
                <hr>
                <h6 class="card-title">Removed:</h6>
                <div class="row removed-developers-row">
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                    </div>
                    <div class="col-4">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            activeDevelopers() {
                return this.getDevelopers().filter(developer => { return developer.active });
            },
            removedDevelopers() {
                return this.getDevelopers().filter(developer => { return !developer.active });
            }
        },
        methods: {
            ...mapGetters(['getDevelopers'])
        }
    }
</script>

<style scoped>
    .developers-list-root-col {
        height: 100%;
    }
    .developers-card-row {
        height: 100%;
        /* border: 3px dotted blue; */
    }
    .active-developers-row {
        height: 34%;
        /* border: 3px dotted blue; */
    }
    .removed-developers-row {
        height: 35%;
        /* border: 3px dotted blue; */
    }
    .card-title {
        height: 9%;
        /* border: 3px dotted red; */
    }
</style>