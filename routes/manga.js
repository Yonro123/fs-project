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
			content: 1,
			typeManga: 1,
			year: 1,
		}
	);

	res.status(200).json(manga);
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
		const { chapterName, chapterImage } = req.body || {};

		const chapters = await Chapter.findOne({ idManga: itemId });
		console.log(chapters);
		if (chapters === null) {
			const newChapter = new Chapter({
				idManga: itemId,
				chapters: [
					{
						chapterName,
						chapterImage,
					},
				],
			});

			await newChapter.save();
		} else {
			chapters.chapters.push({
				chapterName,
				chapterImage,
			});
			await chapters.save();
		}

		res.status(200).json({ result: "Chapter has been added!" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

export default router;
