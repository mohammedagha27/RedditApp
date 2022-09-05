const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || app.get("port");

app.listen(port, () =>
  console.log(`app listening on http://localhost:${port}`)
);
