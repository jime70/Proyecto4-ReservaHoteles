const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController.js");

/**
 * @swagger
 * components:
 *  schemas:
 *    bookings:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The booking's unique identifier
 *        passengerName:
 *          type: string
 *          description: The name of the passenger who made the booking
 *        hotelName:
 *          type: string
 *          description: The hotel's name
 *        arrivalDate:
 *          type: string
 *          description: The date of the passenger's arrival
 *        departureDate:
 *          type: string
 *          description: The date of the passenger's departure
 *        room:
 *          type: string
 *          description: The type of room asked for
 *        passengers:
 *          type: number
 *          description: The total number of passengers
 *        mail:
 *          type: string
 *          description: The mail of the passenger who made the booking
 *        bookingNumber:
 *          type: number
 *          description: The booking's number
 *        bookingStatus:
 *          type: string
 *          description: The current status of the booking.
 *        paymentStatus:
 *          type: string
 *          description: The current status of the payment.
 *      required:
 *        - passengerName
 *        - hotelName
 *        - arrivalDate
 *        - departureDate
 *        - room
 *        - passengers
 *        - mail
 *        - bookingNumber
 *        - bookingStatus
 *        - paymentStatus
 *      example:
 *  passengerName: Nikko Bran
 *  hotelName: Hotel Pararaiso
 *  arrivalDate: 23 diciembre, 2023
 *  departureDate: 26 diciembre, 2023
 *  room: suite
 *  passengers: 2
 *  mail: nikko.b@gmail.com
 *  bookingNumber: 34627
 *  bookingStatus: reservado
 *  paymentStatus: pagado
 */

// a. Crear reseva
/**
 * @swagger
 * /api/bookings:
 *  post:
 *    summary: Create a new booking
 *    tags: [bookings]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/booking'
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
 * /api/bookings:
 *  get:
 *    summary: Get a list of all bookings
 *    tags: [bookings]
 *    responses:
 *      200:
 *        description: A list of bookings
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/booking'
 */
router.get("/", bookingController.readAll);

// d. Actualizar información de un reerva específico
/**
 * @swagger
 * /api/bookings/{id}:
 *  put:
 *    summary: Update information of a specific booking
 *    tags: [bookings]
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
 *            $ref: '#/components/schemas/booking'
 *    responses:
 *      200:
 *        description: booking updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/booking'
 *      404:
 *        description: booking not found
 */
router.put("/:id", bookingController.update);

// e. Eliminar una reserva específica
/**
 * @swagger
 * /api/bookings/{id}:
 *  delete:
 *    summary: Delete a specific booking
 *    tags: [bookings]
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
 * /api/bookings/search:
 *  get:
 *    summary: Search bookings with filters
 *    tags: [bookings]
 *    parameters:
 *      - in: query
 *        name: passengerName
 *        schema:
 *          type: string
 *        description: The name of the name of the person who made the booking
 *      - in: query
 *        name: hotelName
 *        schema:
 *          type: string
 *        description: The hotel's name
 *      - in: query
 *        name: arrivalDate
 *        schema:
 *          type: string
 *          format: date
 *        description: The date of the booking
 *      - in: query
 *        name: departureDate
 *        schema:
 *          type: string
 *        description: The date of departure of the passengers
 *      - in: query
 *        name: room
 *        schema:
 *          type: string
 *        description: The type of room being booked
 *      - in: query
 *        name: passengers
 *        schema:
 *          type: number
 *        description: The total number of passengers
 *      - in: query
 *        name: mail
 *        schema:
 *          type: string
 *        description: The mail of the person who made the booking
 *      - in: query
 *        name: bookingNumber
 *          type: number
 *        description: The given number of the booking
 *      - in: query
 *        name: bookingStatus
 *          type: string
 *        description: The current status of the booking
 *      - in: query
 *        name: paymentStatus
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

// c. Obtener información de una reerva específica
/**
 * @swagger
 * /api/bookings/{id}:
 *  get:
 *    summary: Get information of a specific booking
 *    tags: [bookings]
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
