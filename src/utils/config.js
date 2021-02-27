const dotenv = require("dotenv").config();

const port = process.env.PORT;
let databaseName = "QuickThinkProd";

if (process.env.NODE_ENV === "dev") {
	databaseName = "QuickThinkDev";
}

const mongoDBUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fso.rth9w.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
	port,
	mongoDBUrl,
	jwtSecret
};