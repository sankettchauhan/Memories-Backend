const express = require("express");
require("dotenv").config();
const { PORT } = require("./config");

const app = express();

require("./startup/db.startup")();
require("./startup/routes.startup")(app);
require("./startup/validation.startup")();
require("./startup/gridfs.startup")(app);
require("./startup/errors.startup")(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
