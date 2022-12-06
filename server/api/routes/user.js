const express = require("express");
const router = express.Router();
const { Users, admin } = require("../dbSchemas/firebase");

router.post("/createUser", async function(req, res) {
  const { NAME, LASTNAME, MAIL, PASSWORD, FAVORITES } = req.body;
  if (!NAME || !LASTNAME || !MAIL || !PASSWORD) return res.status(400).send({
    status: false,
    errorMessage: "Bad request"
  });

  try {
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
    return res.status(500).send({ status: false, errorMessage: "Internal server error" });
  }

});

module.exports = router;
