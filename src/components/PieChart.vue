<template>
    <div class="col-3 pie-chart-root-col">
        <div class="card text-left row pie-chart-card-row border-primary">
            <h5 class="card-header bg-primary text-white">Developers Contribution</h5>
            <div class="card-body row justify-content-center align-items-top" v-if="showPieChart">
                <graph-pie class="row justify-content-center graph-pie"
                        :width="430"
                        :height="430"
                        :values="commitsByPercentage"
                        :names="developers"
                        :active-index="[0, 2]"
                        :active-event="'click'"
                        :padding-left="75"
                        :show-text-type="'outside'"
                        :data-format="dataFormat"
                        :shape="'donut'"
                        :show-total-value="true">
                    <legends :names="developers"></legends>
                    <tooltip :names="developers"></tooltip>
                </graph-pie>
            </div>
            <div class="card-body row justify-content-center align-items-center" v-if="!showPieChart">
                <div class="progress row justify-content-center" >
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
                const commitsSum = this.sumArray(commitsPerActiveDevelopers);
                let commitsByPercentage = commitsPerActiveDevelopers.map(commitsPerDeveloper => {
                    return Math.round((commitsPerDeveloper * 100) / commitsSum);
                });
                //Logic below is added because some percents are lost while rounding
                const percentageSum = this.sumArray(commitsByPercentage);
                commitsByPercentage[0] += 100 - percentageSum;
                return commitsByPercentage;
            }
        },
        data() {
            return {}
        },
        methods: {
            ...mapGetters([
                'getActiveDevelopersNames',
                'getCommitsPerActiveDevelopers'
            ]),
            sumArray: array => {
                return array.reduce((a, b) => a + b, 0);
            },
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
    .graph-pie {
        /* border: 3px dotted red;  */
    }
    .card-body {
        height: 80%;
    }
    .progress-bar {
        width: 100%;
    }
    .progress {
        width: 50%;
        height: 8%;
    }
</style>