let reservas = [
  {
    id: 1,
    passengerName: "Juan Pérez",
    hotelName: "Hotel Paraiso",
    arrivalDate: "21 mayo, 2023",
    departureDate: "23 mayo, 2023",
    room: "suite",
    passengers: 1,
    mail: "juan1234@gmail.com",
    bookingNumber: 13312,
    bookingStatus: "reservado",
    paymentStatus: "pagado",
  },

  {
    id: 2,
    passengerName: "Ana de la Cruz",
    hotelName: "Hotel Pararaiso",
    arrivalDate: "18 octubre, 2023",
    departureDate: "23 octubre, 2023",
    room: "doble",
    passengers: 4,
    mail: "an.cruz.am@gmail.com",
    bookingNumber: 12345,
    bookingStatus: "reservado",
    paymentStatus: "pagado",
  },
  {
    id: 3,
    passengerName: "Cristian Ramirez",
    hotelName: "Hotel Pararaiso",
    arrivalDate: "07 octubre, 2023",
    departureDate: "10 octubre, 2023",
    room: "doble",
    passengers: 6,
    mail: "cramirezc@gmail.com",
    bookingNumber: 37813,
    bookingStatus: "pendiente",
    paymentStatus: "pendiente",
  },
  {
    id: 4,
    passengerName: "Nikko Bran",
    hotelName: "Hotel Pararaiso",
    arrivalDate: "23 diciembre, 2023",
    departureDate: "26 diciembre, 2023",
    room: "suite",
    passengers: 2,
    mail: "nikko.b@gmail.com",
    bookingNumber: 34627,
    bookingStatus: "reservado",
    paymentStatus: "pagado",
  },
  {
    id: 5,
    passengerName: "Percybal de Rollo",
    hotelName: "Hotel Pararaiso",
    arrivalDate: "18 octubre, 2023",
    departureDate: "23 octubre, 2023",
    room: "doble",
    passengers: 4,
    mail: "derollopm@gmail.com",
    bookingNumber: 54321,
    bookingStatus: "reservado",
    paymentStatus: "pendiente",
  },
];

// a. Crear reserva
exports.create = async (req, res) => {
  const newReserva = req.body;
  newReserva.id = reservas.length + 1;
  reservas.push(newReserva);

  res.status(201).json({
    msg: "Reserva creada con éxito.",
    data: newReserva,
  });
};

// b. Obtener la lista de Reservas
exports.readAll = async (req, res) => {
  res.json({
    msg: "Reserva realizada con éxito.",
    data: reservas,
  });
};

// c. Obtener información de un Reserva específico
exports.readOne = async (req, res) => {
  const reservaId = parseInt(req.params.id);
  const reserva = reservas.find((o) => o.id === reservaId);

  if (!reserva) {
    return res.status(404).json({ msg: "Reserva no encontrado." });
  }

  res.json({
    msg: "Reserva obtenida con éxito.",
    data: reserva,
  });
};

// d. Actualizar información de una Reserva específica
exports.update = async (req, res) => {
  const reservaId = parseInt(req.params.id);
  const reservaIndex = reservas.findIndex((o) => o.id === reservaId);

  if (reservaIndex === -1) {
    return res.status(404).json({ msg: "Reserva no encontrada." });
  }

  reservas[reservaIndex] = { ...reservas[reservaIndex], ...req.body };
  res.json({
    msg: "Reserva actualizada con éxito.",
    data: reservas[reservaIndex],
  });
};

// e. Eliminar un Reserva específica
exports.delete = async (req, res) => {
  const reservaId = parseInt(req.params.id);
  const reservaIndex = reservas.findIndex((o) => o.id === reservaId);

  if (reservaIndex === -1) {
    return res.status(404).json({ msg: "Reserva no encontrada." });
  }

  reservas.splice(reservaIndex, 1);
  res.json({ msg: "Reserva eliminada con éxito." });
};

// f-j. F
exports.filter = async (req, res) => {
  const { nameHotel, restaurant, date, status } = req.query;

  const filteredreservas = reservas.filter((reserva) => {
    if (nameHotel && reserva.name !== nameHotel) {
      return false;
    }
    if (restaurant && reserva.restaurant !== restaurant) {
      return false;
    }
    if (date && reserva.date !== date) {
      return false;
    }
    if (status && reserva.status !== status) {
      return false;
    }
    return true;
  });

  if (filteredreservas.length === 0) {
    return res.status(404).json({ msg: "Reserva no encontrado." });
  }

  res.json({
    msg: "Reservas filtrados con éxito.",
    data: filteredreservas,
  });
};
