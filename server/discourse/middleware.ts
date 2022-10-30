import ClubCollection from '../club/collection';
import type {Request, Response, NextFunction} from 'express';
import DiscourseCollection from './collection';


/**
 * Checks if all the clubs in the discourse exist
 */
 const isValidClubs = async (req: Request, res: Response, next: NextFunction) => {

  const allValidClubs = await ClubCollection.getAllClubNames();

  const clubsArray = req.body.clubs.split(',');
  clubsArray.forEach((club: string, index: number) => {
    clubsArray[index] = club.trim();
  });

  // console.log(allValidClubs);
  // console.log(clubsArray);

  if (clubsArray.length < 2) {
    res.status(400).json({
      message: 'You must include at least two clubs in your discourse.'
    });
    return;
  }

  let isInvalid = false;  

  clubsArray.forEach((club: string, index: number) => {
    if (!allValidClubs.includes(club)) {
      isInvalid = true;
      res.status(400).json({
        message: 'One or more of the clubs you entered does not exist.'
      });
      return;
    }
  });

  if (isInvalid) {
    return;
  }
  
  next();
  return;
}

const isValidEndDate = (req: Request, res: Response, next: NextFunction) => {

  const endDate = new Date(req.body.endDate);
  const today = new Date();
  
  if (endDate.getTime() < today.getTime()) {
    res.status(400).json({
      message: 'The end date you entered is in the past.'
    });
    return;
  }

  next();
  return;
}

const hasEditingPermissions = async (req: Request, res: Response, next: NextFunction) => {
  const discourse = await DiscourseCollection.findOne(req.params.discourseId);

  console.log(discourse);
  console.log(req.params)

  discourse.clubs.forEach(async (club: string) => {
    const clubData = await ClubCollection.findOneByClubName(club);
    console.log(clubData);
    
    if (clubData.clubOwner === req.session.userId) {
      next();
      return;
    }
  });

  return res.status(403).json({
    message: 'You do not have permission to edit this discourse.'
  });
}

const discourseExists = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const discourse = await DiscourseCollection.findOne(req.params.discourseId);

    if (!discourse) {
      return res.status(404).json({
        message: 'This discourse does not exist.'
      });
    } 
  }
  catch (error) {
    return res.status(404).json({
      message: 'This discourse does not exist.'
    });
  }

  
  next();
  return;
}


export {
  isValidClubs,
  isValidEndDate,
  hasEditingPermissions,
  discourseExists
}
