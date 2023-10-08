import express, { json } from "express";
import { randomUUID } from "node:crypto";
import cors from 'cors';
import { validateMovie, validatePartialMovie } from "./schemas/movies.js";
import { readJSON } from "./utils/readJson.js";

// Leer archivos JSON en EsModules --> FORMA 1
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json'));

// Mejor forma de leer archivos JSON --> FORMA 2
const movies = readJSON('./movies.json')

const app = express();
app.disable("x-powered-by");

// CON ESTE MIDEWARE PODEMOS ESCUCHAR EL BODY DE LAS PETICIONES
app.use(json());
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      "http://localhost:8080",
      "http://localhost:1234",
      "http://movies.com",
    ]

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'));
  }
}))


const PORT = process.env.PORT ?? 1234;

app.get("/", (req, res) => {
  res.json({
    mensaje: "Hola mundo",
  });
});

// OBTENER TODAS LAS PELICULAS
// OBTENER PELICULAS POR EL GENERO
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

// OBTENER UNA PELICULA POR EL ID
app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  return res.status(404).json({
    mensaje: "La pelicula no existe!",
  });
});

// CREAR UNA PELICULA
app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: JSON.parse(result.error.message),
    });
  }

  const newMovie = {
    id: randomUUID(),
    // nunca mandar req.body --> no sabemos que nos peude enviar el cliente
    // result.data  --> La data ya esta validada por "ZOD"
    ...result.data,
  };

  movies.push(newMovie);
  return res.json(newMovie);
});

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body);

  // VALIDAR LOS DATOS QUE SE RECIBEN DE FRONT
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  // BUSCAR PELICULA POR EL ID
  const { id } = req.params;
  const findMovieIndex = movies.findIndex((movie) => movie.id === id);
  if (findMovieIndex < 0) {
    return res.status(404).json({ message: "Movie not found" });
  }

  // ACTUALIZAR LA PELICULA
  const movieUpdate = {
    ...movies[findMovieIndex],
    ...result.data,
  };
  movies[findMovieIndex] = movieUpdate;

  return res.status(200).json(movieUpdate);
});

app.listen(PORT, () => {
  console.log(`Corriendo en http://localhost:${PORT}`);
});
