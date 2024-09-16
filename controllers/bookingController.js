let bookings = [
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
    arrivalDate: "15 octubre, 2023",
    departureDate: "20 octubre, 2023",
    room: "doble",
    passengers: 3,
    mail: "derollopm@gmail.com",
    bookingNumber: 54321,
    bookingStatus: "reservado",
    paymentStatus: "pendiente",
  },
];

const getNextId = (reservations) => {
  if (reservations.length === 0) {
    return 1; // Si el array está vacío, empezamos con 1
  } // Encontramos el ID más alto en el array
  const maxId = reservations.reduce(
    (max, reservation) => Math.max(max, reservation.id),
    0
  ); // Devolvemos el siguiente ID
  return maxId + 1;
};

// a. Crear reserva
exports.create = async (req, res) => {
  const newReserva = req.body;
  newReserva.id = getNextId(bookings);
  bookings.push(newReserva);

  res.status(201).json({
    msg: "Su reserva ha sido creada con éxito. Muchas gracias por preferirnos.",
    data: newReserva,
  });
};

// b. Obtener la lista de bookings
exports.readAll = async (req, res) => {
  const {
    passengerName,
    hotelName,
    arrivalDate,
    departureDate,
    room,
    passengers,
    mail,
    bookingNumber,
    bookingStatus,
    paymentStatus,
  } = req.query;

  let bookingsFiltradas = bookings;

  if (passengerName) {
    bookingsFiltradas = bookingsFiltradas.filter(
      (r) => r.passengerName.toLowerCase() === passengerName.toLowerCase()
    );
  }

  if (hotelName) {
    bookingsFiltradas = bookingsFiltradas.filter(
      (r) => r.hotelName.toLowerCase() === hotelName.toLowerCase()
    );
  }

  if (arrivalDate) {
    bookingsFiltradas = bookingsFiltradas.filter(
      (r) => r.arrivalDate.toLowerCase() === arrivalDate.toLowerCase()
    );
  }

  if (departureDate) {
    bookingsFiltradas = bookingsFiltradas.filter(
      (r) => r.departureDate.toLowerCase() === departureDate.toLowerCase()
    );
  }

  if (room) {
    bookingsFiltradas = bookingsFiltradas.filter(
      (r) => r.room.toLowerCase() === room.toLowerCase()
    );
  }

  if (passengers) {
    bookingsFiltradas = bookingsFiltradas.filter(
      (r) => r.passengers === parseInt(passengers)
    );
  }

  if (mail) {
    bookingsFiltradas = bookingsFiltradas.filter(
      (r) => r.mail.toLowerCase() === mail.toLowerCase()
    );
  }

  if (bookingNumber) {
    bookingsFiltradas = bookingsFiltradas.filter(
      (r) => r.bookingNumber.toLowerCase() === bookingNumber.toLowerCase()
    );
  }

  if (bookingStatus) {
    bookingsFiltradas = bookingsFiltradas.filter(
      (r) => r.bookingStatus.toLowerCase() === bookingStatus.toLowerCase()
    );
  }

  if (paymentStatus) {
    bookingsFiltradas = bookingsFiltradas.filter(
      (r) => r.paymentStatus.toLowerCase() === paymentStatus.toLowerCase()
    );
  }

  if (arrivalDate && departureDate) {
    bookingsFiltradas = bookingsFiltradas.filter(
      (r) => r.arrivalDate >= arrivalDate && r.departureDate <= departureDate
    );
  }

  if (bookingsFiltradas.length === 0) {
    return res.status(404).json({
      error:
        "No se encontraron reservaciones con los criterios entregados, por favor vuelva a intentar.",
    });
  }

  res.json({
    msg: "Reservaciones obtenidas con éxito, muchas gracias por preferirnos.",
    data: bookingsFiltradas,
  });
};

// c. Obtener información de un Reserva específico
exports.readOne = async (req, res) => {
  const reservaId = parseInt(req.params.id);
  const reserva = bookings.find((o) => o.id === reservaId);

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
  const reservaIndex = bookings.findIndex((o) => o.id === reservaId);

  if (reservaIndex === -1) {
    return res
      .status(404)
      .json({ msg: "Reserva no encontrada, por favor vuelva a intentar." });
  }

  bookings[reservaIndex] = { ...bookings[reservaIndex], ...req.body };
  res.json({
    msg: "Reserva actualizada con éxito.",
    data: bookings[reservaIndex],
  });
};

// e. Eliminar un Reserva específica
exports.delete = async (req, res) => {
  const reservaId = parseInt(req.params.id);
  const reservaIndex = bookings.findIndex((o) => o.id === reservaId);

  if (reservaIndex === -1) {
    return res.status(404).json({ msg: "Reserva no encontrada." });
  }

  bookings.splice(reservaIndex, 1);
  res.json({ msg: "Reserva eliminada con éxito." });
};

// f-j. F
exports.filter = async (req, res) => {
  const {
    passengerName,
    hotelName,
    arrivalDate,
    departureDate,
    room,
    passengers,
    mail,
    bookingNumber,
    bookingStatus,
    paymentStatus,
  } = req.query;

  const filteredbookings = bookings.filter((reserva) => {
    if (passengerName && reserva.passengerName !== passengerName) {
      return false;
    }
    if (hotelName && reserva.hotelName !== hotelName) {
      return false;
    }
    if (arrivalDate && reserva.arrivalDate !== arrivalDate) {
      return false;
    }
    if (departureDate && reserva.departureDate !== departureDate) {
      return false;
    }
    if (room && reserva.room !== room) {
      return false;
    }
    if (passengers && reserva.passengers !== passengers) {
      return false;
    }
    if (mail && reserva.mail !== mail) {
      return false;
    }
    if (bookingNumber && reserva.bookingNumber !== bookingNumber) {
      return false;
    }
    if (bookingStatus && reserva.bookingStatus !== bookingStatus) {
      return false;
    }
    if (paymentStatus && reserva.paymentStatus !== paymentStatus) {
      return false;
    }
    return true;
  });

  if (filteredbookings.length === 0) {
    return res.status(404).json({ msg: "Reserva no encontrado." });
  }

  res.json({
    msg: "bookings filtrados con éxito.",
    data: filteredbookings,
  });
};
