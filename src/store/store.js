import Vue from 'vue';
import Vuex from 'vuex';
import commits from './modules/commits';
import developers from './modules/developers';

import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dataLoaded: false
    },
    getters,
    mutations,
    actions,
    modules: {
        commits,
        developers
    }
});