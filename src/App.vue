<template>
  <div>
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="#">GitHub Repository Stat Visualizer</a>
    </nav>
    <div class="container-fluid">
      <div class="row search-bar-row justify-content-center align-items-center">
          <div class="col-6 search-bar-column">
           Search bar goes here
          </div>
      </div>
      <div class="row panels-row justify-content-around">
        <div class="col-2 panels-col">Developers list goes here</div>
        <div class="col-3 panels-col">First Chart goes here</div>
        <div class="col-2 panels-col">Commit editing Form goes here</div>
        <div class="col-3 panels-col">Second Chart goes here</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
  @import '~bootstrap/scss/bootstrap';

  .search-bar-column {
    background-color:  lightblue;
    height: 10vh;
  }

  .panels-col {
    background-color:  lightblue;
  }

  .search-bar-row {
    height: 40vh;
    border: 3px dotted blue;
  }

  .panels-row {
    border: 3px dotted red;
    height: 50vh;
  }
</style>
