/*
* File for configuring the database connection
* Note: NEEDS TO BE UPDATED BY DOM!!!!!!
* Author: Caroline Curtis and Dom Colangelo
*/

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Database connection error", err));

module.exports = pool;