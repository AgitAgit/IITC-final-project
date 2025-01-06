import express from "express";
import {
  createPage,
  getAllPages,
  getPageById,
  updatePage,
  deletePage,
  getPagesBySiteId,
} from "../controllers/pageController";
import { authenticateUser } from "../riddleware/authMiddleware";

const router = express.Router();

router.post("/createpage", authenticateUser, createPage);

router.get("/site/:siteId", authenticateUser, getPagesBySiteId);

router.get("/getallpages", getAllPages);

router.get("/getpagebyid/:id", authenticateUser, getPageById);

router.put("/updatepage/:id", authenticateUser, updatePage);

router.delete("/deletepage/:id", authenticateUser, deletePage);

export default router;
