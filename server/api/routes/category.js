var express = require("express");
var router = express.Router();

const {getFirestore} = require("firebase-admin/firestore");
const db = getFirestore();

router.post("/add", async (req, res) => {
	const {NAME, DESC} = req.body;
	if (!NAME || !DESC) return res.status(400).send({status: false, errorMessage: "Bad request"});
	try {
		const docRef = db.collection("categorys").doc();
		const getSize = (await db.collection("categorys").get()).size;

		await docRef.set({
			id: Number(getSize + 1),
			name: NAME,
			desc: DESC
		});
		return res.status(200).send({status: true});
	} catch (e) {
		return res.status(500).send({status: false, errorMessage: "Internal server error"});
	}
});

router.get("/getAll", async (req, res) => {
	try {
		const snapshot = await db.collection("categorys").get();
		const data = [];
		snapshot.forEach((doc) => {
			data.push(doc.data());
		});
		return res.status(200).send({status: true, data});
	} catch (e) {
		return res.status(500).send({status: false, errorMessage: "Internal server error"});
	}
});

module.exports = router;
