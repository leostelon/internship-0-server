const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const http = require("http").createServer(app);

// Routes
const card = require("./routes/card");

// Database
require("./database/mongoose");

// Bootstrap models
const models = path.join(__dirname, "models");
fs.readdirSync(models)
	.filter((file) => ~file.search(/^[^.].*\.js$/))
	.forEach((file) => require(path.join(models, file)));

// Public Directory
const cdnDirectoryPath = path.join(__dirname, "../cdn");
app.use(express.static(cdnDirectoryPath));
// Static Directpry
const assetsDirectoryPath = path.join(__dirname, "./assets");
app.use(express.static(assetsDirectoryPath));

// CORS
app.use(function (req, res, next) {
	var allowedDomains = ["https://admin.cronmarket.com","https://chat.cronmarket.com","http://localhost:3000"];
	var origin = req.headers.origin;
    res.setHeader("Access-Control-Allow-Origin", "*");
	// if (allowedDomains.indexOf(origin) > -1) {
	// }
	res.header(
		"Access-Control-Allow-Methods",
		" GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	next();
});
app.use(express.json());

// Card Route
app.use(card);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.get("/test", (req, res) => {
	res.send({ message: "Server OK." });
});

app.use("*", (req, res) => {
	res.status(404).send({ message: "Invalid API route!" });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
	console.log("Server running on port " + port);
});
