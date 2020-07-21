export const initializeEntities = ({ commit }, data) => {
    commit('initializeEntities', data);
};

export const setDeveloperAsRemoved = ({ commit }, developerName) => {
    commit('setDeveloperAsRemoved', developerName);
};

export const setDeveloperAsActive = ({ commit }, developerName) => {
    commit('setDeveloperAsActive', developerName);
};

export const setCommitAsSelected = ({ commit }, sha) => {
    commit('setCommitAsSelected', sha);
};

export const changeCommitsDeveloper = ({ commit }, { sha, newDeveloper }) => {
    commit('changeCommitsDeveloper', { sha, newDeveloper });
};

export const addParent = ({ commit }, { commitSha, newParentSha }) => {
    commit('addParent', { commitSha, newParentSha });
};

export const removeParent = ({ commit }, { commitSha, oldParentSha }) => {
    commit('removeParent', { commitSha, oldParentSha });
};

export const deselectCommit = ({ commit }, sha) => {
    commit('deselectCommit', sha);
};

export const setCommitAsRemoved = ({ commit }, sha) => {
    commit('setCommitAsRemoved', sha);
};