export default class Developer {
    constructor(apiAuthor) {
        this.name = apiAuthor.name;
        this.email = apiAuthor.email;
        this.removed = false;
    }
}