const { Menu, MenuItem } = require('electron');
const {
  abrirArchivo,
  guardarArchivo,
  cerrarArchivo,
} = require('./helpers/manejoArchivos');
global.miDocumento = undefined;

class MainMenu {
  constructor(props) {
    this.props = props;
    this.customMenuItems = [
      new MenuItem({
        label: 'Archivo',
        submenu: [
          {
            label: 'Abrir',
            click() {
              abrirArchivo(props);
            },
          },
          {
            label: 'Guardar',
            click() {
              guardarArchivo(props);
            },
          },
          {
            label: 'Cerrar Archivo',
            click() {
              cerrarArchivo(props);
            },
          },
          { label: 'Cerrar Editor', role: 'quit' },
        ],
      }),
      new MenuItem({
        label: 'Editar',
        submenu: [
          { label: 'Deshacer', role: 'undo' },
          { label: 'Rehacer', role: 'redo' },
          { label: 'Cortar', role: 'cut' },
          { label: 'Copiar', role: 'copy' },
          { label: 'Pegar', role: 'paste' },
        ],
      }),
      new MenuItem({
        label: 'Dev',
        submenu: [{ label: 'Recargar', role: 'forceReload' }],
      }),
    ];
  }
  render() {
    const menu = Menu.buildFromTemplate(this.customMenuItems);
    Menu.setApplicationMenu(menu);
  }
}

module.exports = {
  MainMenu,
};
