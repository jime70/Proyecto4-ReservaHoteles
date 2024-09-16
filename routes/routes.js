const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController.js");

/**
 * @swagger
 * components:
 *  schemas:
 *    reservas:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The booking's unique identifier
 *        nombre_pasajero:
 *          type: string
 *          description: The name of the passenger who made the booking
 *        hotel:
 *          type: string
 *          description: The hotel's name
 *        fecha_inicio:
 *          type: string
 *          description: The date of the passenger's arrival
 *        fecha_fin:
 *          type: string
 *          description: The date of the passenger's departure
 *        tipo_habitacion:
 *          type: string
 *          description: The type of room asked for
 *        num_huespedes:
 *          type: number
 *          description: The total number of passengers
 *        mail:
 *          type: string
 *          description: The mail of the passenger who made the booking
 *        num_reserva:
 *          type: number
 *          description: The booking's number
 *        estado:
 *          type: string
 *          description: The current status of the booking.
 *        pago:
 *          type: string
 *          description: The current status of the payment.
 *      required:
 *        - nombre_pasajero
 *        - hotel
 *        - fecha_inicio
 *        - fecha_fin
 *        - tipo_habitacion
 *        - num_huespedes
 *        - mail
 *        - num_reserva
 *        - estado
 *        - pago
 *      example:
 *  nombre_pasajero: Nikko Bran
 *  hotel: Hotel Pararaiso
 *  fecha_inicio: 23 diciembre, 2023
 *  fecha_fin: 26 diciembre, 2023
 *  tipo_habitacion: suite
 *  num_huespedes: 2
 *  mail: nikko.b@gmail.com
 *  num_reserva: 34627
 *  estado: reservado
 *  pago: pagado
 */

// a. Crear reseva
/**
 * @swagger
 * /api/reservas:
 *  post:
 *    summary: Create a new booking
 *    tags: [reservas]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/reservas'
 *    responses:
 *      201:
 *        description: booking created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/booking'
 */
router.post("/", bookingController.create);

// b. Obtener la lista de reservas
/**
 * @swagger
 * /api/reservas:
 *  get:
 *    summary: Get a list of all reservas
 *    tags: [reservas]
 *    responses:
 *      200:
 *        description: A list of reservas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/reservas'
 */
router.get("/", bookingController.readAll);

// d. Actualizar información de un reerva específico
/**
 * @swagger
 * /api/reservas/{id}:
 *  put:
 *    summary: Update information of a specific booking
 *    tags: [reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The booking's unique identifier
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/reservas'
 *    responses:
 *      200:
 *        description: booking updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/reservas'
 *      404:
 *        description: booking not found
 */
router.put("/:id", bookingController.update);

// e. Eliminar una reserva específica
/**
 * @swagger
 * /api/reservas/{id}:
 *  delete:
 *    summary: Delete a specific booking
 *    tags: [reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The booking's unique identifier
 *    responses:
 *      200:
 *        description: booking deleted successfully
 *      404:
 *        description: booking not found
 */
router.delete("/:id", bookingController.delete);

// f-j. Filtros
/**
 * @swagger
 * /api/reservas/search:
 *  get:
 *    summary: Search reservas with filters
 *    tags: [reservas]
 *    parameters:
 *      - in: query
 *        name: nombre_pasajero
 *        schema:
 *          type: string
 *        description: The name of the name of the person who made the booking
 *      - in: query
 *        name: hotel
 *        schema:
 *          type: string
 *        description: The hotel's name
 *      - in: query
 *        name: fecha_inicio
 *        schema:
 *          type: string
 *          format: date
 *        description: The date of the booking
 *      - in: query
 *        name: fecha_fin
 *        schema:
 *          type: string
 *        description: The date of departure of the passengers
 *      - in: query
 *        name: tipo_habitacion
 *        schema:
 *          type: string
 *        description: The type of tipo_habitacion being booked
 *      - in: query
 *        name: num_huespedes
 *        schema:
 *          type: number
 *        description: The total number of passengers
 *      - in: query
 *        name: mail
 *        schema:
 *          type: string
 *        description: The mail of the person who made the booking
 *      - in: query
 *        name: num_reserva
 *          type: number
 *        description: Shows the given number of the booking
 *      - in: query
 *        name: estado
 *          type: string
 *        description: The current status of the booking
 *      - in: query
 *        name: pago
 *          type: string
 *        descrption: The current status of the payment process
 *    responses:
 *      200:
 *        description: A list of bookings that match the filters
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/booking'
 */
router.get("/search", bookingController.filter);

// c. Obtener información de una reserva específica
/**
 * @swagger
 * /api/reservas/{id}:
 *  get:
 *    summary: Get information of a specific booking
 *    tags: [reservas]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The booking's unique identifier
 *    responses:
 *      200:
 *        description: Information of the specific booking
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/booking'
 *      404:
 *        description: booking not found
 */
router.get("/:id", bookingController.readOne);

module.exports = router;
