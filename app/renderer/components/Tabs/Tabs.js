const TabGroup = require('electron-tabs');

const _TabGroup = new TabGroup({
  newTab: {
    title: 'Nueva Pestaña',
    visible: true,
    active: true,
    webviewAttributes: {
      nodeintegration: true,
    },
  },
});

module.exports = {
  _TabGroup,
};
