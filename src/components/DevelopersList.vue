<template>
    <div class="col-2 developers-list-root-col">
        <div class="card text-left row developers-card-row border-primary">
            <h5 class="card-header bg-primary text-white">Developers List</h5>
            <div class="card-body">
                <h6 class="card-title" v-if="showActiveDevelopers">Active:</h6> 
                <div class="row active-developers-row" v-if="showActiveDevelopers">
                    <div class="col-4">
                        <a href="#" class="badge badge-primary" @click="removeDeveloper(developersName)" v-for="developersName in getActiveDevelopersNames()" :key=developersName>{{ developersName }}</a>
                    </div>
                </div>
                <hr v-if="showRemovedDevelopers && showActiveDevelopers">
                <h6 class="card-title" v-if="showRemovedDevelopers">Removed:</h6>
                <div class="row removed-developers-row" v-if="showRemovedDevelopers">
                    <div class="col-4">
                        <a href="#" class="badge badge-secondary" @click="setDeveloperAsActive(developersName)" v-for="developersName in getRemovedDevelopersNames()" :key=developersName>{{ developersName }}</a>
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
                return this.getActiveDevelopersNames().length !== 0;
            },
            showRemovedDevelopers() {
                return this.getRemovedDevelopersNames().length !== 0;
            }
        },
        methods: {
            ...mapGetters([
                'getActiveDevelopersNames', 
                'getRemovedDevelopersNames',
                'getSelectedCommit'
            ]),
            ...mapActions([
                'setDeveloperAsRemoved',
                'setDeveloperAsActive',
                'deselectCommit'
            ]),
            removeDeveloper(developersName) {
                const selectedCommit = this.getSelectedCommit();
                if(selectedCommit.developer === developersName) {
                    this.deselectCommit(selectedCommit.sha);
                }
                this.setDeveloperAsRemoved(developersName);
            }
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
        overflow-y: auto;
        margin-right: 2%;
    }
    .removed-developers-row {
        height: 35%;
        /* border: 3px dotted blue; */
        overflow-y: auto;
        margin-right: 2%;
    }
    .card-title {
        height: 9%;
        /* border: 3px dotted red; */
    }
</style>