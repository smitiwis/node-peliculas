import express, { json } from "express";
import moviesRouter from './router/movies.js'
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();
app.use(json()); // CON ESTE MIDEWARE PODEMOS ESCUCHAR EL BODY DE LAS PETICIONES
app.use(corsMiddleware())
app.disable("x-powered-by");

app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Corriendo en http://localhost:${PORT}`);
});

