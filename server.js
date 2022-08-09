const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8081;
const db = require("./src/configs/db.config");
const {
  returnError,
  logErrorMiddleware,
} = require("./src/middlewares/error.middleware");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced DB");
  })
  .catch((error) => {
    console.log("Failed to sync db: ", error.message);
  });

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

// Error Handling should be last middlewate
app.use(logErrorMiddleware);
app.use(returnError);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
