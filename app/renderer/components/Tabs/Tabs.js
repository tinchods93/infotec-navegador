const TabGroup = require('electron-tabs');

const _TabGroup = new TabGroup({
  newTab: {
    title: 'Nueva Pestaña',
    visible: true,
    active: true,
    iconURL: 'https://images2.imgbox.com/53/fd/I4pHpKpX_o.png',
    webviewAttributes: {
      nodeintegration: true,
    },
  },
});

module.exports = {
  _TabGroup,
};
