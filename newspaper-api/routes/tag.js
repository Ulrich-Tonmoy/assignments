import express from "express";
import { getAllTags, getTag, createTag, updateTag, deleteTag } from "../controllers/tag.js";

import { AdminAccessCheck } from "../middleware/auth.js";

const router = express.Router();

router.post("/", AdminAccessCheck, createTag);
router.get("/", getAllTags);
router.get("/:id", getTag);
router.put("/:id", AdminAccessCheck, updateTag);
router.delete("/:id", AdminAccessCheck, deleteTag);

export default router;
