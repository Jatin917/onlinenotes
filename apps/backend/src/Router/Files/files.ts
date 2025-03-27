import express from 'express'
import { addNotes, downvoteNote, getAllNotes, getNotes, upvoteNote } from '../../Controller/Notes';
import { upload } from '../../Middleware/multer';
import { authMiddleware } from '../../Middleware/authmiddleware';
import { addPYP, getPYP, getPYPs } from '../../Controller/PYPs';


export const filesRouter = express.Router();

filesRouter.get("/getnotes", getAllNotes);
filesRouter.get("/getnote/:notesId", getNotes)
filesRouter.post("/addnotes", upload.single('pdf'), addNotes);
filesRouter.post("addpyp", upload.single('pdf'), addPYP);
filesRouter.get("getpyps", getPYPs);
filesRouter.get("getpyp/:PYPId", getPYP);
// filesRouter.post("solution/upload", addPYPSolution);
// filesRouter.get("/solutions/:pypId", getPYPsSolution);
// filesRouter.post("addsolution", addPYPSolution);
filesRouter.post("upvoteNote/:notesId", upvoteNote);
filesRouter.post("downvoteNote/:notesId", downvoteNote);
filesRouter.post("upvotesolution:pypId", upvotePYPSolution);
filesRouter.post("downvotesolution:pypId", downvotePYPSolution);
