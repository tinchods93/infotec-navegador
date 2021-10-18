const { formatearBusqueda } = require('../../../utils/formatearBusqueda');

const motorBusqueda = {
  url: 'https://www.google.com/search?q=',
};

const recargarPagina = (view) => {
  view.reload();
};

const retrocederPagina = (view) => {
  try {
    view.goBack();
  } catch (error) {
    console.log('goBack error =>', error);
  }
};

const avanzarPagina = (view) => {
  try {
    view.goForward();
  } catch (error) {
    console.log('goForward error =>', error);
  }
};

const cargarPagina = (ev, navegador, view, tabgroup) => {
  try {
    if (ev.keyCode === 13) {
      navegador.blur();
      let val = navegador.value;
      let https = val.slice(0, 8).toLowerCase();
      let http = val.slice(0, 7).toLowerCase();
      if (!(https === 'https://' || http === 'http://')) {
        val = formatearBusqueda(val, motorBusqueda.url);
      }

      if (!tabgroup.getTabs().length) {
        tabgroup.addTab({
          title: 'Google3.0',
          src: val,
          active: true,
          visible: false,
        });
      } else {
        view.loadURL(val);
      }
    }
  } catch (error) {
    console.log('ERROR CARGANDO URL', error);
  }
};

const actualizarURL = (navegador, view) => {
  navegador.value =
    view.src.includes('https://') || view.src.includes('http://')
      ? view.src
      : '';
};

const listaFavoritos = (ev) => {
  //Hay que completar
};

//Hay que completar
const agregarFavorito = (ev) => {};

module.exports = {
  recargarPagina,
  retrocederPagina,
  avanzarPagina,
  listaFavoritos,
  cargarPagina,
  actualizarURL,
  agregarFavorito,
};
