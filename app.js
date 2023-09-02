const express = require("express");
const app = express();
app.disable('x-powered-by')
const pokemons = require('./pokemon.json');

const PORT = process.env.PORT ?? 1234;


app.get("/", (req, res) => {
  res.json(pokemons);
});

app.post("/pokemon", (req, res)=>{
  let body = '';

  // Se escuchae el evento data:
})

app.listen(PORT, () => {
  console.log(`Corriendo en http://localhost:${PORT}`);
});
