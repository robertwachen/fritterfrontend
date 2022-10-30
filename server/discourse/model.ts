import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Discourse
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Discourse on the backend
export type Discourse = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  startDate: Date;
  endDate: Date;
  clubs: String[];
};

// Mongoose schema definition for interfacing with a MongoDB table
// Discourses stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const DiscourseSchema = new Schema<Discourse>({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  clubs: {
    type: [String],
    required: true,
  },
});

const DiscourseModel = model<Discourse>('Discourse', DiscourseSchema);
export default DiscourseModel;
