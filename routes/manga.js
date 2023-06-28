import { Router } from "express";

import Chapter from "../models/Chapter.js";
import Manga from "../models/Manga.js";

const router = Router();

router.get("/", async (req, res) => {
	const manga = await Manga.find();

	res.status(200).json(manga);
});
router.get("/all", async (req, res) => {
	const manga = await Manga.find(
		{},
		{
			title: {
				russianName: 1,
			},
			image: 1,
			typeManga: 1,
			year: 1,
		}
	);

	res.status(200).json(manga);
});
router.get("/:itemId", async (req, res) => {
	const { itemId } = req.params;

	const mangaElement = await Manga.findOne({ _id: itemId });

	res.status(200).json(mangaElement);
});
router.get("/:itemId/chapters", async (req, res) => {
	const { itemId } = req.params;
	const chapters = await Chapter.findOne(
		{ idManga: itemId },
		{
			chapters: {
				chapterImage: 0,
			},
		}
	).populate("idManga");

	res.status(200).json(chapters);
});
router.post("/", async (req, res) => {
	try {
		const { title, status, image, content, typeManga, year } = req.body || {};

		const newManga = new Manga({
			title,
			status,
			image,
			content,
			typeManga,
			year,
		});

		await newManga.save();

		res.status(200).json({ result: "Manga has been added!" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
router.post("/:itemId/chapters", async (req, res) => {
	try {
		const { itemId } = req.params;
		const { chapterNum, chapterImage } = req.body || {};

		const chapters = await Chapter.findOne({ idManga: itemId });
		const date = new Date();
		const createChapter = `${date.getDate()}/${
			date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth()
		}/${date.getFullYear()}`;

		if (chapters === null) {
			const newChapter = new Chapter({
				idManga: itemId,
				chapters: [
					{
						chapterNum,
						chapterImage,
						createChapter,
					},
				],
			});

			await newChapter.save();
		} else {
			chapters.chapters.push({
				chapterNum,
				chapterImage,
				createChapter,
			});
			await chapters.save();
		}

		res.status(200).json({ result: "Chapter has been added!" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

export default router;
