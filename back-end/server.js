const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = require("./app");

const db = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(db).then((_) => console.log("DB connected successfully"));

const port = process.env.PORT || 4545;
app.listen(port, () => {
  console.log("App is running on port " + port);
});
