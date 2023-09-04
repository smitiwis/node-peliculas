const express = require("express");
const crypto = require("node:crypto");
const movies = require("./movies.json");
const { validateMovie } = require("./schemas/movies");

const app = express();
app.disable("x-powered-by");
app.use(express.json());
const PORT = process.env.PORT ?? 1234;

app.get("/", (req, res) => {
  res.json({
    mensaje: "Hola mundo",
  });
});

// Todos los recusos que sean MOVIES se identifican con /movies
app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredToGenre = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredToGenre);
  }

  return res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  return res.status(404).json({
    mensaje: "La pelicula no existe!",
  });
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    return res.status(400).json({
      error: JSON.parse(result.error.message),
    });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);

  return res.json(newMovie);
});

app.listen(PORT, () => {
  console.log(`Corriendo en http://localhost:${PORT}`);
});
