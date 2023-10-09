import { readJSON } from "../utils/readJson.js";
import { randomUUID } from "node:crypto";
const movies = readJSON("../utils/movies.json");

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter(
        (movie) => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  }

  static async getById({ id }) {
    return movies.find((movie) => movie.id === id);
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input,
    };

    movies.push(newMovie);
    return newMovie;
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex < 0) return false;

    movies.splice(movieIndex, 1);
    return true
  }

  static async update({id, input}){
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex < 0) return false
  
    // ACTUALIZAR LA PELICULA
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input,
    }

    return movies[movieIndex];
  }
}