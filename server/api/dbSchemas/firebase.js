const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

const Users = db.collection("users").doc("ouWzSzisxybDWFUtZliX");

module.exports = { Users };