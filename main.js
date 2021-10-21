const {
  app,
  BrowserWindow,
  ipcMain: ipc,
  globalShortcut,
} = require('electron');

//Dejamos una referencia global a mainWindow
let mainWindow;

const createWindow = () => {
  //Instancia principal
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 200,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    },
  });

  // Cargamos el index.html
  mainWindow.loadFile('./index.html');

  //Abrimos la consola de chromium
  mainWindow.webContents.openDevTools();
  mainWindow.maximize();

  //Shortcuts
  globalShortcut.register('CommandOrControl+T', () => {
    mainWindow.webContents.send('add_tab');
  });

  globalShortcut.register('CommandOrControl+W', () => {
    mainWindow.webContents.send('close_active_tab');
  });

  globalShortcut.register('CommandOrControl+TAB', () => {
    mainWindow.webContents.send('change_active_tab');
  });

  // Check whether a shortcut is registered.

  //EVENTOS PARA EL CONTROL DE LA VENTANA
  ipc.on('cerrarApp', () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });

  ipc.on('minimizarApp', () => {
    mainWindow.minimize();
  });

  ipc.on('restaurarApp', () => {
    mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
  });

  //Emitido cuando cerramos la ventana
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

//Evento lanzado cuando la app está lista para mostrar la ventana
app.whenReady().then(createWindow);

//Esta funcion cierra los procesos en procesadores que no son macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
