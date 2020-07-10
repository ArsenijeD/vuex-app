<template>
<div class="col-6 search-bar-column">
    <div class="card search-bar-card row">
        <div class="card-body row">
            <form class="form-inline container-fluid">
                <div class="col-5 form-group">
                    <input placeholder="Enter GitHub Username" type="text" class="form-control col-12" id="username">
                </div>
                <div class="col-5 form-group">
                    <input placeholder="Enter Repository Name" type="text" class="form-control col-12" id="repository">
                </div>
                <div class="col-2 form-group">
                    <button type="submit" class="btn btn-primary col-12"> Check </button>
                </div>
            </form>
        </div>
    </div>
    <div class="progress row">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .search-bar-column {
        height: 40%;
    }
    .search-bar-card {
        height: 80%;
    }
    .progress-bar {
        width: 30%;
    }
</style>