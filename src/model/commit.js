import Developer from "./developer";

export default class Commit {
    constructor(apiCommit) {
        this.sha = apiCommit.sha;
        this.parents = apiCommit.parents.map(parent => parent.sha);
        this.message = apiCommit.commit.message;
        this.date = apiCommit.commit.author.date;
        this.developer = new Developer(apiCommit.commit.author);
        this.removed = false;
    }
}

