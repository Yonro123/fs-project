import { Schema, model } from "mongoose";

const mangaSchema = new Schema(
	{
		title: {
			englishName: String,
			russianName: String,
			otherName: {
				type: String,
				default: "",
			},
		},
		status: String,
		image: String,
		content: String,
		typeManga: String,
		year: String,
		chapters: {
			type: [
				{
					chapter: String,
				},
			],
			default: [],
		},
		rating: {
			type: [
				{
					userName: String,
					grade: String,
				},
			],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

export default model("Manga", mangaSchema);
