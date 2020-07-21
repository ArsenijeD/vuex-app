import { normalize } from 'normalizr';
import { commitCollectionSchema } from '../schemas/commitsSchema';

export const initializeEntities = (state, data) => {
    const {entities, result} = normalize(data, commitCollectionSchema)
    state.entities = entities;
    state.result = result;
};

export const setDeveloperAsRemoved = (state, developerName) => {
    state.entities.developers[developerName].removed = true;
};

export const setDeveloperAsActive = (state, developerName) => {
    state.entities.developers[developerName].removed = false;
};

export const setCommitAsSelected = (state, sha) => {
    for (let sha of state.result) {
        if (state.entities.commits[sha].selected) {
            state.entities.commits[sha].selected = false;
            break;
        }
    }
    state.entities.commits[sha].selected = true;
};

export const deselectCommit = (state, sha) => {
    state.entities.commits[sha].selected = false;
};

export const changeCommitsDeveloper = (state, { sha, newDeveloper }) => {
    state.entities.commits[sha].developer = newDeveloper;
};

export const addParent = (state , { commitSha, newParentSha }) => {
    state.entities.commits[commitSha].parents.push(newParentSha);
};

export const removeParent = (state , { commitSha, oldParentSha }) => {
    state.entities.commits[commitSha].parents.splice(state.entities.commits[commitSha].parents.indexOf(oldParentSha), 1);
};

export const setCommitAsRemoved = (state, sha) => {
    state.entities.commits[sha].removed = true;
};