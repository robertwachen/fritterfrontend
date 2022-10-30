import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ClubCollection from './collection';

/**
 * Checks if a club name in req.body is valid, that is, it matches the clubName regex
 */
const isValidClubName = (req: Request, res: Response, next: NextFunction) => {

  // Accounts for deleting a club, which stores the name in req.params instead of req.body
  const clubName = req.body.name || req.params.name;
  const clubName2 = req.params.name;


  console.log(req.body, req.params);

  console.log('**********')

  console.log(clubName);
  console.log(clubName2);
  
  const clubRegex = /^\w+$/i;
  if (!clubRegex.test(clubName)) {
    res.status(400).json({
      error: {
        name: 'Club name must be a nonempty alphanumeric string.'
      }
    });
    return;
  }

  next();
  return;
}

/**
 * Checks if a club name in req.body already exists (for deleting/modifying)
 */
 const isExistingClubName = async (req: Request, res: Response, next: NextFunction) => {
  const clubName = req.body.name || req.params.name || req.query.clubName;

  const club = await ClubCollection.findOneByClubName(clubName);

  if (!club) {
    res.status(409).json({
      error: {
        club: 'This club does not exist.'
      }
    });
    return;
  }

  next();
  return;
}

/**
 * Checks if a club name in req.body is already in use (for creating)
 */
const isClubNameNotAlreadyInUse = async (req: Request, res: Response, next: NextFunction) => {
  const club = await ClubCollection.findOneByClubName(req.body.name);

  if (!club) {
    next();
    return;
  }

  res.status(409).json({
    error: {
      club: 'A club with this name already exists.'
    }
  });
};

/**
 * Checks if a club has privacy, do later
 */
 const hasClubProps = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.privacy != 'secret' && req.body.privacy != 'private' && req.body.privacy != 'public')
  {
    res.status(400).json({
      error: {
        privacy: 'Club privacy must be either secret, private, or public.'
      }
    });
    return;
  }

  if (req.body.rules === '')
  {
    res.status(400).json({
      error: {
        privacy: 'Club must have rules.'
      }
    });
    return;
  }
  
  next();
  return;
};

const isClubOwner = async (req: Request, res: Response, next: NextFunction) => {

  const clubName = req.body.name || req.params.name;

  const club = await ClubCollection.findOneByClubName(clubName);

  if (club.clubOwner._id == req.session.userId) {
    next();
    return;
  }

  res.status(403).json({
    error: {
      club: 'You are not the owner of this club.'
    }
  });
};


export {
  isValidClubName,
  isClubNameNotAlreadyInUse,
  hasClubProps,
  isExistingClubName,
  isClubOwner,
};
