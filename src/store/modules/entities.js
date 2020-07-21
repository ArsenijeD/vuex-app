//TODO: Break this module into separate files
import { normalize } from 'normalizr';
import { commitCollectionSchema } from '../schemas/commitsSchema';

const state = {
    entities: {
        commits: {},
        developers: {}
    },
    result: []
}

const getters = {
    getActiveDevelopersNames: state => {
        return Object.keys(state.entities.developers).filter(name => {
            if(!state.entities.developers[name].removed)
                return name;
        });
    },
    getRemovedDevelopersNames: state => {
        return Object.keys(state.entities.developers).filter(name => {
            if(state.entities.developers[name].removed)
                return name;
        });
    },
    getCommitsPerActiveDevelopers: (state, getters) => {
        const activeDevelopers = getters.getActiveDevelopersNames;
        let commitsPerActiveDevelopers = activeDevelopers.reduce((a, b)=> (a[b] = 0, a), {});
        activeDevelopers.forEach(activeDeveloper => {
            state.result.forEach(sha => {
                if (state.entities.commits[sha].developer === activeDeveloper) {
                    commitsPerActiveDevelopers[activeDeveloper]+= 1;
                }
            })
        });
        return commitsPerActiveDevelopers;
    },
    isCommitActive: state => (sha) => {
        return !state.entities.commits[sha].removed;
    },
    isDeveloperActive: state => (name) => {
        return !state.entities.developers[name].removed;
    },
    getActiveCommits: (state, getters) => {
        //TODO: cannot use map here
        return Object.values(state.entities.commits).filter(commit => {
            if (getters.isCommitActive(commit.sha) && getters.isDeveloperActive(commit.developer)) {
                 return commit;
            } 
        });
    },
    getSelectedCommit: state => {
        let selectedCommit = {};
        for (let sha of state.result) {
            if (state.entities.commits[sha].selected) {
                selectedCommit = state.entities.commits[sha];
                break;
            }
        }
        return selectedCommit;
    },
    getNonParentsForSelectedCommit: (state, getters) => {
        const selectedCommit = getters.getSelectedCommit;
        return state.result.filter(commitSha => {
            if (!selectedCommit.parents.includes(commitSha) && selectedCommit.sha !== commitSha) {
                return commitSha;
            }
        })
    }
};

const mutations = {
    initializeEntities: (state, data) => {
        const {entities, result} = normalize(data, commitCollectionSchema)
        state.entities = entities;
        state.result = result;
    },
    setDeveloperAsRemoved: (state, developerName) => {
        state.entities.developers[developerName].removed = true;
    },
    setDeveloperAsActive: (state, developerName) => {
        state.entities.developers[developerName].removed = false;
    },
    setCommitAsSelected: (state, sha) => {
        for (let sha of state.result) {
            if (state.entities.commits[sha].selected) {
                state.entities.commits[sha].selected = false;
                break;
            }
        }
        state.entities.commits[sha].selected = true;
    },
    deselectCommit: (state, sha) => {
        state.entities.commits[sha].selected = false;
    },
    changeCommitsDeveloper: (state, { sha, newDeveloper }) => {
        state.entities.commits[sha].developer = newDeveloper;
    },
    addParent: (state , { commitSha, newParentSha }) => {
        state.entities.commits[commitSha].parents.push(newParentSha);
    },
    removeParent: (state , { commitSha, oldParentSha }) => {
        state.entities.commits[commitSha].parents.splice(state.entities.commits[commitSha].parents.indexOf(oldParentSha), 1);
    },
    setCommitAsRemoved: (state, sha) => {
        state.entities.commits[sha].removed = true;
    }
};

const actions = {
    initializeEntities: ({ commit }, data) => {
        commit('initializeEntities', data);
    },
    setDeveloperAsRemoved: ({ commit }, developerName) => {
        commit('setDeveloperAsRemoved', developerName);
    },
    setDeveloperAsActive: ({ commit }, developerName) => {
        commit('setDeveloperAsActive', developerName);
    },
    setCommitAsSelected: ({ commit }, sha) => {
        commit('setCommitAsSelected', sha);
    },
    changeCommitsDeveloper: ({ commit }, { sha, newDeveloper }) => {
        commit('changeCommitsDeveloper', { sha, newDeveloper });
    },
    addParent: ({ commit }, { commitSha, newParentSha }) => {
        commit('addParent', { commitSha, newParentSha });
    },
    removeParent: ({ commit }, { commitSha, oldParentSha }) => {
        commit('removeParent', { commitSha, oldParentSha });
    },
    deselectCommit: ({ commit }, sha) => {
        commit('deselectCommit', sha);
    },
    setCommitAsRemoved: ({ commit }, sha) => {
        commit('setCommitAsRemoved', sha);
    }
};

export default {
    state, 
    getters,
    mutations,
    actions
}