import express from "express";
import {
  createComponent,
  getComponentsByPage,
  updateComponent,
  deleteComponent,
  getComponentById,
} from "../controllers/componentController";
import { authenticateUser } from "../riddleware/authMiddleware";

const router = express.Router();

router.post("/createcomponent", authenticateUser, createComponent);

router.get(
  "/getcomponentsbypage/:pageId",
  authenticateUser,
  getComponentsByPage
);

router.get("/getcomponentbyid/:id", authenticateUser, getComponentById);

router.put("/updatecomponent/:id", authenticateUser, updateComponent);

router.delete("/deletecomponent/:id", authenticateUser, deleteComponent);

export default router;
