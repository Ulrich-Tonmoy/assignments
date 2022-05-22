import express from "express";
import { signin, singup, getAllUsers } from "../controllers/user.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         fullName:
 *           type: string
 *           description: The User name
 *         email:
 *           type: string
 *           description: The User email
 *         password:
 *           type: string
 *           description: The password
 *         token:
 *           type: string
 *           description: The password
 *       example:
 *         fullName: Putin FM
 *         email: putin@gmail.com
 *         password: abcde
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns the list of all the Users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the stations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /user/signin:
 *   post:
 *     summary: user sign in
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.post("/signin", signin);

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
router.post("/signup", singup);

export default router;
