module.exports.formatearBusqueda = (busqueda, motorBusqueda) => {
  busqueda = busqueda.split(' ').join('+');
  return `${motorBusqueda}${busqueda}`;
};
