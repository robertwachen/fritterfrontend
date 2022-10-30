import type {HydratedDocument, Types} from 'mongoose';
import type {Discourse} from './model';
import DiscourseModel from './model';
import ClubModel from './model';

/**
 * This file contains a class with functionality to interact with clubs stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<Club> is the output of the ClubModel() constructor,
 * and contains all the information in Club. https://mongoosejs.com/docs/typescript.html
 */
class DiscourseCollection {
  /**
   * Add a new discourse
   *
   * fix documentation later
   * @return {Promise<HydratedDocument<Discourse>>} - The newly created discourse
   */
  static async addOne(clubs: String[], endDate: Date): Promise<HydratedDocument<Discourse>> {

    const startDate = new Date();
    
    const discourse = new DiscourseModel({startDate, endDate, clubs});
    console.log(discourse)
    await discourse.save(); // Saves discourse to MongoDB
    return discourse;
  }

   /**
   * Find a discourse by discourseId
   *
   * @param {string} discourseId - The id of the discourse to find
   * @return {Promise<HydratedDocument<Discourse>> | Promise<null> } - The freet with the given freetId, if any
   */
    static async findOne(discourseId: Types.ObjectId | string): Promise<HydratedDocument<Discourse>> {
      return DiscourseModel.findOne({_id: discourseId});
  }

  /**
   * Update discourse's information
   *
   * @param {string} discourseId - The discourseId of the club to update
   * @return {Promise<HydratedDocument<Discourse>>} - The updated discourse
   */
  static async updateOne(discourseId: Types.ObjectId | string, endDate: string, clubs: String[]): Promise<HydratedDocument<Discourse>> {

    const discourse = await DiscourseModel.findOne({_id: discourseId});

    if (endDate) {
      discourse.endDate = new Date(endDate);
    }

    if (clubs) {
      discourse.clubs = clubs;
    }

    await discourse.save();
    return discourse;
  }

  /**
   * Delete a discourse from the collection.
   *
   * @param {string} discourseId - The id of discourse to delete
   * @return {Promise<Boolean>} - true if the discourse has been deleted, false otherwise
   */
  static async deleteOne(discourseId: Types.ObjectId | string): Promise<boolean> {
    const discourse = await DiscourseModel.deleteOne({_id: discourseId});
    return discourse !== null;
  }
}

export default DiscourseCollection;
