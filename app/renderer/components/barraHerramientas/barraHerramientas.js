const jsonfile = require('jsonfile');
const path = require('path');
const uuid = require('uuid'); //para generar un ID unico para los favoritos
const { ipcRenderer: ipc } = require('electron');
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
  favicon = ById('favicon'),
  fave = ById('fave'),
  view = ById('view'),
  minimizarBtn = ById('minimizarBtn'),
  restaurarBtn = ById('restaurarBtn'),
  cerrarBtn = ById('cerrarBtn');

view.addEventListener('did-finish-load', (ev) => {
  actualizarURL(ev, navegador, view);
});

view.addEventListener('dom-ready', () => {
  // view.openDevTools(); //Abre devtools de la pagina cargada
  console.log('dom-ready');
});

view.addEventListener('page-favicon-updated', (ev) => {
  const currentFavicon = ev.favicons;
  favicon.src = currentFavicon[0] || 'https://www.google.com/favicon.ico';
});

view.addEventListener('did-start-loading', (ev) => {
  console.log('did-start-loading =>', ev);
});

view.addEventListener('did-attach', (ev) => {
  console.log('did-attach =>', ev);
});

view.addEventListener('did-stop-loading', (ev) => {
  console.log('did-stop-loading =>', ev);
});

minimizarBtn.addEventListener('click', () => {
  ipc.send('minimizarApp');
});

restaurarBtn.addEventListener('click', () => {
  ipc.send('restaurarApp');
});
cerrarBtn.addEventListener('click', () => {
  console.log('EVENT LISTENER CERRAR');
  ipc.send('cerrarApp');
});

navegador.addEventListener('keydown', (ev) => {
  cargarPagina(ev, navegador, view);
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

// fave.addEventListener('click', agregarFavorito);
