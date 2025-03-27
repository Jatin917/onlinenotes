import express from 'express'
import { getAllNotes, getNotes } from '../../Controller/Notes';


export const filesRouter = express.Router();

filesRouter.get("getnotes", getAllNotes);
filesRouter.get("getnote/:notesId", getNotes)
filesRouter.post("addnotes", authMiddleware, addNotes);
filesRouter.post("addpyp", addPYP);
filesRouter.get("getpyps", getPYPs);
filesRouter.get("getpyp/:id", getPYP);
filesRouter.post("solution/upload", addPYPSolution);
filesRouter.get("/solutions/:pypId", getPYPsSolution);
filesRouter.post("addsolution", addPYPSolution);
filesRouter.post("upvoteNote/:id", upvoteNote);
filesRouter.post("upvotesolution:pypId", upvotePYPSolution);
