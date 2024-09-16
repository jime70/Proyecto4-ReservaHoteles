let reservas = [
  {
    id: 1,
    nombre_pasajero: "Juan Pérez",
    hotel: "Hotel Paraiso",
    fecha_inicio: "21 mayo, 2023",
    fecha_fin: "23 mayo, 2023",
    tipo_habitacion: "suite",
    num_huespedes: 1,
    mail: "juan1234@gmail.com",
    num_reserva: 13312,
    estado: "pagado",
  },

  {
    id: 2,
    nombre_pasajero: "Ana de la Cruz",
    hotel: "Hotel Pararaiso",
    fecha_inicio: "18 octubre, 2023",
    fecha_fin: "23 octubre, 2023",
    tipo_habitacion: "doble",
    num_huespedes: 4,
    mail: "an.cruz.am@gmail.com",
    num_reserva: 12345,
    estado: "pagado",
  },
  {
    id: 3,
    nombre_pasajero: "Cristian Ramirez",
    hotel: "Hotel Pararaiso",
    fecha_inicio: "07 octubre, 2023",
    fecha_fin: "10 octubre, 2023",
    tipo_habitacion: "doble",
    num_huespedes: 6,
    mail: "cramirezc@gmail.com",
    num_reserva: 37813,
    estado: "pendiente"
  },
  {
    id: 4,
    nombre_pasajero: "Nikko Bran",
    hotel: "Hotel Pararaiso",
    fecha_inicio: "23 diciembre, 2023",
    fecha_fin: "26 diciembre, 2023",
    tipo_habitacion: "suite",
    num_huespedes: 2,
    mail: "nikko.b@gmail.com",
    num_reserva: 34627,
    estado: "pendiente",
  },
  {
    id: 5,
    nombre_pasajero: "Percybal de Rollo",
    hotel: "Hotel Pararaiso",
    fecha_inicio: "15 octubre, 2023",
    fecha_fin: "20 octubre, 2023",
    tipo_habitacion: "doble",
    num_huespedes: 3,
    mail: "derollopm@gmail.com",
    num_reserva: 54321,
    estado: "pagado",
  },
];

const getNextId = (reservas) => {
  if (reservas.length === 0) {
    return 1; // Si el array está vacío, empezamos con 1
  } // Encontramos el ID más alto en el array
  const maxId = reservas.reduce(
    (max, reserva) => Math.max(max, reserva.id),
    0
  ); // Devolvemos el ID que sigue
  return maxId + 1;
};

exports.create = async (req, res) => {
  const {
    nombre_pasajero,
    hotel,
    fecha_inicio,
    fecha_fin,
    tipo_habitacion,
    num_huespedes,
    mail,
    num_reserva,
    estado,
  } = req.body;

  // Validación de datos
  if (
    !nombre_pasajero ||
    !hotel ||
    !fecha_inicio ||
    !fecha_fin ||
    !tipo_habitacion ||
    !num_huespedes ||
    !mail ||
    !num_reserva ||
    !estado
  ) {
    return res.status(400).json({
      msg: "Todos los campos son obligatorios.",
    });
  }
res.status(201).json({
  msg: "Su reserva ha sido creada con éxito. Muchas gracias por preferirnos.",
  //data: newReserva,
});
};


// a. Crear reserva
//exports.create = async (req, res) => {
  //const newReserva = req.body;
  //newReserva.id = getNextId(reservas);
  //reservas.push(newReserva);

//};

// b. Obtener la lista de reservas
exports.readAll = async (req, res) => {
  const {
    nombre_pasajero,
    hotel,
    fecha_inicio,
    fecha_fin,
    tipo_habitacion,
    num_huespedes,
    mail,
    num_reserva,
    estado,
  } = req.query;

  let reservasFiltradas = reservas;

  if (nombre_pasajero) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.nombre_pasajero.toLowerCase() === nombre_pasajero.toLowerCase()
    );
  }

  if (hotel) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.hotel.toLowerCase() === hotel.toLowerCase()
    );
  }

  if (fecha_inicio) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.fecha_inicio.toLowerCase() === fecha_inicio.toLowerCase()
    );
  }

  if (fecha_fin) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.fecha_fin.toLowerCase() === fecha_fin.toLowerCase()
    );
  }

  if (tipo_habitacion) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.tipo_habitacion.toLowerCase() === tipo_habitacion.toLowerCase()
    );
  }

  if (num_huespedes) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.num_huespedes === parseInt(num_huespedes)
    );
  }

  if (mail) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.mail.toLowerCase() === mail.toLowerCase()
    );
  }

  if (num_reserva) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.num_reserva.toLowerCase() === num_reserva.toLowerCase()
    );
  }

  if (estado) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.estado.toLowerCase() === estado.toLowerCase()
    );
  }

  if (fecha_inicio && fecha_fin) {
    reservasFiltradas = reservasFiltradas.filter(
      (r) => r.fecha_inicio >= fecha_inicio && r.fecha_fin <= fecha_fin
    );
  }

  if (reservasFiltradas.length === 0) {
    return res.status(404).json({
      error:
        "No se encontraron reservaciones con los criterios entregados, por favor vuelva a intentar.",
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
    return res
      .status(404)
      .json({ msg: "Reserva no encontrada, por favor vuelva a intentar." });
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
  const {
    nombre_pasajero,
    hotel,
    fecha_inicio,
    fecha_fin,
    tipo_habitacion,
    num_huespedes,
    mail,
    num_reserva,
    estado,
  } = req.query;

  const filteredreservas = reservas.filter((reserva) => {
    if (nombre_pasajero && reserva.nombre_pasajero !== nombre_pasajero) {
      return false;
    }
    if (hotel && reserva.hotel !== hotel) {
      return false;
    }
    if (fecha_inicio && reserva.fecha_inicio !== fecha_inicio) {
      return false;
    }
    if (fecha_fin && reserva.fecha_fin !== fecha_fin) {
      return false;
    }
    if (tipo_habitacion && reserva.tipo_habitacion !== tipo_habitacion) {
      return false;
    }
    if (num_huespedes && reserva.num_huespedes !== num_huespedes) {
      return false;
    }
    if (mail && reserva.mail !== mail) {
      return false;
    }
    if (num_reserva && reserva.num_reserva !== num_reserva) {
      return false;
    }
    if (estado && reserva.estado !== estado) {
      return false;
    }
    return true;
  });

  if (filteredreservas.length === 0) {
    return res.status(404).json({ msg: "Reserva no encontrado." });
  }

  res.json({
    msg: "reservas filtrados con éxito.",
    data: filteredreservas,
  });
};
