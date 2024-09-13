let reservas = [
  {
    id: 1,
    name: "Juan Pérez",
    fechaIngreso: "21 mayo, 2023",
    fechaSalida: "23 mayo, 2023",
    tipoHabitacion: "single",
    numeroAdultos: 1,
    numeroHijos: 0,
    numeroReserva: 13312,
  },

  {
    id: 2,
    name: "Ana Luna",
    fechaIngreso: "14 mayo, 2023",
    fechaSalida: "17 mayo, 2023",
    tipoHabitacion: "doble",
    numeroAdultos: 2,
    numeroHijos: 0,
    numeroReserva: 12345,
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
  const { name, restaurant, date, status } = req.query;

  const filteredreservas = reservas.filter((reserva) => {
    if (name && reserva.name !== name) {
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
