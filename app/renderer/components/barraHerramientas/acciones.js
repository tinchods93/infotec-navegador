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

const cargarPagina = (ev, navegador, view) => {
  if (ev.keyCode === 13) {
    navegador.blur();
    let val = navegador.value;
    let https = val.slice(0, 8).toLowerCase();
    let http = val.slice(0, 7).toLowerCase();
    if (https === 'https://' || http === 'http://') {
      view.loadURL(val);
    } else {
      view.loadURL('http://' + val);
    }
  }
};

const actualizarURL = (ev, navegador, view) => {
  navegador.value = view.src;
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
