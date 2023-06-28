import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		username: String,
		password: String,
		avatar: {
			type: String,
			default:
				"https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png",
		},
	},
	{
		timestamps: true,
	}
);

export default model("User", userSchema);
