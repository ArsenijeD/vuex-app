const state = {
    developers: []
};

const getters = {
    getDevelopers: state => {
        return state.developers;
    }
};

const mutations = {
    setDevelopers: (state, developers) => {
        state.developers = developers;
    }
};

const actions = {
    setDevelopers: ({ commit }, developers) => {
        commit('setDevelopers', developers);
    }
};

export default {
    state, 
    getters,
    mutations,
    actions
}