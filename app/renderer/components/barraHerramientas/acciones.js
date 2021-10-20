const { formatearBusqueda } = require('../../../utils/formatearBusqueda');

const config = {
  viewAux: undefined,
  tabGroupAux: undefined,
};
const motorBusqueda = {
  url: 'https://www.google.com/search?q=',
};

const recargarPagina = (view) => {
  config.viewAux = view;
  view.reload();
};

const retrocederPagina = (view) => {
  config.viewAux = view;
  try {
    view.goBack();
  } catch (error) {
    console.log('goBack error =>', error);
  }
};

const avanzarPagina = (view) => {
  config.viewAux = view;
  try {
    view.goForward();
  } catch (error) {
    console.log('goForward error =>', error);
  }
};

const cargarPagina = (ev, navegador, view, tabgroup) => {
  config.viewAux = view;
  config.tabGroupAux = tabgroup;
  try {
    if (ev.keyCode === 13) {
      navegador.blur();
      let val = navegador.value;
      let https = val.slice(0, 8).toLowerCase();
      let http = val.slice(0, 7).toLowerCase();

      if (!(https === 'https://' || http === 'http://')) {
        console.log(val);
        const urlList = val.split('.');
        if (urlList.includes('www') && urlList.includes('com')) {
          val = `http://${val}`;
          // return;
        } else val = formatearBusqueda(val, motorBusqueda.url);
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

const cargarFavorito = (view, tabGroup, favorito) => {
  // console.log('TABGROUP==>', tabGroup);
  // const aTab = tabGroup.getActiveTab();
  try {
    if (!tabGroup.getTabs().length) {
      tabGroup.addTab({
        title: favorito.titulo,
        src: favorito.url,
        active: true,
        visible: false,
      });
    } else {
      view.loadURL(favorito.url);
    }
  } catch (error) {
    console.log('ERROR CARGANDO URL', error);
  }
};

const actualizarBarraFavoritos = (barraFavoritos, barraHerramientas, view) => {
  const lista = JSON.parse(localStorage.getItem('favoritos'));

  if (lista && lista.length) {
    barraFavoritos.style.display = 'flex';
    barraFavoritos.innerHTML = lista
      .map((favorito, index) => {
        return `<div class="favorito__container " id="fav_${index}">
          <div class="etabs-tab-icon">
            <img src="${favorito.favicon}" alt="">
          </div>
          <div class="etabs-tab-title">
            <span>${favorito.titulo}</span>
          </div>
        </div>`;
      })
      .join('');
  } else {
    barraFavoritos.style.display = 'none';
    barraFavoritos.innerHTML = '';
  }
};

const actualizarURL = (navegador, view) => {
  config.viewAux = view;
  navegador.value =
    view.src.includes('https://') || view.src.includes('http://')
      ? view.src
      : '';
};

// if (ipcRenderer) {
// }

module.exports = {
  recargarPagina,
  retrocederPagina,
  avanzarPagina,
  cargarPagina,
  cargarFavorito,
  actualizarURL,
  actualizarBarraFavoritos,
};
