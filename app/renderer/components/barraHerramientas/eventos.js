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

//TRAEMOS LOS ELEMENTOS
const back = ById('back');
const forward = ById('forward');
const refresh = ById('refresh');
const navegador = ById('url');
const minimizarBtn = ById('minimizarBtn');
const restaurarBtn = ById('restaurarBtn');
const cerrarBtn = ById('cerrarBtn');
const userOptions = ById('user_options');
let view;

//EVENTOS
_TabGroup.on('tab-active', (tab, tabGroup) => {
  viewEvents(tab.webview, tab);
  tabEvents(tab, tabGroup);
  view = tab.webview;
  actualizarURL(navegador, view);
});

_TabGroup.on('tab-added', (tab, tabGroup) => {
  tab.webview.style.background = 'none';
});

//ESTA FUNCION GENERA LOS EVENTOS PARA CADA VIEW GENERADO POR UNA PESTAÑA/TAB
const viewEvents = (_view, aTab) => {
  _view.addEventListener('page-favicon-updated', (ev) => {
    const currentFavicon = ev.favicons;
    aTab.setIcon(currentFavicon[0]);
  });

  _view.addEventListener('did-start-loading', (ev) => {
    if (aTab) {
      aTab.setTitle('cargando...');
    }
  });

  _view.addEventListener('did-finish-load', (ev) => {
    const title = _view.getTitle();
    actualizarURL(navegador, view);
    if (title !== 'undefined') {
      _view.style.background = 'white';
      aTab.setTitle(title);
    }
  });

  _view.addEventListener('did-stop-loading', (ev) => {
    const title = _view.getTitle();
    actualizarURL(navegador, view);

    _view.style.background = 'white';

    if (title !== 'undefined') {
      aTab.setTitle(title);
    } else {
      _view.style.background = 'none';
      aTab.setTitle('Nueva Pestaña');
    }
  });
};

const tabEvents = (aTab, tabGroup) => {
  aTab.on('closing', (tab, abort) => {
    if (tabGroup.getTabs().length <= 1) ipc.send('cerrarApp');
  });
};


//EVENTOS CONTROL DE LA VENTANA
minimizarBtn.addEventListener('click', () => {
  ipc.send('minimizarApp');
});
restaurarBtn.addEventListener('click', () => {
  ipc.send('restaurarApp');
});
cerrarBtn.addEventListener('click', () => {
  ipc.send('cerrarApp');
});


//EVENTOS CONTROL DE LA PAGINA
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

ipc.on('add_tab', () => {
  _TabGroup.addTab();
});

ipc.on('close_active_tab', () => {
  const aTab = _TabGroup.getActiveTab();
  if (aTab) {
    aTab.close();
  }
});

ipc.on('change_active_tab', () => {
  const aTab = _TabGroup.getActiveTab();
  if (aTab) {
    //getPosition, devuelve la posicion de la TAB en orden 1....n
    let aIndex = aTab.getPosition();
    const allTabs = _TabGroup.getTabs();
    if (aIndex === allTabs.length) {
      aIndex = 1;
    } else {
      aIndex++;
    }

    //Obtenemso una tab por posicion y la volvemos activa
    _TabGroup.getTabByPosition(aIndex).activate(true);
  }
});

