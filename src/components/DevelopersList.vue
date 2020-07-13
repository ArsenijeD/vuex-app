<template>
    <div class="col-2 developers-list-root-col">
        <div class="card text-left row developers-card-row border-primary">
            <h5 class="card-header bg-primary text-white">Developers List</h5>
            <div class="card-body">
                <h6 class="card-title" v-if="showActiveDevelopers">Active:</h6> 
                <div class="row active-developers-row" v-if="showActiveDevelopers">
                    <div class="col-4">
                        <a href="#" class="badge badge-primary" @click="removeDeveloper(developer)" v-for="developer in getActiveDevelopers().slice(0,6)" :key=developer.name>{{ developer.name }}</a>
                    </div>
                    <div class="col-4">
                         <a href="#" class="badge badge-primary" @click="removeDeveloper(developer)" v-for="developer in getActiveDevelopers().slice(6, 12)" :key=developer.name>{{ developer.name }}</a>
                    </div>
                    <div class="col-4">
                         <a href="#" class="badge badge-primary" @click="removeDeveloper(developer)" v-for="developer in getActiveDevelopers().slice(12, 18)" :key=developer.name>{{ developer.name }}</a>
                    </div>
                </div>
                <hr v-if="showRemovedDevelopers && showActiveDevelopers">
                <h6 class="card-title" v-if="showRemovedDevelopers">Removed:</h6>
                <div class="row removed-developers-row" v-if="showRemovedDevelopers">
                    <div class="col-4">
                        <a href="#" class="badge badge-secondary" @click="setDeveloperAsActive(developer)" v-for="developer in getRemovedDevelopers().slice(0,6)" :key=developer.name>{{ developer.name }}</a>
                    </div>
                    <div class="col-4">
                         <a href="#" class="badge badge-secondary" @click="setDeveloperAsActive(developer)" v-for="developer in getRemovedDevelopers().slice(6, 12)" :key=developer.name>{{ developer.name }}</a>
                    </div>
                    <div class="col-4">
                         <a href="#" class="badge badge-secondary" @click="setDeveloperAsActive(developer)" v-for="developer in getRemovedDevelopers().slice(12, 18)" :key=developer.name>{{ developer.name }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            showActiveDevelopers() {
                return this.getActiveDevelopers().length !== 0;
            },
            showRemovedDevelopers() {
                return this.getRemovedDevelopers().length !== 0;
            }
        },
        methods: {
            ...mapGetters([
                'getActiveDevelopers', 
                'getRemovedDevelopers'
            ]),
            ...mapActions([
                'removeDeveloper',
                'setDeveloperAsActive'
            ])
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