import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config";

import stationRoutes from "./routes/stations.js";
import userRoutes from "./routes/users.js";
import swaggerDocs from "./utils/swagger.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/stations", stationRoutes);
app.use("/user", userRoutes);

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () =>
            console.log(`Database connected and Server Running on Port ${PORT}`)
        );
        swaggerDocs(app);
    })
    .catch((error) => console.log(error.message));
