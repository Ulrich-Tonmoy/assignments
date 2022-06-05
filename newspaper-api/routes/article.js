import express from "express";

import {
    getArticle,
    getAllArticles,
    createArticle,
    updateArticle,
    deleteArticle,
} from "../controllers/article.js";
import { EditorAccessCheck } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllArticles);
router.post("/", EditorAccessCheck, createArticle);
router.get("/:id", getArticle);
router.put("/:id", EditorAccessCheck, updateArticle);
router.delete("/:id", EditorAccessCheck, deleteArticle);

export default router;
