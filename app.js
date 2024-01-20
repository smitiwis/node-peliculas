import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import moviesRouter from './router/movies.js'
import dotaRouter from "./router/dota.js";
import steamRouter from "./router/steam.js";

const app = express();
app.use(json()); // CON ESTE MIDEWARE PODEMOS ESCUCHAR EL BODY DE LAS PETICIONES
app.use(corsMiddleware())
app.disable("x-powered-by");

app.use('/movies', moviesRouter);
app.use('/dota', dotaRouter);
app.use('/steam', steamRouter)

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Corriendo en http://localhost:${PORT}`);
});

