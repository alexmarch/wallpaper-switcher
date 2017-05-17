'use strict';
const electron = require('electron');
// const electronReload = require('electron-reload');
// const livereload = require('electron-livereload');
const app = electron.app;
const iconPath = require('path').join(__dirname, 'app/src/assets/icons/64x64.png');
// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	console.log(iconPath);
	const win = new electron.BrowserWindow({
	  titleBarStyle: 'hidden',
		width: 1320,
		height: 800,
		center: true,
		resizable: false,
		icon: iconPath
	});

	win.loadURL(`file://${__dirname}/index.html`);

	// Development mode
	if ( process.env.NODE_ENV === 'development' ) {
		// electronReload(`${__dirname}/app/dist`);
		// win.webContents.openDevTools();
	}

	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
		//livereload.client(mainWindow);
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	//livereload.client(mainWindow);
});
