const { ipcRenderer } = require('electron');
const { _TabGroup } = require('../Tabs/Tabs');
const { cargarFavorito } = require('../barraHerramientas/acciones');
const listaFavoritos = () => {
  //Hay que completar
  const lista = JSON.parse(localStorage.getItem('favoritos'));
  if (lista.length) {
    console.log(lista);
  }
};

//Hay que completar
const agregarFavorito = () => {
  //   console.log(object);
  const activeTab = _TabGroup.getActiveTab();
  if (
    activeTab &&
    !['Nueva Pestaña', undefined, null].includes(activeTab.title)
  ) {
    const lista = localStorage.length
      ? JSON.parse(localStorage.getItem('favoritos'))
      : [];

    const favorito = {
      key: activeTab.webviewAttributes.src,
      url: activeTab.webviewAttributes.src,
      titulo: activeTab.title,
      favicon: activeTab.iconURL,
    };
    lista.push(favorito);
    localStorage.setItem('favoritos', JSON.stringify(lista));

    ipcRenderer.send('favorito_agregado');
  }
};

const actualizarViewFavoritos = (view, tabGroup) => {
  console.log(tabGroup);
  const favElements = document.getElementsByClassName('favorito__container');
  const elem = [].slice.call(favElements);
  const listaFavs = JSON.parse(localStorage.getItem('favoritos'));
  elem.forEach((element) => {
    const index = element.id.split('_')[1];
    element.addEventListener('click', (ev) => {
      ev.preventDefault();
      cargarFavorito(view, tabGroup, listaFavs[index]);
    });
  });
};

ipcRenderer.on('agregar_favorito', (ev) => {
  agregarFavorito();
});

ipcRenderer.on('administrar_favorito', (ev) => {
  listaFavoritos();
});

module.exports = {
  agregarFavorito,
  listaFavoritos,
  actualizarViewFavoritos,
};
