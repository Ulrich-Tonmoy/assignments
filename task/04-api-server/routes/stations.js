import express from "express";

import {
    getStations,
    createStation,
    updateStation,
    deleteStation,
} from "../controllers/station.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Station:
 *       type: object
 *       required:
 *         - title
 *         - frequency
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id
 *         title:
 *           type: string
 *           description: The Station name
 *         frequency:
 *           type: string
 *           description: The frequency of the station
 *       example:
 *         title: Putin FM
 *         frequency: 68,8
 */

/**
 * @swagger
 * tags:
 *   name: Radio Stations
 *   description: The Radio Stations managing API
 */

/**
 * @swagger
 * /stations:
 *   get:
 *     summary: Returns the list of all the stations
 *     tags: [Radio Stations]
 *     responses:
 *       200:
 *         description: The list of the stations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Station'
 */
router.get("/", getStations);

/**
 * @swagger
 * /stations:
 *   post:
 *     summary: Create a new station
 *     tags: [Radio Stations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Station'
 *     responses:
 *       200:
 *         description: The Station was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       500:
 *         description: Server error
 */
router.post("/", createStation);

/**
 * @swagger
 * /stations/{id}:
 *  patch:
 *    summary: Update the Station by the id
 *    tags: [Radio Stations]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          example: 628a91563bcf99610f3df296
 *        required: true
 *        description: The station id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Station'
 *    responses:
 *      200:
 *        description: The Station was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Station'
 *      404:
 *        description: The Station was not found
 *      500:
 *        description: Some error happened
 */
router.patch("/:id", updateStation);

/**
 * @swagger
 * /stations/{id}:
 *   delete:
 *     summary: Remove the Station by id
 *     tags: [Radio Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 628a91563bcf99610f3df296
 *         required: true
 *         description: The Station id
 *     responses:
 *       200:
 *         description: The Station was deleted
 *       404:
 *         description: The Station was not found
 */
router.delete("/:id", deleteStation);

export default router;
