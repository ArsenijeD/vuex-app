//TODO: Break this module into separate files

const state = {
    commits: []
};

const getters = {
    getCommits: state => {
        return state.commits;
    }
};

const mutations = {
    setCommits: (state, commits) => {
        state.commits = commits;
    }
};

const actions = {
    setCommits: ({ commit }, commits) => {
        commit('setCommits', commits);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}