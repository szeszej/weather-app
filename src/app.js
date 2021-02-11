const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const app = express();
const port = process.env.PORT || 5000;

//Path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Handlebars setup
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "szeszej",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "szeszej",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Halp!",
    message: "You ain't getting no help here!",
    name: "szeszej",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address!" });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          address: req.query.address,
          location,
          forecast,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error!",
    message: "Help article not found!",
    name: "szeszej",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error!",
    message: "Page not found!",
    name: "szeszej",
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port} !`);
});
