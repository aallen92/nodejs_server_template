const firebase = require("firebase-admin");
const { cert } = require("firebase-admin/app");
const serviceAccount = require("./serviceAccountKey.json");

const firebaseAppConfig = {
  credential: cert(serviceAccount),
};

const firebaseApp = firebase.initializeApp(firebaseAppConfig, "firebaseApp");

module.exports = { firebaseApp };
