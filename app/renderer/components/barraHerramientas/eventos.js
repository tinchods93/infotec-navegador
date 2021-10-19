const { ipcRenderer: ipc } = require('electron');
const { _TabGroup } = require('../Tabs/Tabs');
const {
  actualizarURL,
  recargarPagina,
  avanzarPagina,
  retrocederPagina,
  cargarPagina,
} = require('./acciones');

const ById = (id) => {
  return document.getElementById(id);
};

//Traigo los elementos
const back = ById('back'),
  forward = ById('forward'),
  refresh = ById('refresh'),
  navegador = ById('url'),
  fave = ById('fave'),
  minimizarBtn = ById('minimizarBtn'),
  restaurarBtn = ById('restaurarBtn'),
  cerrarBtn = ById('cerrarBtn');
let view;

//EVENTOS
_TabGroup.on('tab-active', (tab, tabGroup) => {
  viewEvents(tab.webview, tab);
  tabEvents(tab, tabGroup);
  view = tab.webview;
  actualizarURL(navegador, view);
});

const viewEvents = (_view, aTab) => {
  _view.addEventListener('did-finish-load', (ev) => {
    actualizarURL(navegador, view);
  });

  _view.addEventListener('dom-ready', () => {
    // view.openDevTools(); //Abre devtools de la pagina cargada
    // console.log('dom-ready');
  });

  _view.addEventListener('page-favicon-updated', (ev) => {
    const currentFavicon = ev.favicons;
    aTab.setIcon(currentFavicon[0]);
    // console.log('page-favicon-updated');
  });

  _view.addEventListener('did-start-loading', (ev) => {
    // console.log('did-start-loading =>', ev);
  });

  _view.addEventListener('did-attach', (ev) => {
    console.log('did-attach =>', ev);
  });

  _view.addEventListener('did-stop-loading', (ev) => {
    console.log('did-stop-loading =>', ev);

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

// fave.addEventListener('click', agregarFavorito);*/
