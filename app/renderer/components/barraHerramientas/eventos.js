const { ipcRenderer: ipc } = require('electron');
const { _TabGroup } = require('../Tabs/Tabs');
const { actualizarViewFavoritos } = require('../favoritos/favoritos');
const {
  actualizarURL,
  recargarPagina,
  avanzarPagina,
  retrocederPagina,
  cargarPagina,
  actualizarBarraFavoritos,
} = require('./acciones');

const ById = (id) => {
  return document.getElementById(id);
};

//Traigo los elementos
const back = ById('back');
const forward = ById('forward');
const refresh = ById('refresh');
const navegador = ById('url');
const fave = ById('fave');
const minimizarBtn = ById('minimizarBtn');
const restaurarBtn = ById('restaurarBtn');
const cerrarBtn = ById('cerrarBtn');
const userOptions = ById('user_options');
let view;
const barraFavoritos = ById('barraFavoritos');
const barraHerramientas = ById('navigation');

//EVENTOS
_TabGroup.on('tab-active', (tab, tabGroup) => {
  viewEvents(tab.webview, tab);
  tabEvents(tab, tabGroup);
  view = tab.webview;
  actualizarURL(navegador, view);
  if (barraFavoritos) {
    actualizarBarraFavoritos(barraFavoritos, barraHerramientas);
    actualizarViewFavoritos(view, tabGroup);
  }
});

if (barraFavoritos) {
  actualizarBarraFavoritos(barraFavoritos, barraHerramientas);
  actualizarViewFavoritos(view, _TabGroup);
}

const viewEvents = (_view, aTab) => {
  _view.addEventListener('did-finish-load', (ev) => {
    actualizarURL(navegador, view);
  });

  _view.addEventListener('page-favicon-updated', (ev) => {
    const currentFavicon = ev.favicons;
    aTab.setIcon(currentFavicon[0]);
  });

  _view.addEventListener('did-attach', (ev) => {});

  _view.addEventListener('did-stop-loading', (ev) => {
    const title = _view.getTitle();
    console.log('TITULO', title);
    if (title !== 'undefined') {
      aTab.setTitle(title);
    }
  });
};

const tabEvents = (aTab, tabGroup) => {
  aTab.on('closing', (tab, abort) => {
    if (tabGroup.getTabs().length <= 1) ipc.send('cerrarApp');
  });
};

minimizarBtn.addEventListener('click', () => {
  ipc.send('minimizarApp');
});

restaurarBtn.addEventListener('click', () => {
  ipc.send('restaurarApp');
});
cerrarBtn.addEventListener('click', () => {
  ipc.send('cerrarApp');
});

ipc.on('favorito_agregado_', () => {
  actualizarBarraFavoritos(barraFavoritos, barraHerramientas);
  // actualizarViewFavoritos(view, tabGroup);
});

navegador.addEventListener('keydown', (ev) => {
  cargarPagina(ev, navegador, view, _TabGroup);
});
refresh.addEventListener('click', () => {
  recargarPagina(view);
});
back.addEventListener('click', () => {
  retrocederPagina(view);
});
forward.addEventListener('click', () => {
  avanzarPagina(view);
});

userOptions.addEventListener('click', () => {
  ipc.send('user_options');
});
// fave.addEventListener('click', agregarFavorito);*/
