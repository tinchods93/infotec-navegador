const { dialog, ipcMain } = require('electron');
const fs = require('fs');

const abrirArchivo = ({ mainWindow }) => {
  dialog
    .showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [{ name: "Infotec's Extention", extensions: ['infotec'] }],
    })
    .then((files) => {
      if (!files || !files.filePaths.length) return;

      const filePath = files.filePaths[0];
      const fileContent = fs.readFileSync(filePath).toString();

      mainWindow.webContents.send('file-opened', fileContent);
    });
};

const guardarArchivo = ({ mainWindow }) => {
  dialog
    .showSaveDialog(mainWindow, {
      filters: [{ name: "Infotec's Extention", extensions: ['infotec'] }],
    })
    .then((filename) => {
      if (!filename.filePath.length) {
        return;
      }

      mainWindow.webContents.send('want-to-save');
      ipcMain.on('file-save', (ev, buffer) => {
        fs.writeFile(filename.filePath, buffer, (err) => {
          if (err) {
            console.log('ERROR GUARDANDO ARCHIVO', err);
            return;
          }
          console.log('Guardado');
        });
      });
    });
};

const cerrarArchivo = ({ mainWindow }) => {
  mainWindow.webContents.send('clear-file');
};
module.exports = {
  abrirArchivo,
  guardarArchivo,
  cerrarArchivo,
};
