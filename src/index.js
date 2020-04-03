require('./models/User');
require('./models/Match');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const matchRoutes = require('./routes/matchRoutes');
const requireAuth = require('./middlewares/requireAuth');
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(matchRoutes);

const mongoUri =
  "mongodb+srv://admin:<password>@cluster0-bjoon.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", err => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your login: ${req.user.login}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
