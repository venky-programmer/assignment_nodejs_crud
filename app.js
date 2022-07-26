import express from "express";
import { join } from "path"
import mysql from 'mysql'
import exphbs from 'express-handlebars'
import dotenv from 'dotenv';
import routes from './routes/customerRoute.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

//Parsing middleware (In order to get access to the post data we have to use body-parser)
//Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//Parse application/json
app.use(express.json()); // Used to parse JSON bodies

//Static Files
app.use(express.static(join(process.cwd(), "public")));

//Set Template engine (EJS/HBS)
app.engine('hbs', exphbs.engine({ extname: '.hbs' }))
app.set("view engine", "hbs");

// Database connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "mysql password",
  database: "db name"
});

//Connect to DB
pool.getConnection((err) => {
  if (err) throw err; //DB not successfully connected
  console.log("Database successfully connected with ID")
})

//route
app.use('/', routes)

//Listening
app.listen(port, (err) => {
  try {
    console.log(`Server listening on http://localhost:${port}`)
  } catch (error) {
    console.log(error)
  }
});