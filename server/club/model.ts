import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Club
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type Club = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  name: string;
  privacy: string;
  clubRules: string;
  members: Array<Types.ObjectId>;
  pendingMembers: Array<Types.ObjectId>;
  dateCreated: Date;
  clubOwner: Types.ObjectId;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const ClubSchema = new Schema<Club>({
  // The club name
  name: {
    type: String,
    required: true,
  },
  privacy: {
    type: String,
    required: true,
  },
  clubRules: {
    type: String,
    required: true,
  },
  members: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  pendingMembers: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  clubOwner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
});

const ClubModel = model<Club>('Club', ClubSchema);
export default ClubModel;
