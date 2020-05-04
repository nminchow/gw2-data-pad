import { app, BrowserWindow } from 'electron' // eslint-disable-line

const ioHook = require('iohook');
// const forceFocus = require('forcefocus');
require('windows-foreground-love').allowSetForegroundWindow();
const ks = require('node-key-sender');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  ioHook.start();

  ioHook.on('keydown', (keypress) => {
    const { rawcode: rawCode, shiftKey } = keypress;
    // console.log(keypress);
    if ((rawCode === 13 && shiftKey)) {
      console.log('showing');
      // mainWindow.setAlwaysOnTop(true);
      // mainWindow.maximize();
      mainWindow.show();
      // mainWindow.setAlwaysOnTop(false);
      // forceFocus.focusWindow(mainWindow);
      // mainWindow.focus();
      // app.focus();
    }

    if (rawCode === 27) {
      console.log('hiding');
      mainWindow.hide();
      ks.sendCombination(['alt', 'tab']);
      setTimeout(() => ks.sendCombination(['control', 'v']), 100);
    }
  });

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
    frame: false,
    // transparent: true,
    show: false,
  });
  mainWindow.maximize();
  mainWindow.minimize();
  mainWindow.setFullScreen(true);
  mainWindow.hide();
  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('before-quit', () => {
  ioHook.unload();
  ioHook.stop();
});


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
