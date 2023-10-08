npm init -y // crea nuestro package json del inicio
npm i express
node --watch "nombre del archivo" (modo experimental por node)

Tambien usar nodemon

- npm i nodemon
- Creamos script ==> "start": "nodemon app",
- Ahora levantamos el proyecto con: npm run start

---

Protocolo HTTP, Por seguridad en prod se usa https
es el mas usado para compartir informacion.

USER ------------------ Request ------------------> SERVIDOR
                      (Peticion)                        |
           url, header, method (GET, POST), body        |
                      (Procesa info)                    |
                                                        |
USER <----------------- Responde -----------------------|  
                        Response
                  statusCode, Headers, body

---

HERRAMIENTAS

- zod // Para validar datos cuando se obtiene datos como por
  ejemplo para crear un usuario los datos debes ser
  los necesarios y validos para crearlos
  npm i zod -E // Para instalar una version exacta y no con el '^'

- nodemon // Instala un observador de cambios
  tal como el --watch

- npm install nodemon -D (Se instala como dependencia del proyecto y
  no de forma global, esto ayuda a que cualquiera lo pueda usar
  con solo colocar npm i)
  -- > OJO: NO INSTALAR NODEMON DE FORMA GLOBAL y PARA QUE FUNCIONE
  en el package.json agregamos un script: "dev": "nodemon app",

---

CODIGOS DE ERROR AL HACER UNA PETICIÓN
Buscar en: http.cat para ver detalles de cada status.

- 100-199 --> Respuestas informativas
- 200-299 --> Respuestas satisfactorias
- 300-399 --> Redirecciones
- 400-499 --> Errores del cliente
- 500-599 --> Errores del servidor

  Respuestas típicos

- 200 OK
- 301 Moved Permanent
- 400 Bad resquest
- 404 Not found
- 500 Internal server error

---

Metodos mas usados

- GET
- POST
- DELETE
- PUT
- PATCH

---

- Diferencia POST, PUT, PATCH
  Tener en cuenta la IDEMPOTENCIA: Propiedad de realizar una accion determinada
  varias veces y aun asi conseguir siempre el mismo resultado que se obtendria al
  hacerlo una vez.
  EJEMEPLO:

  1. Funciones puras --> una funciones de retorna 2 + 2 (Sea las veces q las llames siempre regresa 4)

  POST (/movies) --> Crear un nuevo elemento/recurso en el servidor.
  No es idenpotente
  Por que siemprecreas un nuevo recurso

  PUT (/movies/:id) --> Actualizar "totalmente" un elemento ya existente o lo crea si no existe.
  Si es idenpotente
  Por que el resultado siempre será el mismo.

  PATCH (/movies/:id) --> Actualizar "parcialmente" o recurso.
  Normalmente si lo podria ser, pero depende

  OJO: (Aun que en el POST tu envies los mismos datos siempre te va crear un nuevo recurso)

---

MIDEWARE: Es una funcion que se ejecuta antes de que se haga una consulta a la url
esto sirve para validar el request de la solicitud.
_ trackear al request a la base de datos
_ revisar su el usuario tiene las credenciales correctas (cokkies) \* Nunca olvidar escriir al final del mideware: next()
por que si no nunca hara la consulta a la url de la api

    ESTRUCTURA DEL MIDEWARE
    app.use((req, res, next)=>{
        console.log("Mi primer mideware);
        ----
        Logica de validacion del request
        ----
        next()   // importante no debemos olvidar
    })

---

REST API : Es una arquitectura de softwarre
PRINCIPIOS  
 _ Escalabilidad  
 _ Simplicidad  
 _ Visibilidad  
 _ Facil de modificar  
 _ Fiabilidad  
 _ Portabilidad

FUNDAMENTOS

- Resource --> En rest todo es un recurso, y cada recurso se identifica con una URL
- Verbos HTTP --> Son para definir las operaciones que se pueden realizar con los recursos GET, POST, DELETE, etc
- Representaciones --> El cliente deberia poder deficir la representacion de los recursos JSON, XML, HTML, etc
- Stateless --> El cliente debe enviar todas la informacion necesaria para procesar la request
_ Interfast uniforme -->
_ Separacion de conceptos --> Permite que el cliente y servidor evolucionen de forma esparada
  El cliente debe enviar todas la informacion necesaria para procesar
  la request

---

PARA VALIDACIONES DEL REQUEST ES MEJOR CREAR UN ESQUEMA

---
PROBLEMAS CON COORDS
  Problemas con coord aparece por que el servidor no 
  reconoce el dominio de quien le colicita o consulta la informacion
  una forma  no muy convencional de hacerlo es la siguiente

  app.get("/movies", (req, res) => {
    <!-- CON LA LINEA SIGUIENTE, Todo dominio puede usar nuestra API -->
   res.header('Access-Control-Alow-Origin', '*')
   <!-- Enves de un '*' : Podemos colocar un dominio  -->
   <!-- http://localhost:8080 -->

   <!-- FORMA ESTANDAR -->

  const ACCEPTED_ORIGINS = [
    "http://localhost:8080",  
    "http://localhost:1234",
    "http://movies.com",
  ]

<!-- ojo: Solo se recibe la header('origin') ,  si la peticion  -->
<!-- es diferente al del servidor -->
  const origin = req.header('origin');
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
    }
  })

Metodos normales:   GET / HEAD / POST
Metodos complejos:  PUT / PATCH / DELETE  --> Se necesita que acepte con Metodth OPTIONS
CORDS Pre-flight
//OPTIONS
Se hace de la siguiente manera
app.options('/movies:/id', ()=>{
  const origin = req.header('origin');
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    }
  res.send(200);
})
********************************************************
AHORA SOLUCIONEMOS COORDS CON LA AYUDA DE UNA LIBRERIA
********************************************************
const cords = require('cors');
app.use(cords());         -->  si lo dejamos asi es como si fuera para todo un '*'


<!-- FORMA PRACTICA DE CORREGIR PROBLEMAS DE CORS -->
app.use(cords({
  origin:(origin, callback) => {
    const ACCEPTED_ORIGINS = [
      "http://localhost:8080",  
      "http://localhost:1234",
      "http://movies.com",
    ] 
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'));
  }
}))
