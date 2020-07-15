import Vue from 'vue';
import Vuex from 'vuex';
import entities from './modules/entities';

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
        entities,
    }
});