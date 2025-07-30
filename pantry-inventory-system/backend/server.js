const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const basicAuth = require("./auth");
const itemsRouter = require("./routes/items");
const usersRouter = require("./routes/users");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Protect all routes with Basic Auth middleware
app.use(basicAuth);

app.use("/api/items", itemsRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});