import express from "express";
import {
    getAllAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
} from "../controllers/author.js";

import { AdminAccessCheck } from "../middleware/auth.js";

const router = express.Router();

router.post("/", AdminAccessCheck, createAuthor);
router.get("/", getAllAuthors);
router.get("/:id", getAuthor);
router.put("/:id", AdminAccessCheck, updateAuthor);
router.delete("/:id", AdminAccessCheck, deleteAuthor);

export default router;
