import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';


const state = {
    entities: {
        commits: {},
        developers: {}
    },
    result: []
};

export default {
    state, 
    getters,
    mutations,
    actions
}