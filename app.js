const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 1234;
const movies = require("./movies.json");

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({
    mensaje: "Hola mundo",
  });
});

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.listen(PORT, () => {
  console.log(`Corriendo en http://localhost:${PORT}`);
});
