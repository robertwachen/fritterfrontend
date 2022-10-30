import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Club} from '../club/model';
import type {Types} from 'mongoose';

// Update this if you add a property to the Club type!
type ClubResponse = {
  _id: string;
  name: string;
  privacy: string;
  clubRules: string;
  members: Array<Types.ObjectId>;
  pendingMembers: Array<Types.ObjectId>;
  dateCreated: string;
  clubOwner: Types.ObjectId;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Club object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Club>} club - A freet
 * @returns {ClubResponse} - The freet object formatted for the frontend
 */
const constructClubResponse = (club: HydratedDocument<Club>): ClubResponse => {
  const clubCopy: Club = {
    ...club.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...clubCopy,
    _id: clubCopy._id.toString(),
    name: clubCopy.name,
    privacy: clubCopy.privacy,
    clubRules: clubCopy.clubRules,
    members: clubCopy.members,
    pendingMembers: clubCopy.pendingMembers,
    dateCreated: formatDate(clubCopy.dateCreated),
    clubOwner: clubCopy.clubOwner
  };
};

export {
  constructClubResponse
};
