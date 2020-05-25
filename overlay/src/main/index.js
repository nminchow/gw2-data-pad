import { app, BrowserWindow, ipcMain, clipboard, Tray, Menu } from 'electron' // eslint-disable-line
import { keyTap } from 'robotjs';
import path from 'path';

// need this to get vuex store working for some reason
// https://github.com/vue-electron/vuex-electron/issues/12
// eslint-disable-next-line no-unused-vars
import store from '../renderer/store';

const ioHook = require('iohook');
// const forceFocus = require('forcefocus');
require('windows-foreground-love').allowSetForegroundWindow();

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let visible = false;

let mainWindow;
let tray;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;


const close = (paste = false) => {
  if (!mainWindow.isFocused() || !visible) return;
  visible = false;
  mainWindow.hide();
  // ks.sendCombination(['alt', 'tab']);
  keyTap('escape', ['alt']);
  if (!paste) return;
  console.log(clipboard.readText());
  setTimeout(() => keyTap('v', ['control']), 200);
  // setTimeout(() => keyTap('z'), 100);
  // setTimeout(() => clipboard.paste, 3000);
};

ipcMain.on('close', (_event, paste) => {
  close(paste);
});

function createWindow() {
  ioHook.start();

  console.log(process.version);

  ioHook.on('keydown', (keypress) => {
    const { rawcode: rawCode, shiftKey } = keypress;
    // console.log(keypress);
    if ((rawCode === 13 && shiftKey)) {
      console.log('showing');
      mainWindow.webContents.send('focused');
      clipboard.clear();
      // mainWindow.setAlwaysOnTop(true);
      // mainWindow.maximize();
      mainWindow.show();
      visible = true;
      // mainWindow.setAlwaysOnTop(false);
      // forceFocus.focusWindow(mainWindow);
      // mainWindow.focus();
      // app.focus();
    }

    if (rawCode === 27) {
      console.log('closing');
      close(true);
    }
  });

  tray = new Tray(path.join(__static, '/core.png'));
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Quit', click() { app.quit(); } },
  ]));
  tray.setToolTip('GW2 Data Pad');

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webviewTag: true,
    },
    frame: false,
    transparent: true,
    fullscreen: true,
    // show: false,
  });
  // mainWindow.maximize();
  // mainWindow.minimize();
  // mainWindow.maximize();
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
