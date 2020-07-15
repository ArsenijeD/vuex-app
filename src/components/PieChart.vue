<template>
    <div class="col-3 pie-chart-root-col">
        <div class="card text-left row pie-chart-card-row border-primary">
            <h5 class="card-header bg-primary text-white">Developers Contribution</h5>
            <div class="card-body row justify-content-center align-items-center">
                <graph-pie v-if="showPieChart" class="row justify-content-center pc "
                        :width="450"
                        :height="450"
                        :values="commitsByPercentage"
                        :names="developers"
                        :active-index="[ 0, 2 ]"
                        :active-event="'click'"
                        :padding-left="75"
                        :show-text-type="'outside'"
                        :data-format="dataFormat"
                        :shape="'donut'"
                        :show-total-value="true">
                    <legends :names="developers"></legends>
                    <tooltip :names="developers"></tooltip>
                </graph-pie>
                <div class="progress row justify-content-center" v-if="!showPieChart">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">Please set developer as active...</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            showPieChart() {
                return Object.keys(this.getActiveDevelopersNames()).length !== 0;
            },
            developers() {
                return Object.keys(this.getCommitsPerActiveDevelopers());
            },
            commitsByPercentage() {
                const commitsPerActiveDevelopers = Object.values(this.getCommitsPerActiveDevelopers());
                const commitsSum = commitsPerActiveDevelopers.reduce((a, b) => a + b, 0);
                console.log(commitsPerActiveDevelopers);
                console.log(commitsSum);
                return commitsPerActiveDevelopers.map(commitsPerDeveloper => {
                    return Math.round((commitsPerDeveloper * 100) / commitsSum);
                });
            }
        },
        data() {
            return {
                values: [ 10, 5, 5 ],
                names: [ 'Apple', 'Google', 'MS', 'Facebook']
            }
        },
        methods: {
            ...mapGetters([
                'getActiveDevelopersNames',
                'getCommitsPerActiveDevelopers'
            ]),
            dataFormat: (a, b) => {
                if(b) return b + "%";
                return a;
            }
        }
    }
</script>

<style scoped>
    .pie-chart-root-col {
        height: 100%;
    }
    .pie-chart-card-row {
        height: 100%;
        /* border: 3px dotted blue; */
    }
    .pc {
        /* border: 3px dotted red; */
    }
    .progress-bar {
        width: 100%;
    }
    .progress {
        width: 50%;
        height: 8%;
    }
</style>