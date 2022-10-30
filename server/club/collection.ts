import type {HydratedDocument, Types} from 'mongoose';
import type {Club} from './model';
import ClubModel from './model';

/**
 * This file contains a class with functionality to interact with clubs stored
 * in MongoDB, including adding, finding, updating, and deleting. Feel free to add
 * additional operations in this file.
 *
 * Note: HydratedDocument<Club> is the output of the ClubModel() constructor,
 * and contains all the information in Club. https://mongoosejs.com/docs/typescript.html
 */
class ClubCollection {
  /**
   * Add a new club
   *
   * fix documentation later
   * @return {Promise<HydratedDocument<Club>>} - The newly created club
   */
  static async addOne(clubOwner: Types.ObjectId | string, name: string, privacy: string): Promise<HydratedDocument<Club>> {
    const clubRules = 'No rules yet';
    const members = [clubOwner];
    const pendingMembers: Types.ObjectId[] = [];
    const dateCreated = new Date();
    
    const club = new ClubModel({name, privacy, clubRules, members, pendingMembers, dateCreated, clubOwner});
    await club.save(); // Saves club to MongoDB
    return club;
  }

  /**
   * Find a club by name.
   *
   * @param {string} name - The name of the club to find
   * @return {Promise<HydratedDocument<Club>> | Promise<null>} - The club with the given club, if any
   */
   static async findOneByClubName(name: string): Promise<HydratedDocument<Club>> {
    return ClubModel.findOne({name: new RegExp(`^${name.trim()}$`, 'i')});
  }

  /**
   * Update club's information
   *
   * @param {string} clubId - The clubId of the club to update
   * @param {Object} clubDetails - An object with the club's updated credentials
   * @return {Promise<HydratedDocument<Club>>} - The updated club
   */
  static async updateOne(name: string, clubDetails: any): Promise<HydratedDocument<Club>> {

    // Note: you can't update a club's name
    const club = await ClubCollection.findOneByClubName(name);

    // At this point we have checked that the club privacy is valid
    if (clubDetails.privacy) {
      club.privacy = clubDetails.privacy as string;
    }

    if (clubDetails.rules) {
      club.clubRules = clubDetails.rules as string;
    }

    if (clubDetails.members) {
      club.members = clubDetails.members as Array<Types.ObjectId>;
    }

    if (clubDetails.pendingMembers) {
      club.pendingMembers = clubDetails.pendingMembers as Array<Types.ObjectId>;
    }

    if (clubDetails.dateCreated) {
      club.dateCreated = clubDetails.dateCreated as Date;
    }


    await club.save();
    return club;
  }

  /**
   * Delete a club from the collection.
   *
   * @param {string} name - The name of club to delete
   * @return {Promise<Boolean>} - true if the club has been deleted, false otherwise
   */
  static async deleteOne(name: string): Promise<boolean> {
    const clubId = await ClubCollection.findOneByClubName(name);
    console.log('clubId: ', clubId);
    const club = await ClubModel.deleteOne({_id: clubId});
    return club !== null;
  }

  static async getAllClubNames(): Promise<Array<string>> {
    const clubs = await ClubModel.find();
    const clubNames: Array<string> = [];
    clubs.forEach((club) => {
      clubNames.push(club.name);
    });
    return clubNames;
  }

}

export default ClubCollection;
