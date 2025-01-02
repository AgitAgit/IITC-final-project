import express from "express";
import {
  createSite,
  getAllSites,
  getSiteById,
  updateSite,
  deleteSite,
  getSitesByUserId,
} from "../controllers/siteController";
import { authenticateUser } from "../riddleware/authMiddleware";

const router = express.Router();

router.post("/createsite", authenticateUser, createSite);

router.get("/getallsites", getAllSites);

router.get("/getsitebyid/:id", getSiteById);

router.get("/usersites", authenticateUser, getSitesByUserId);

router.delete("/deletesite/:id", authenticateUser, deleteSite);

router.put("/updatesite/:id", authenticateUser, updateSite);

export default router;
