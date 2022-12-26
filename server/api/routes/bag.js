var express = require("express");
var router = express.Router();
const {getFirestore} = require("firebase-admin/firestore");
const db = getFirestore();

router.get("/add", async (req, res) => {
	const {productId, userId} = req.query;
	//userId tokendan gelecek..
	try {

		const [getProductData] = (await db.collection("products").where("productId", "==", Number(productId)).get()).docs;
		if (!getProductData) {
			return res.status(400).send({status: false, errorMessage: "Bad request"});
		}

		db.collection("bag").where("userId", "==", userId).limit(1).get().then((doc) => {
			const productData = getProductData.data();
			const getBagData = doc.docs[0]?.data();
			console.log("getBagData", getBagData)
			if (!getBagData) {
				// Create new bag
				db.collection("bag").doc().set({
					userId: userId,
					products: [productData.productId],
					lastTotalPrice: productData.priceSale,
					totalPrice: productData.priceMarket ?? productData.priceSale,
					quantity: 1,
				}).then(response => {
					return res.json({status: true, message: "Ürün Ekleme Başarılı", response});
				}).catch(error => {
					return res.json({status: false, errorMessage: "Ürün Ekleme Başarısız", error});
				})
			} else {
				// Update bag
				const bagData = doc.docs[0].data();
				const {products, lastTotalPrice, totalPrice} = bagData;
				const newProducts = [...products, productData.productId];
				const newLastTotalPrice = lastTotalPrice + productData.priceSale;
				const newTotalPrice = totalPrice + productData.priceMarket;
				db.collection("bag").doc(doc.docs[0].id).update({
					products: newProducts,
					lastTotalPrice: newLastTotalPrice,
					totalPrice: newTotalPrice,
					quantity: newProducts.length,
				}).then(response => {
					return res.json({status: true, message: "Ürün Ekleme Başarılı", response});
				}).catch(error => {
					return res.json({status: false, errorMessage: "Ürün Ekleme Başarısız", error});
				})
			}
		});

	} catch (e) {
		console.log(e)
		return res.status(500).send({status: false, errorMessage: "Internal server error"});
	}
});

module.exports = router;