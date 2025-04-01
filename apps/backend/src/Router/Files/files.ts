import express from 'express'
import { addNotes, downvoteNote, getAllNotes, getNotes, upvoteNote } from '../../Controller/Notes';
import { upload } from '../../Middleware/multer';
import { authMiddleware } from '../../Middleware/authmiddleware';
import { addPYP, getPYP, getPYPs } from '../../Controller/PYPs';
import { addPYPSolution, downvotePYPSolution, getPYPsSolution, upvotePYPSolution } from '../../Controller/Solution';


export const filesRouter = express.Router();

filesRouter.get("/getnotes", getAllNotes);
filesRouter.get("/getnote/:notesId", getNotes)
filesRouter.post("/addnotes", upload.single('pdf'), authMiddleware, addNotes);
filesRouter.post("addpyp", upload.single('pdf'), authMiddleware, addPYP);
filesRouter.get("getpyps", getPYPs);
filesRouter.get("getpyp/:PYPId", getPYP);
filesRouter.post("solution/upload:pypId", upload.single('pdf'), authMiddleware, addPYPSolution);
filesRouter.get("/solutions/:pypId", getPYPsSolution);
// filesRouter.post("addsolution", addPYPSolution);
filesRouter.post("upvoteNote/:notesId", authMiddleware, upvoteNote);
filesRouter.post("downvoteNote/:notesId", authMiddleware, downvoteNote);
filesRouter.post("upvotesolution:pypId", authMiddleware, upvotePYPSolution);
filesRouter.post("downvotesolution:pypId", authMiddleware, downvotePYPSolution);
