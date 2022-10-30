import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a User
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for User on the backend
export type User = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  username: string;
  password: string;
  dateJoined: Date;

  // Either 'verified' or 'anon'
  accountType: string;


  // Only applicable if accountType === 'verified'
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: Date;

  emailConfirmed: boolean;
  phoneConfirmed: boolean;

  verifiedClubs: Array<Object>;
  pendingClubs: Array<Object>;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Users stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const UserSchema = new Schema({
  // The user's username
  username: {
    type: String,
    required: true
  },
  // The user's password
  password: {
    type: String,
    required: true
  },
  // The date the user joined
  dateJoined: {
    type: Date,
    required: true
  },
  accountType: {
    type: String,
    required: true
  },

  // These are required: false because they are only applicable if accountType === 'verified'
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  birthday: {
    type: Date,
    required: false
  },
  emailConfirmed: {
    type: Boolean,
    required: false
  },
  phoneConfirmed: {
    type: Boolean,
    required: false
  },
  verifiedClubs: {
    type: Array,
    required: false
  },
  pendingClubs: {
    type: Array,
    required: false
  }
});

const UserModel = model<User>('User', UserSchema);

export default UserModel;
