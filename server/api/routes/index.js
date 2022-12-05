var express = require("express");
var router = express.Router();
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
const { SignJWT } = require("jose");
require("dotenv").config();
const { v4 } = require("uuid");

router.post("/login", async function(req, res, next) {
  const { MAIL, PASSWORD } = req.body;
  try {
    if (!MAIL || !PASSWORD) return res.status(400).send({ status: false, errorMessage: "Bad request" });
    const [checkUser] = (await db.collection("user").limit(1).where("mail", "==", MAIL).where("password", "==", PASSWORD).get()).docs;
    if (checkUser) {
      const token = await new SignJWT({
        name: checkUser.name,
        favorite: checkUser.favoriteProducts,
        lastName: checkUser.lastName,
        mail: checkUser.mail,
        userId: checkUser.userId
      }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("24h").sign(new TextEncoder().encode(process.env.JWT_KEY));
      return res.json({ status: true, data: { ...checkUser.data(), token } });
    }
    return res.json({ status: true, data: null });
  } catch (e) {
    return res.status(500).send({ status: false, errorMessage: "Internal server error" });
  }
});

router.get("/register", async (req, res) => {
  const { NAME, LASTNAME, MAIL, PASSWORD } = req.query;
  try {
    const [checkUser] = (await db.collection("user").limit(1).where("mail", "==", MAIL).get()).docs;
    if (checkUser) return res.json({ status: false, errorMessage: "E-mail address already exists" });
    const randomDocId = v4();
    const docRef = await db.collection("user").doc(randomDocId);

    const token = await new SignJWT({
      name: NAME,
      favorite: [],
      lastName: LASTNAME,
      mail: MAIL,
      password: PASSWORD,
      userId: randomDocId
    }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("24h").sign(new TextEncoder().encode(process.env.JWT_KEY));

    await docRef.set({
      name: NAME,
      favorite: [],
      lastName: LASTNAME,
      mail: MAIL,
      userId: randomDocId
    });
    return res.json({ status: true, data: token });

  } catch (e) {
    return res.status(500).send({ status: false, errorMessage: "Internal server error" });
  }
});

module.exports = router;
