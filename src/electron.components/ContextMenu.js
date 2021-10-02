const { Menu, MenuItem } = require('electron');

const ContextMenu = (mainWindow) => {
  const contextMenu = new Menu();
  const contextMenuItems = [
    new MenuItem({
      label: 'Copiar',
      role: 'copy',
    }),
    new MenuItem({
      label: 'Pegar',
      role: 'paste',
    }),
    new MenuItem({
      label: 'Cortar',
      role: 'cut',
    }),
    new MenuItem({
      label: 'Deshacer',
      role: 'undo',
    }),
    new MenuItem({
      label: 'Rehacer',
      role: 'redo',
    }),
  ];

  contextMenuItems.forEach((item) => {
    contextMenu.append(item);
  });
  mainWindow.webContents.on('context-menu', (ev, params) => {
    contextMenu.popup(mainWindow, params.x, params.y);
  });
};

module.exports = {
  ContextMenu,
};
