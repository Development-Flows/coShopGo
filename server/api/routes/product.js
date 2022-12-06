var express = require("express");
var router = express.Router();

const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
require("dotenv").config();

module.exports = router;
