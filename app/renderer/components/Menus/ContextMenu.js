const { Menu, MenuItem } = require('electron');
const ContextMenu = (ipcRenderer) => {
  const contextMenu = new Menu();
  const contextMenuItems = [
    new MenuItem({
      label: 'Nueva Pestaña',
      click: () => {
        ipcRenderer.send('nueva_tab');
      },
    }),
    new MenuItem({
      label: 'Agregar a Favoritos',
      click: () => {
        ipcRenderer.send('agregar_favorito');
      },
    }),
    new MenuItem({
      label: 'Administrar Favoritos',
      click: () => {
        ipcRenderer.send('administrar_favorito');
      },
    }),
  ];

  contextMenuItems.forEach((item) => {
    contextMenu.append(item);
  });

  return contextMenu.popup();
};

module.exports = {
  ContextMenu,
};
