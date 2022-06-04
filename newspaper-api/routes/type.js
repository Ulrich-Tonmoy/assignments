import express from "express";
import { getAllTypes, getType, createType, updateType, deleteType } from "../controllers/type.js";

import { AdminAccessCheck } from "./../middleware/auth.js";

const router = express.Router();

router.post("/", AdminAccessCheck, createType);
router.get("/", getAllTypes);
router.get("/:id", getType);
router.put("/:id", AdminAccessCheck, updateType);
router.delete("/:id", AdminAccessCheck, deleteType);

export default router;
