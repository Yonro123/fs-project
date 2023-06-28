import { Router } from "express";

import Users from "../models/Users.js";

const router = Router();

router.get("/", async (req, res) => {
	const users = await Users.find();

	res.status(200).json(users);
});
router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body || {};

		if (!username) throw new Error("There is no any username :(");
		if (!password) throw new Error("There is no any password :(");

		const newUser = new Users({ username, password });

		await newUser.save();

		res.status(200).json({ result: "User has been added!" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

export default router;
