var express = require("express");
var router = express.Router();

const {getFirestore} = require("firebase-admin/firestore");
const db = getFirestore();
require("dotenv").config();

router.post("/add", async (req, res) => {
	const {NAME, DESC, PHOTOS, COLORS} = req.body;
	if (!NAME || !DESC || !Array(PHOTOS) || !Array(COLORS)) return res.status(400).send({
		status: false,
		errorMessage: "Bad request"
	});

	try {

		const [firstColor] = COLORS;
		if (!firstColor.hasOwnProperty("modelCode") || !firstColor.hasOwnProperty("variation") || !firstColor.hasOwnProperty("stock") || !firstColor.hasOwnProperty("priceSale")) return res.status(400).send({
			status: false,
			errorMessage: "Bad request"
		});

		const getRandomText = () => {
			let text = "";
			let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			possible = possible.split("");
			for (let i = 0; i < 5; i++) {
				text += possible[Math.floor(Math.random() * possible.length)];
			}
			return text;
		}

		const getRandomTextForModelCode=getRandomText();
		const getSize = (await db.collection("products").get()).size;

		let productColors = [];
		COLORS.map((colorItem, index) => {
			productColors.push({
				productId: Number(getSize + index + 1),
				priceSale: colorItem.priceSale,
				priceMarket: colorItem.priceMarket,
				modelCode: `${colorItem.modelCode}-${getRandomTextForModelCode}`,
				colorName: colorItem.colorName,
				stock: colorItem.stock,
				variation: colorItem.variation
			});
		});

		const docRef = db.collection("products").doc();

		for await (const product of productColors) {
			docRef.set({
				productId: product.productId,
				modelCode: product.modelCode,
				priceSale: product.priceSale,
				priceMarket: product.priceMarket,
				stock: product.stock,
				variation: product.variation,
				colorName: product.colorName,
				photo: PHOTOS,
				name: NAME,
				desc: DESC
			});
		}

		return res.json({status: true});
	} catch (e) {
		return res.status(500).send({status: false, errorMessage: "Internal server error"});
	}

});

router.get("/getProduct", async (req, res) => {
	const {PRODUCT_ID} = req.query;
	if (!PRODUCT_ID) return res.status(400).send({status: false, errorMessage: "Bad request"});

	try {
		const [findProduct] = (await db.collection("products").where("productId", "==", Number(PRODUCT_ID)).get()).docs;
		const getProductAllColors = (await db.collection("products").where("modelCode", "==", findProduct.data().modelCode).get()).docs;
		const allProductsFromColor = [];
		getProductAllColors.map(productColor => {
			allProductsFromColor.push({
				...productColor.data()
			});
		});

		return res.json({status: true, data: {...findProduct.data(), colors: allProductsFromColor}});
	} catch (e) {
		console.log(e);
		return res.status(500).send({status: false, errorMessage: "Internal server error"});
	}
});

router.get("/filterProducts", async (req, res) => {
	const {FILTER} = req.query;
	if (!FILTER) return res.status(400).send({status: false, errorMessage: "Bad request"});

	//check filter type
	if (FILTER === "new") {
	}

	try {
		const getProducts = (await db.collection("products").where("name", "==", FILTER).get()).docs;
		const allProducts = [];
		getProducts.map(product => {
			allProducts.push({
				...product.data()
			});
		});

		return res.json({status: true, data: allProducts});
	} catch (e) {
		console.log(e);
		return res.status(500).send({status: false, errorMessage: "Internal server error"});
	}
});

module.exports = router;
