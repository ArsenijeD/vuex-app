<template>
    <div class="col-6 search-bar-root-col">
        <div class="card search-bar-card row">
            <div class="card-body row">
                <form class="form-inline container-fluid" @submit.prevent="onSubmit">
                    <div class="col-5 form-group">
                        <input placeholder="Enter GitHub Username" type="text" class="form-control col-12" id="username" v-model="gitUsername">
                    </div>
                    <div class="col-5 form-group">
                        <input placeholder="Enter Repository Name" type="text" class="form-control col-12" id="repository" v-model="gitRepository">
                    </div>
                    <div class="col-2 submit">
                        <button type="submit" class="btn btn-primary col-12"> Check </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="progress row" v-if="showProgress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">Loading...</div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapActions, mapGetters } from 'vuex';
    import Commit from './../model/commit';
    import Developer from './../model/developer';

    export default {
        data() {
            return {
                gitUsername: '',
                gitRepository: '',
                showProgress: false
            }
        },
        methods: {
            ...mapActions([
                'setDataLoaded',
                'initializeEntities',
            ]),
            ...mapGetters([
                'getCommitsPerDevelopers'
            ]),
            onSubmit() {
                //TODO: Move this logic to action and use processStrategy function from normalizr library
                this.showProgress = true;
                axios.get('/repos/' + this.gitUsername + '/' + this.gitRepository + '/commits')
                    .then(response => {
                        let commits = [];

                        response.data.forEach(apiCommit => {
                            commits.push(new Commit(apiCommit));
                        });
                        
                        this.setDataLoaded(true);
                        this.initializeEntities(commits);
                    })
                    .catch(error => {
                        //TODO: Handle this
                    })
                    .finally(response => {
                        this.showProgress = false;
                    });
            }
        }
    }
</script>

<style scoped>
    .search-bar-root-col {
        height: 40%;
    }
    .search-bar-card {
        height: 80%;
    }
    .progress-bar {
        width: 100%;
    }
</style>