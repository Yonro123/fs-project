import express from "express";
import mongoose from "mongoose";
import path from "path";

import mangaRouter from "./routes/manga.js";
import viewsRouter from "./routes/views.js";
import usersRouter from "./routes/users.js";

const PORT = 8080;
const mongoURL =
	"mongodb+srv://yonro:24081999Yonro@yonro.lab1pb4.mongodb.net/Remanga?retryWrites=true&w=majority";

const app = express();

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
	.connect(mongoURL)
	.then(() => {
		console.log("DB has been connected...");
	})
	.catch((err) => console.log(err));

// Pages
app.use("/", viewsRouter);

// Apies
app.use("/api/manga", mangaRouter);
app.use("/api/users", usersRouter);

app.listen(8080, () => {
	console.log(`Server is running on port: ${PORT}...`);
});
