import { Router } from "express";

import Manga from "../models/Manga.js";
import Chapter from "../models/Chapter.js";

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

	const chaptersManga = await Chapter.findOne({ idManga: itemId });

	const mangaElement = await Manga.findOne({ _id: itemId });

	res.render("mangaChapterElement", {
		mangaElement,
		chapters: chaptersManga.chapters,
	});
});
router.get("/manga/:itemId/chapter", async (req, res) => {
	const { itemId } = req.params;
	const { query } = req;

	let page = query.page;
	let c = query.c;
	const mangaElement = await Manga.findOne(
		{ _id: itemId },
		{
			title: {
				russianName: 1,
			},
		}
	);

	const chaptersManga = await Chapter.findOne({
		idManga: itemId,
	});
	const chapter = chaptersManga.chapters.filter(
		(elem) => elem.chapterNum === c
	);

	res.render("mangaChapter", {
		chapter: {
			idManga: itemId,
			title: mangaElement.title.russianName,
			page,
			chapterData: chapter[0],
		},
	});
});
router.get("/catalog", async (req, res) => {
	const { limit, page } = req.query;

	const offset = (page - 1) * limit;

	const manga = await Manga.find(
		{},
		{
			title: {
				russianName: 1,
			},
			image: 1,
			typeManga: 1,
		}
	)
		.limit(limit)
		.skip(offset);

	res.render("catalog", { manga });
});

export default router;
