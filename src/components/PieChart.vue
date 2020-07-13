<template>
    <div class="col-3 pie-chart-root-col">
        <div class="card text-left row pie-chart-card-row border-primary">
            <h5 class="card-header bg-primary text-white">Developers Contribution</h5>
            <div class="card-body">
                <graph-pie class="row justify-content-center pc"
                        :width="400"
                        :height="400"
                        :values="values"
                        :names="getActiveDevelopersNames()"
                        :active-index="[ 0, 2 ]"
                        :active-event="'click'"
                        :padding-left="75"
                        :show-text-type="'outside'"
                        :data-format="dataFormat"
                        :shape="'donut'"
                        :show-total-value="true">
                    <legends :names="getActiveDevelopersNames()"></legends>
                    <tooltip :names="getActiveDevelopersNames()"></tooltip>
                </graph-pie>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                values: [ 10, 5, 5 ],
                names: [ 'Apple', 'Google', 'MS', 'Facebook']
            }
        },
        methods: {
            ...mapGetters([
                'getActiveDevelopers',
                'getActiveDevelopersNames'
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
</style>