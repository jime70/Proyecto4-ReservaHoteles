const express = require("express");
const router = express.Router();
module.exports = router;

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
 *      example:
 *        nombre_pasajero: Nikko Bran
 *        hotel: Hotel Pararaiso
 *        fecha_inicio: 23 diciembre, 2023
 *        fecha_fin: 26 diciembre, 2023
 *        tipo_habitacion: suite
 *        num_huespedes: 2
 *        mail: nikko.b@gmail.com
 *        num_reserva: 34627
 *        estado: reservado
 */

// a. Crear reserva
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
 *      200:
 *        description: Booking created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/reservas'
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

// Obtener información de una reserva específica
/**
 * @swagger
 * /api/reservas/{id}:
 *  get:
 *    summary: Get a specific booking by ID
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
 *              $ref: '#/components/schemas/reservas'
 *      404:
 *        description: booking not found
 */
router.get("/:id", bookingController.readOne);

// d. Actualizar información de un reserva específico
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

// f-j
