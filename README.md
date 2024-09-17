# PROYECTO 4: Reservas Hoteleras_Jimena_Espinoza

## **INTRODUCCION**

## Intro

Este Proyecto representó un desafío bastante grande. El módulo en sí fue desafiante ya que hay mucha información que procesar y entender a través de la práctica y acostumbrarnos a utilizar herramientas como Postman, o Thunder Client para probar el programa que nos encomendaron. Pero ¿por qué este proyecto representó un desafío? Por su complejidad.
En primer lugar, no era sólo una actividad la que debíamos hacer, sino dos:

* 1. Una de ellas es la construcción de una aplicación de servicios para la gestión de reservas hoteleras, que involucren las 4 operaciones CRUD que vimos en clases y
* 2.También realizar otras 6 adicionales, relacionadas con filtros usando Node.js y Express.

El proyecto además debe contar con los siguientes requisitos:
• Utilizar Node.js y Express para el desarrollo del servidor.
• Contar con un archivo .env para las variables de entorno.
• Contar con un archivo .gitignore que incluya las carpetas y archivos que deberán ocultarse para el repositorio.
• Usar una arquitectura de carpetas.
• Y también debe Implementar una serie de filtros por endpoint.

Construcción de la API
Empezar a construir la API no fue sencilla. Tomé como base la arquitectura sugerida, mi API cuenta con lo siguiente:
├─ .env
├─ .gitignore
├─ README.md
├─ controllers
│  └─ bookingControllers.js
├─ package-lock.json
├─ package.json
├─ routes
│  └─ routes.js
└─ server.js

Se me hizo más fácil de entender, crear primero el archivo server.js, donde se configura un servidor usando Express que va a gestionar las reservas a través de /api/reservas y además permite el uso de CORS y carga la configuración del puerto desde un archivo .env.

El archivo bookingController.js contiene toda la información donde se administra una lista de reservas de hotel, incluí unos ejemplos de base y contiene las funciones que permiten hacer un CRUD para crear nuevas reservas, leer todas o una específica, actualizarlas, eliminarlas y filtrarlas por distintos criterios como el nombre del pasajero, fechas o estado. También, cada operación genera una respuesta con éxito o un mensaje de error si algo falla.

El archivo db.json representa una lista de reservas de hotel, donde cada objeto contiene información de un pasajero como su nombre, fechas de estancia, tipo de habitación, número de pasajeros, y el estado del pago. El archivo contiene los mismos ejemplos del archivo bookingController.js, básicamente, es una estructura para manejar y seguir detalles de las reservas de varios clientes que puede servir de referencia más clara en caso de querer acceder a esta información.

Finalmente, en el archivo routes.js se definen las rutas para la API de reservas de hotel utilizando Express.js. El archivo consta de las líneas de código de las rutas principales para crear el CRUD que usaré para crear, obtener, actualizar y eliminar reservas. El archivo usa Swagger para documentar las rutas y esquemas, de la API. Las funciones que declaré en bookingController.js están asociadas a las rutas del Swagger ya que éstas se explican y grafican la lógica detrás de las operaciones. Por ejemplo, POST /api/reservas crea una nueva reserva, y GET /api/reservas/{id} obtiene información de una reserva específica por su ID.

Probando la API
Luego de varios ensayos y errores, logré levantar la API en mi puerto localhost:3000/api-docs

1.Crear una reserva
Antes del último commit tenía todo el programa listo, pero al compararlo con los filtros solicitados, me di cuenta que tenía que cambiar el idioma porque tenía toda mi programación en inglés, siguiendo las sugerencias de los módulos anteriores. Todos los profesores nos han enfatizado en que nos acostumbremos a hacer los códigos en inglés, lo cual es explicable, pero ahora que tenía todo listo para enviarlo a revisión, me di cuenta que tenía que cambiar las líneas de código que se iban a usar en los filtros. Eso provocó que se me rompiera todo el código y tuviera que volver a revisar todo. Aún así, hay algunos filtros que los dejé levemente distintos por temor a que se vuelva a romper el código.

El primero es crear una nueva reserva usando método POST, y con el endpoint (<https://localhost:3000/api-docs/#/reservas/post-api-reservas>)
(./images/crear-reserva.png)

2.Obtener listado de reservas con método GET
También me llevé un susto con este método pero había que volver a ingresar al localhost por un tema de fallo de internet.
(./images/obtener-listado.png)

3.Obtener información de una reserva específica con GET
Este ejercicio me confundió un poco, porque no estaba segura de lo que me estaba pidiendo, tenía la confusión entre el número de reserva y el id.
(./images/obtener-porID.png)

4.Actualizar información de una reserva – PUT
Se actualiza información cambiando el tipo de habitación a “suite familiar”
(./images/actualizar-PUT.png)

5.Eliminar una reserva específica – DELETE
(./images/borrar-DELETE.png)

6.Filtrar reservas por tipo de habitación
Para filtrar por tipo de habitación, usé Thunder Client, lo que me muestra que hay dos reservas para las suites de lujo.
(./images/tipo-habitacion.png)

7.Filtrar reservas por estado
En el caso de este ejercicio, me sale mejor hacerlo por Postman o por Thunder Client, en mi caso, usé este último para filtrar las reservas que se encuentran "pendiente".
(./images/estado-pendiente.png)

8.Filtrar reservas por número de huéspedes
En este caso puse primero en el filtro num_huespedes y me arrojó un mensaje de error, nuevamente por un error de sintaxis. Una vez corregido, pude obtener el filtro solicitado.
(./images/numero-huespedes.png)

## REFLEXIONES

Hay algunos puntos que debo seguir practicando, después de varios intentos logré levantar el servidor, pero me falta más práctica con Postman y con Thunder Client, para poder filtrar por información específica. Considero que me es necesario el tener más práctica en este sentido, aunque eso ya depende de cada uno y de nuestra curiosidad de aprender.
