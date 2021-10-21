const { cargarFavorito } = require('./acciones');
const { _TabGroup } = require('../Tabs/Tabs');
const ById = (id) => {
  return document.getElementById(id);
};

//Traigo los elementos
const navegador = ById('url');
const linksSection = ById('links');
const newLinkButton = ById('new-link-button');

//DOM APIs
const storeLink = (title, url, icono) => {
  localStorage.setItem(url, JSON.stringify({ title, url, icono }));
};

const getLinks = () => {
  return Object.keys(localStorage).map((key) =>
    JSON.parse(localStorage.getItem(key))
  );
};

const createLinkElement = (link) => {
  return `<div class="favorito__container " id="favorite">
                <div class="etabs-tab-icon">
                    <img src="${link.icono}" alt="">
                </div>
                <div class="etabs-tab-title">
                    <a id="CustomMenu" href="${link.url}">${link.title} </a>
                </div>
            </div>`;
};

const renderLinks = () => {
  const navBar = document.getElementById('navigation');
  const favList = getLinks().map(createLinkElement);
  if (favList.length) {
    navBar.style.height = '120px';
  } else {
    navBar.style.height = '100px';
  }
  const linksElements = favList.join('');
  linksSection.innerHTML = linksElements;
};

const removeFav = (ev) => {
  const key = ev.childNodes[3].childNodes[1].href;

  if (localStorage.key(key)) {
    localStorage.removeItem(key);
    renderLinks();
  }
};

const handleError = (error, url) => {
  console.log(`ERROR AGREGANDO LA URL ${url}, MENSAJE: ${error.message}`);
};

//Events
renderLinks();

newLinkButton.addEventListener('click', (e) => {
  e.preventDefault();

  const url = navegador.value;
  try {
    const aTab = _TabGroup.getActiveTab();
    const title = aTab.getTitle();
    const icono = aTab.getIcon();
    storeLink(title, url, icono);
    renderLinks();
  } catch (e) {
    handleError(e, url);
  }
});

const contexMenu = CtxMenu('#favorite');

contexMenu.addItem('Borrar Favorito', removeFav);

linksSection.addEventListener('click', (e) => {
  if (e.target.href) {
    e.preventDefault();
    const aTab = _TabGroup.getActiveTab();
    if (aTab) {
      aTab.setTitle('cargando...');
    }
    navegador.value = e.target.href;

    cargarFavorito(_TabGroup, navegador.value);
  }
});
