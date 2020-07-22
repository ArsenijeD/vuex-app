<template>
    <div class="col-3 commits-graph-root-col">
        <div class="card text-left row commits-graph-card-row border-primary">
            <h5 class="card-header bg-primary text-white">Commits Graph</h5>
            <div class="card-body row justify-content-center align-items-center">
                <div>
                    <d3-network :net-nodes="nodes" :net-links="links" :options="options" @node-click="onNodeClick" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import D3Network from 'vue-d3-network';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        computed: {
            nodes() {    
                return this.getActiveCommits().reverse().map((activeCommit, index) => {
                    return {
                        id: activeCommit.sha,
                        name: index + 1
                    }
                });
            },
            links() {
                let links = [];
                this.getActiveCommits().forEach(activeCommit => {
                    activeCommit.parents.forEach(parent => {
                        if(this.commitParentExists(parent)) {
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
            ...mapActions([
                'setCommitAsSelected'
            ]),
            commitParentExists(sha) {
                return this.getActiveCommits().filter(activeCommit => activeCommit.sha === sha).length !== 0;
            },
            onNodeClick(event, node) {
                this.setCommitAsSelected(node.id);
            }
        },
        data() {
            return {
                options: {
                    force: 1000,
                    nodeSize: 20,
                    linkWidth: 2,
                    size: {
                        w: 430,
                        h: 435
                    },
                    nodeLabels: true
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
    .card-body {
        height: 80%;
    }
    .commits-graph-card-row {
        height: 100%;
        /* border: 3px dotted blue; */
    }
</style>