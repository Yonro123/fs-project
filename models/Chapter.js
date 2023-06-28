import { Schema, model } from "mongoose";

const chapterSchema = new Schema(
	{
		idManga: { type: Schema.Types.ObjectId, ref: "Manga" },
		chapters: [
			{
				chapterNum: String,
				chapterImage: [String],
				volume: {
					type: String,
					default: 1,
				},
				createChapter: String,
			},
		],
	},
	{
		timestamps: true,
	}
);

export default model("Chapter", chapterSchema);
