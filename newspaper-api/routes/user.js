import express from "express";
import {
    signin,
    singup,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/user.js";

import { AdminAccessCheck } from "./../middleware/auth.js";
import activeEditorCheck from "./../middleware/activeEditorCheck.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", AdminAccessCheck, activeEditorCheck, singup);
router.get("/", AdminAccessCheck, getAllUsers);
router.get("/:id", AdminAccessCheck, getUser);
router.put("/:id", AdminAccessCheck, activeEditorCheck, updateUser);
router.delete("/:id", AdminAccessCheck, deleteUser);

export default router;
