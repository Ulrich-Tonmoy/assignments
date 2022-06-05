import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config";

import articleRoutes from "./routes/article.js";
import userRoutes from "./routes/user.js";
import typeRoutes from "./routes/type.js";
import authorRoutes from "./routes/author.js";
import tagRoutes from "./routes/tag.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/articles", articleRoutes);
app.use("/user", userRoutes);
app.use("/type", typeRoutes);
app.use("/author", authorRoutes);
app.use("/tag", tagRoutes);

mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () =>
            console.log(`Database connected and Server Running on Port ${PORT}`)
        );
    })
    .catch((error) => console.log(error.message));
