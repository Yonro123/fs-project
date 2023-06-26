import { Schema, model } from "mongoose";

const chapterSchema = new Schema(
	{
		idManga: String,
		chapters: [
			{
				chapterName: String,
				chapterImage: [String],
			},
		],
	},
	{
		timestamps: true,
	}
);

export default model("Chapter", chapterSchema);
