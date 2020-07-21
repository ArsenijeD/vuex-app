export const getActiveDevelopersNames = state => {
    return Object.keys(state.entities.developers).filter(name => {
        if(!state.entities.developers[name].removed)
            return name;
    });
};

export const getRemovedDevelopersNames = state => {
    return Object.keys(state.entities.developers).filter(name => {
        if(state.entities.developers[name].removed)
            return name;
    });
};

export const getCommitsPerActiveDevelopers = (state, getters) => {
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
};

export const isCommitActive = state => (sha) => {
    return !state.entities.commits[sha].removed;
};
export const isDeveloperActive =  state => (name) => {
    return !state.entities.developers[name].removed;
};

export const getActiveCommits = (state, getters) => {
    return Object.values(state.entities.commits).filter(commit => {
        if (getters.isCommitActive(commit.sha) && getters.isDeveloperActive(commit.developer)) {
                return commit;
        } 
    });
};

export const getSelectedCommit = state => {
    let selectedCommit = {};
    for (let sha of state.result) {
        if (state.entities.commits[sha].selected) {
            selectedCommit = state.entities.commits[sha];
            break;
        }
    }
    return selectedCommit;
};

export const getNonParentsForSelectedCommit = (state, getters) => {
    const selectedCommit = getters.getSelectedCommit;
    return state.result.filter(commitSha => {
        if (!selectedCommit.parents.includes(commitSha) && selectedCommit.sha !== commitSha) {
            return commitSha;
        }
    })
};
