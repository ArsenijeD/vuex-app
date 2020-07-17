<template>
    <div class="col-2 commit-form-root-col">
        <div class="card text-left row commit-form-card-row border-primary">
            <h5 class="card-header bg-primary text-white">Selected Commit</h5>
            <div class="card-body row justify-content-center align-items-center">
                <form>
                    <div class="form-group">
                        <label for="shaInput">SHA: </label>
                        <input type="email" class="form-control" id="shaInput">
                    </div>
                    <div class="form-group">
                        <label for="messageInput">Message: </label>
                        <input type="email" class="form-control" id="messageInput">
                    </div>
                    <div class="form-group">
                        <label for="datetimeInput">Date and time:</label>
                        <div>
                            <input class="form-control" type="datetime-local" value="2011-08-19T13:45:00" id="datetimeInput">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="developerInput">Developer:</label>
                        <select id="developerInput" class="form-control">
                            <option selected>Arsenije</option>
                            <option>milan</option>
                            <option>JOVICA</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label  for="parentsInput">Parents:</label>
                        <multiselect
                            v-model="value"
                            :options="options">
                        </multiselect>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';

    export default {
        data() {
            return {
                options: ['Fitrst', 'Second'],
                value: ''
            }
        },
        components: {
            Multiselect
        }
    }
</script>

<style lang="scss" scoped>
    
    @import '~vue-multiselect/dist/vue-multiselect.min.css';
    @import './../assets/vue-multiselect.scss';

    .commit-form-root-col {
        /* background-color:  lightblue; */
        height: 100%;
    }
    .commit-form-card-row {
        height: 100%;
        /* border: 3px dotted blue; */
    }
</style>