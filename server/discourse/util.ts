import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Club} from '../club/model';
import type {Types} from 'mongoose';
import { Discourse } from './model';

// Update this if you add a property to the Club type!
type DiscourseResponse = {
  _id: string;
  startDate: string;
  endDate: string;
  clubs: String[];
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
 * @returns {DiscourseResponse} - The freet object formatted for the frontend
 */
const constructDiscourseResponse = (discourse: HydratedDocument<Discourse>): DiscourseResponse => {
  const discourseCopy: Discourse = {
    ...discourse.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...discourseCopy,
    _id: discourseCopy._id.toString(),
    startDate: formatDate(discourse.startDate),
    endDate: formatDate(discourse.endDate),
    clubs: discourseCopy.clubs,
  };
};

export {
  constructDiscourseResponse
};
