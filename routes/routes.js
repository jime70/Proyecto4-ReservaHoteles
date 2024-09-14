const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController.js");

/**
 * @swagger
 * components:
 *  schemas:
 *    Reservas:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The order's unique identifier
 *        name:
 *          type: string
 *          description: The name of the ordered item
 *        restaurant:
 *          type: string
 *          description: The restaurant's name
 *        date:
 *          type: string
 *          format: date
 *          description: The date of the order
 *        status:
 *          type: string
 *          description: The order's status
 *        price:
 *          type: number
 *          description: The price of the ordered item
 *        quantity:
 *          type: integer
 *          description: The quantity of the ordered item
 *        total:
 *          type: number
 *          description: The order's total amount
 *      required:
 *        - id
 *        - name
 *        - restaurant
 *        - date
 *        - status
 *        - price
 *        - quantity
 *        - total
 *      example:
 *  id: 4,
 *  passengerName: ikko Bran
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

// a. Crear pedido
/**
 * @swagger
 * /api/reservas:
 *  post:
 *    summary: Create a new order
 *    tags: [Orders]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      201:
 *        description: Order created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 */
router.post("/", bookingController.create);

// b. Obtener la lista de pedidos
/**
 * @swagger
 * /api/orders:
 *  get:
 *    summary: Get a list of all orders
 *    tags: [Orders]
 *    responses:
 *      200:
 *        description: A list of orders
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Order'
 */
router.get("/", bookingController.readAll);

// d. Actualizar información de un pedido específico
/**
 * @swagger
 * /api/orders/{id}:
 *  put:
 *    summary: Update information of a specific order
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The order's unique identifier
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      200:
 *        description: Order updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      404:
 *        description: Order not found
 */
router.put("/:id", bookingController.update);

// e. Eliminar un pedido específico
/**
 * @swagger
 * /api/orders/{id}:
 *  delete:
 *    summary: Delete a specific order
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The order's unique identifier
 *    responses:
 *      200:
 *        description: Order deleted successfully
 *      404:
 *        description: Order not found
 */
router.delete("/:id", bookingController.delete);

// f-j. Filtros
/**
 * @swagger
 * /api/orders/search:
 *  get:
 *    summary: Search orders with filters
 *    tags: [Orders]
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: The name of the ordered item
 *      - in: query
 *        name: restaurant
 *        schema:
 *          type: string
 *        description: The restaurant's name
 *      - in: query
 *        name: date
 *        schema:
 *          type: string
 *          format: date
 *        description: The date of the order
 *      - in: query
 *        name: status
 *        schema:
 *          type: string
 *        description: The order's status
 *    responses:
 *      200:
 *        description: A list of orders that match the filters
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Order'
 */
router.get("/search", bookingController.filter);

// c. Obtener información de un pedido específico
/**
 * @swagger
 * /api/orders/{id}:
 *  get:
 *    summary: Get information of a specific order
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The order's unique identifier
 *    responses:
 *      200:
 *        description: Information of the specific order
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      404:
 *        description: Order not found
 */
router.get("/:id", bookingController.readOne);

module.exports = router;
