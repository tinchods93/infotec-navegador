const { formatearBusqueda } = require('../../utils/formatearBusqueda');
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
        const urlList = val.split('.');
        if (urlList.includes('www') && urlList.includes('com')) {
          val = `http://${val}`;
          // return;
        } else val = formatearBusqueda(val, motorBusqueda.url);
      }

      if (!tabgroup.getTabs().length) {
        tabgroup.addTab({
          src: val,
          active: true,
          iconURL: 'https://images2.imgbox.com/53/fd/I4pHpKpX_o.png',
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

const cargarFavorito = (tabGroup, url) => {
  const aTab = tabGroup.getActiveTab();
  try {
    if (!tabGroup.getTabs().length || !aTab) {
      tabGroup.addTab({
        title: 'cargando',
        src: url,
        active: true,
        iconURL: 'https://images2.imgbox.com/53/fd/I4pHpKpX_o.png',
        visible: false,
      });
    } else {
      aTab.webview.loadURL(url);
    }
  } catch (error) {
    console.log('ERROR CARGANDO URL', error);
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
  actualizarURL,
  cargarFavorito,
};
