const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
// const fetch = require("node-fetch");

app.use(express.static("public"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
