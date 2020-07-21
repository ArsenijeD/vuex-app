<template>
    <div class="col-2 commit-form-root-col">
        <div class="card text-left row commit-form-card-row border-primary">
            <h5 class="card-header bg-primary text-white">Selected Commit</h5>
            <div class="card-body row justify-content-center align-items-center">
                <form class="commit-form">
                    <div class="form-group">
                        <label for="shaInput">SHA: </label>
                        <input type="email" class="form-control" id="shaInput" :value="selectedCommit.sha" disabled>
                    </div>
                    <div class="form-group">
                        <label for="messageInput">Message: </label>
                        <input type="email" class="form-control" id="messageInput" :value="selectedCommit.message" disabled>
                    </div>
                    <div class="form-group">
                        <label for="developerInput">Developer:</label>
                        <select id="developerInput" class="form-control" :value="selectedCommit.developer" @change="onDeveloperChange" :disabled="formDisabled">
                            <option hidden selected></option>
                            <option v-for="activeDeveloperName in getActiveDevelopersNames()" :key=activeDeveloperName>{{activeDeveloperName}}</option>
                        </select>
                    </div>
                    <div class="form-group parents-group">
                        <label for="developerInput">Parents:</label>
                        <div class="row justify-content-end list-groups-row" v-if="selectedCommit.sha">
                            <ul class="list-group col-5 parents-list">
                                <a v-for="parent in selectedCommit.parents" :key=parent href="#" @click="onParentClick($event, parent)" class="list-group-item list-group-item-action py-0">{{parent.substring(0, 2)}}..</a>
                            </ul>
                            <ul class="list-group col-5 non-parents-list">
                                <a v-for="nonParent in nonParentCommits" :key=nonParent href="#" @click="onNonParentClick($event, nonParent)" class="list-group-item list-group-item-action py-0">{{nonParent.substring(0, 2)}}..</a>
                            </ul>
                        </div>
                        <div class="row justify-content-center list-groups-row align-items-center" v-if="!selectedCommit.sha">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">No parents currently..</div>
                        </div>
                    </div>
                    <div class="row justify-content-end button-div align-items-center">
                        <button type="submit" :disabled="formDisabled" class="btn btn-secondary" @click="onRemoveClick">Remove</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            selectedCommit() {
                return this.getSelectedCommit();
            },
            nonParentCommits() {
                return this.getNonParentsForSelectedCommit(this.selectedCommit.sha);
            },
            formDisabled() {
                return !this.selectedCommit.sha;
            }
        },
        data() {
            return {}
        },
        methods: {
            ...mapGetters([
                'getSelectedCommit',
                'getActiveDevelopersNames',
                'getNonParentsForSelectedCommit'
            ]),
            ...mapActions([
                'changeCommitsDeveloper',
                'addParent',
                'removeParent',
                'setCommitAsRemoved',
                'deselectCommit'
            ]),
            onDeveloperChange(event) {
                this.changeCommitsDeveloper({ sha: this.selectedCommit.sha, newDeveloper: event.target.value });
            },
            onNonParentClick(event, nonParent) {
                this.addParent({commitSha: this.selectedCommit.sha, newParentSha: nonParent});
            },
            onParentClick(event, parent) {
                this.removeParent({commitSha: this.selectedCommit.sha, newParentSha: parent});
            },
            onRemoveClick() {
                this.setCommitAsRemoved(this.selectedCommit.sha);
                this.deselectCommit(this.selectedCommit.sha);
            }
        }
    }
</script>

<style  scoped>
    .commit-form-root-col {
        /* background-color:  lightblue; */
        height: 100%;
    }
    .commit-form-card-row {
        height: 100%;
        /* border: 3px dotted blue; */
    }
    .card-body {
        height: 80%;
    }
    .commit-form {
        height: 100%;
        /* border: blue dotted 3px; */
    }
    .list-groups-row {
        height: 70%;
        width: 100%;
        /* border: 3px dotted blue; */
    }
    .parents-list {
        height: 100%;
        overflow-y: auto;
        padding-right: 0;
        margin-right: 2%;
    }
    .non-parents-list {
        height: 100%;
        /* flex: 1 1 0;  */
        /* display: flex; */
        /* flex-direction: column; */
        overflow-y: auto;
        padding-right: 0;
        margin-left: 2%;
    }
    .parents-group {
        height: 25%;
        /* border: red dotted 3px; */
    }
    .button-div {
        width: 100%;
        height: 10%;
        /* border: red dotted 3px; */
        margin-left: 1%;
    }
    .progress-bar {
        width: 100%;
        margin-left: 14%;
    }
    .list-group-item-action {
        text-align: center;
    }
</style>