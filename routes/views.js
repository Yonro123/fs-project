import { Router } from "express";

import Manga from "../models/Manga.js";

const router = Router();

router.get("/", (req, res) => {
	res.render("home");
});
router.get("/manga/:itemId", async (req, res) => {
	const { itemId } = req.params;

	const mangaElement = await Manga.findOne({ _id: itemId });

	res.render("mangaElement", { mangaElement });
});
router.get("/manga/:itemId/chapters", async (req, res) => {
	const { itemId } = req.params;

	const mangaElement = await Manga.findOne({ _id: itemId });

	res.render("mangaChapterElement", { mangaElement });
});
router.get("/catalog", (req, res) => {
	res.render("catalog");
});

export default router;
