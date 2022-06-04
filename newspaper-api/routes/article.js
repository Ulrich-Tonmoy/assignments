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

router.get("/", EditorAccessCheck, getAllArticles);
router.post("/", EditorAccessCheck, createArticle);
router.get("/:id", EditorAccessCheck, getArticle);
router.patch("/:id", EditorAccessCheck, updateArticle);
router.delete("/:id", EditorAccessCheck, deleteArticle);

export default router;
