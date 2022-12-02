var express = require("express");
var router = express.Router();
const { Users } = require("../dbSchemas/firebase");
const admin = require("firebase-admin");

router.get("/getAllUser", async function(req, res, next) {
  try {

    const checkresult = (await Users.get()).data();

    return res.json({ status: true, data: checkresult });
  } catch (e) {
    return res.status(500).send({ status: false, errorMessage: "Server Internal Error" });
  }
});

router.post("/setUser", async function(req, res, next) {
  try {
    const { NAME, LASTNAME, MAIL, PASSWORD, FAVORITES } = req.body;

    if (!NAME || !LASTNAME || !MAIL || !PASSWORD) return res.status(400).send({
      status: false,
      errorMessage: "Bad request"
    });

    if (FAVORITES && !FAVORITES.length) return res.status(400).send({ status: false, errorMessage: "Bad request" });

    const checkresult = await Users.update({
      users: admin.firestore.FieldValue.arrayUnion({
        favoriteProducts: FAVORITES,
        lastName: LASTNAME,
        name: NAME,
        mail: MAIL,
        password: PASSWORD,
        userId: Math.random().toFixed(4)
      })
    });

    return res.json({ status: true, data: checkresult });
  } catch (e) {
    return res.status(500).send({ status: false, errorMessage: "Server Internal Error" });
  }
});


module.exports = router;
