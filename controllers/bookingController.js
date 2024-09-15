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
    msg: "Su reserva ha sido creada con éxito. Muchas gracias por preferirnos.",
    data: newReserva,
  });
};

// b. Obtener la lista de Reservas
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

  let reservasFiltradas = reservas;

  if (passengerName) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.passengerName.toLowerCase() === passengerName.toLowerCase()
    );
  }

  if (hotelName) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.hotelName.toLowerCase() === hotelName.toLowerCase()
    );
  }

  if (arrivalDate) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.arrivalDate.toLowerCase() === arrivalDate.toLowerCase()
    );
  }

  if (departureDate) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.departureDate.toLowerCase() === departureDate.toLowerCase()
    );
  }

  if (room) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.room.toLowerCase() === room.toLowerCase()
    );
  }

  if (passengers) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.passengers === parseInt(passengers)
    );
  }

  if (mail) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.mail.toLowerCase() === mail.toLowerCase()
    );
  }

  if (bookingNumber) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.bookingNumber.toLowerCase() === bookingNumber.toLowerCase()
    );
  }

  if (bookingStatus) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.bookingStatus.toLowerCase() === bookingStatus.toLowerCase()
    );
  }

    if (paymentStatus) {
      reservasFiltradas = reservasFiltradas.filter(
        (r) => r.paymentStatus.toLowerCase() === paymentStatus.toLowerCase()
      );
    }

  if (arrivalDate && departureDate) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.arrivalDate >= arrivalDate && r.departureDate <= departureDate
    );
  }

  if (reservasFiltradas.length === 0) {
    return res.status(404).json({
      error: "No se encontraron reservaciones con los criterios entregados, por favor vuelva a intentar.",
    });
  }

  res.json({
    msg: "Reservaciones obtenidas con éxito, muchas gracias por preferirnos.",
    data: reservasFiltradas,
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
    return res.status(404).json({ msg: "Reserva no encontrada, por favor vuelva a intentar." });
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
  const { passengerName, hotelName, arrivalDate, departureDate, room, passengers, mail, bookingNumber, bookingStatus, paymentStatus } = req.query;

  const filteredreservas = reservas.filter((reserva) => {
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

  if (filteredreservas.length === 0) {
    return res.status(404).json({ msg: "Reserva no encontrado." });
  }

  res.json({
    msg: "Reservas filtrados con éxito.",
    data: filteredreservas,
  });
};
