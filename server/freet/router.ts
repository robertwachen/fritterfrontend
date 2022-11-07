import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import FreetCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as clubValidator from '../club/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all the freets
 *
 * @name GET /api/freets
 *
 * @return {FreetResponse[]} - A list of all the freets sorted in descending
 *                      order by date modified
 */
/**
 * Get freets by author.
 *
 * @name GET /api/freets?author=handle&clubName=clubName
 *
 * @return {FreetResponse[]} - An array of freets created by user with name, name
 * @throws {400} - If name is not given
 * @throws {404} - If no user has given name
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {

    console.log('******')
    console.log(req.query)

    // THIS CASE HAS NO FILTERS

    // Check if any filters are applied
    if (req.query.clubName !== undefined || req.query.author !== undefined) {
      next();
      return;
    }

    const allFreets = await FreetCollection.findAll();
    const response = allFreets.map(util.constructFreetResponse);
    const publicFreets = response.filter(freet => freet.clubId === '' || freet.clubId === null);
    res.status(200).json(publicFreets);
  },
  [
    userValidator.isAuthorExists
  ],
  async (req: Request, res: Response, next: NextFunction) => {

    // THIS CASE HAS AN AUTHOR FILTER BUT NO CLUB FILTER

    // Check if any filters are applied
    if (req.query.clubName !== undefined) {
      next();
      return;
    }

    const authorFreets = await FreetCollection.findAllByUsername(req.query.author as string);
    const response = authorFreets.map(util.constructFreetResponse);
    res.status(200).json(response);
  },
  [
    userValidator.isUserLoggedIn,
    clubValidator.isExistingClubName,
    userValidator.isUserInClub
  ],
  async (req: Request, res: Response, next: NextFunction) => {

    // THIS CASE HAS A CLUB FILTER BUT NO AUTHOR FILTER

    // Check if authorId query parameter was supplied
    if (req.query.author !== undefined) {
      next();
      return;
    }

    const clubFreets = await FreetCollection.findAllByClubName(req.query.clubName as string);
    const response = clubFreets.map(util.constructFreetResponse);
    res.status(200).json(response);
  },
  [
    userValidator.isAuthorExists,
    userValidator.isUserLoggedIn,
    clubValidator.isExistingClubName,
    userValidator.isUserInClub
  ],
  async (req: Request, res: Response, next: NextFunction) => {

    // THIS CASE HAS A CLUB FILTER AND A AUTHOR FILTER

    const clubFreets = await FreetCollection.findAllByClubName(req.query.clubName as string);
    const authorFreets = await FreetCollection.findAllByUsername(req.query.author as string);

    const clubAuthorFreets = clubFreets.filter((freet) => authorFreets.includes(freet));
    const response = clubAuthorFreets.map(util.constructFreetResponse);
    res.status(200).json(response);
  },
);

/**
 * Create a new freet.
 *
 * @name POST /api/freets
 *
 * @param {string} content - The content of the freet
 * @return {FreetResponse} - The created freet
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    userValidator.isUserInClub,
    freetValidator.isValidFreetContent,
  ],
  async (req: Request, res: Response) => {
    console.log(req.body);
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const freet = await FreetCollection.addOne(userId, req.body.content, req.body.clubName);

    res.status(201).json({
      message: 'Your freet was created successfully.',
      freet: util.constructFreetResponse(freet)
    });
  }
);

/**
 * Delete a freet
 *
 * @name DELETE /api/freets/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the freet
 * @throws {404} - If the freetId is not valid
 */
router.delete(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    freetValidator.isValidFreetModifier
  ],
  async (req: Request, res: Response) => {
    await FreetCollection.deleteOne(req.params.freetId);
    res.status(200).json({
      message: 'Your freet was deleted successfully.'
    });
  }
);

/**
 * Modify a freet
 *
 * @name PATCH /api/freets/:id
 *
 * @param {string} content - the new content for the freet
 * @return {FreetResponse} - the updated freet
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freet
 * @throws {404} - If the freetId is not valid
 * @throws {400} - If the freet content is empty or a stream of empty spaces
 * @throws {413} - If the freet content is more than 140 characters long
 */
router.patch(
  '/:freetId?',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists,
    freetValidator.isValidFreetModifier,
    freetValidator.isValidFreetContent
  ],
  async (req: Request, res: Response) => {
    const freet = await FreetCollection.updateOne(req.params.freetId, req.body.content);
    res.status(200).json({
      message: 'Your freet was updated successfully.',
      freet: util.constructFreetResponse(freet)
    });
  }
);

export {router as freetRouter};
