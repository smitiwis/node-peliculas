import z from 'zod'

const moviesSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required",
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url({
    message: "Poster must be valid URL",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ]),
    {
      required_error: "Movies genre is required",
      invalid_type_error: "Movie genre must be an array of enum Genre",
    }
  ),
});

export function validateMovie(object) {
  return moviesSchema.safeParse(object);
}

export function validatePartialMovie(object) {
  // "PARTIAL()" --> ESTO SIRVE PARA LA ACTUALIZACION DE DATOS
  // SI BIENE EL DATO VALIDALO, SI NO VIENE EL DATO PUES NO HAGAS NADA
  // DE ESTA MANERA TODAS SON OPCIONALES PERO SI ESTAN LAS VALIDA
  return moviesSchema.partial().safeParse(object);
}