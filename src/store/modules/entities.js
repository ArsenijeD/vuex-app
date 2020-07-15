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
        let commitsPerActiveDevelopers = activeDevelopers.reduce((a,b)=> (a[b]=0, a), {});
        activeDevelopers.forEach(activeDeveloper => {
            state.result.forEach(sha => {
                if (state.entities.commits[sha].developer === activeDeveloper) {
                    commitsPerActiveDevelopers[activeDeveloper]+= 1;
                }
            })
        });
        return commitsPerActiveDevelopers;
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
    }
};

export default {
    state, 
    getters,
    mutations,
    actions
}