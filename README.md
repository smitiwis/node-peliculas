npm init -y    // crea nuestro package json del inicio
npm i express
node --watch "nombre del archivo"   (modo experimental por node)

Tambien usar nodemon
* npm i nodemon
* Creamos script ==>  "start": "nodemon app",
* Ahora levantamos el proyecto con: npm run start
  

**************************************************
Protocolo HTTP, Por seguridad en prod se usa https
es el mas usado para compartir informacion.


USER ------------------ Request ------------------> SERVIDOR
                      (Peticion)                       |
        url, header, method (GET, POST), body          |
                                                (Procesa info)
                                                       |
                                                       |
USER <----------------- Responde ----------------------|                                            
                        Response
                statusCode, Headers, body


**************************************************
HERRAMIENTAS
* zod           // Para validar datos cuando se obtiene datos como por 
                    ejemplo para crear un usuario los datos debes ser 
                    los necesarios y validos para crearlos
  npm i sod -e

* nodemon       // Instala un observador de cambios
                   tal como el --watch

* npm install nodemon -D   (Se instala como dependencia del  proyecto y 
                            no de forma global, esto ayuda a que cualquiera lo pueda usar 
                            con solo colocar npm i)
  -- >  OJO: NO INSTALAR NODEMON DE FORMA GLOBAL
  en el package.json agregamos un script:  "dev": "nodemon app",




**************************************************

CODIGOS DE ERROR AL HACER UNA PETICIÓN
Buscar en: http.cat para ver detalles de cada status.

* 100-199     -->     Respuestas informativas
* 200-299     -->     Respuestas satisfactorias
* 300-399     -->     Redirecciones
* 400-499     -->     Errores del cliente
* 500-599     -->     Errores del servidor

  Respuestas típicos
* 200     OK
* 301     Moved Permanent
* 400     Bad resquest
* 404     Not found
* 500     Internal server error


**************************************************
Metodos mas usados

* GET
* POST
* DELETE
* PUT
* PATCH

**************************************************
MIDEWARE: Es una funcion que se ejecuta antes de que se haga una consulta a la url
          esto sirve para validar el request de la solicitud.
          * trackear al request a la base de datos 
          * revisar su el usuario tiene las credenciales correctas (cokkies)
          * Nunca olvidar escriir al final del mideware: next()
            por que si no nunca hara la consulta a la url de la api

    ESTRUCTURA DEL MIDEWARE
    
    app.use((req, res, next)=>{
        console.log("Mi primer mideware);
        ----
        Logica de validacion del request
        ----

        next()   // importante no debemos olvidar
    })