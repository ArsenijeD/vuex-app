import { schema } from 'normalizr';
import { developerSchema } from './developersSchema';

export const ENTITY_COMMIT = 'commits';
export const commitSchema = new schema.Entity(ENTITY_COMMIT, { developer: developerSchema}, {idAttribute: 'sha'})
export const commitCollectionSchema = new schema.Array(commitSchema);

commitSchema.define({
    parents: commitCollectionSchema
})