<template>
    <div class="col-3 commits-graph-root-col">
        <div class="card text-left row commits-graph-card-row border-primary">
            <h5 class="card-header bg-primary text-white">Commits</h5>
            <div class="card-body row justify-content-center align-items-center">
                <div>
                    <d3-network :net-nodes="nodes" :net-links="links" :options="options" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import D3Network from 'vue-d3-network';
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            nodes() {                
                return this.getActiveCommits().map(activeCommit => {
                    return {
                        id: activeCommit.sha,
                        name: activeCommit.message
                    }
                });
            },
            links() {
                let links = [];
                this.getActiveCommits().forEach(activeCommit => {
                    activeCommit.parents.forEach(parent => {
                        if(this.commitParentExist(parent)) {
                            links.push( 
                            {
                                id: activeCommit.sha + '_' + parent,
                                name: activeCommit.sha + '_' + parent,
                                tid: parent,
                                sid: activeCommit.sha
                            });
                        }
                    });
                });
                return links;
            }
        },
        methods: {
            ...mapGetters([
                'getActiveCommits'
            ]),
            commitParentExist(sha) {
                return this.getActiveCommits().filter(activeCommit => activeCommit.sha === sha).length !== 0;
            }
        },
        data() {
            return {
                options: {
                    force: 1000,
                    nodeSize: 20,
                    linkWidth: 2
                }
            }
        },
        components: {
            D3Network
        }
    }
</script>

<style scoped>
    @import '~vue-d3-network/dist/vue-d3-network.css';

    .commits-graph-root-col {
        height: 100%;
    }
    .commits-graph-card-row {
        height: 100%;
        /* border: 3px dotted blue; */
    }
</style>