<template>
  <div class="root-container">
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="#">GitHub Repository Stat Visualizer</a>
    </nav>
    <div class="container-fluid">
      <div class="row search-bar-row justify-content-center align-items-center">
          <app-search-bar></app-search-bar>
      </div>
      <div class="row panels-row justify-content-around">
          <app-developers-list></app-developers-list>
          <app-pie-chart></app-pie-chart>
          <app-commit-form></app-commit-form>
          <app-commits-graph></app-commits-graph>
      </div>
    </div>
  </div>
</template>

<script>

  import SearchBar from './components/SearchBar.vue';
  import PieChart from './components/PieChart.vue';
  import DevelopersList from './components/DevelopersList.vue'
  import CommitForm from './components/CommitForm.vue';
  import CommitsGraph from './components/CommitsGraph.vue';

  export default {
    name: 'app',
    data () {
      return {}
    },
    components: {
      appSearchBar: SearchBar,
      appPieChart: PieChart,
      appDevelopersList: DevelopersList,
      appCommitForm: CommitForm,
      appCommitsGraph: CommitsGraph
    }
  }
</script>

<style lang="scss">
  @import '~bootstrap/scss/bootstrap';

  .root-container {
    height: 100vh;
  }
  .container-fluid {
    height: 90%;
  }
  .search-bar-row {
    height: 40%;
    border: 3px dotted blue;
  }
  .panels-row {
    border: 3px dotted red;
    height: 60%;
  }
</style>
