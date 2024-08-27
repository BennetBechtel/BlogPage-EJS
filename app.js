const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

// connect to mongodb
const dbURI =
  "mongodb_connection_string";
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(5000, function () {
      console.log(`Connected to db / Server listening on localhost:5000`);
    })
  )
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes)

// 404 page
app.use((req, res) => {
  res.render("404", { title: "404" });
});
