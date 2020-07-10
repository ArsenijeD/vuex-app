import Vue from 'vue';
import Vuex from 'vuex';
import commits from './modules/commits';
import developers from './modules/developers';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        commits,
        developers
    }
});