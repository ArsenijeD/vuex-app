//TODO: Break this module into separate files

const state = {
    activeDevelopers: [],
    removedDevelopers: []
};

const getters = {
    getActiveDevelopers: state => {
        return state.activeDevelopers;
    },
    getRemovedDevelopers: state => {
        return state.removedDevelopers;
    }
};

const mutations = {
    setActiveDevelopers: (state, activeDevelopers) => {
        state.activeDevelopers = activeDevelopers;
    },
    moveToRemovedDevelopers: (state, activeDeveloper) => {
        const activeDeveloperIndex = state.activeDevelopers.findIndex(developer => developer.name === activeDeveloper.name);
        state.activeDevelopers.splice(activeDeveloperIndex, 1);
        state.removedDevelopers.push(activeDeveloper);
    },
    moveToActiveDevelopers: (state, removedDeveloper) => {
        const removedDeveloperIndex = state.removedDevelopers.findIndex(developer => developer.name === removedDeveloper.name);
        state.removedDevelopers.splice(removedDeveloperIndex, 1);
        state.activeDevelopers.push(removedDeveloper);
    }
};

const actions = {
    setActiveDevelopers: ({ commit }, activeDevelopers) => {
        commit('setActiveDevelopers', activeDevelopers);
    },
    removeDeveloper: ({ commit }, activeDeveloper) => {
        commit('moveToRemovedDevelopers', activeDeveloper);
    },
    setDeveloperAsActive: ({ commit }, removedDeveloper) => {
        commit('moveToActiveDevelopers', removedDeveloper);
    }
};

export default {
    state, 
    getters,
    mutations,
    actions
}