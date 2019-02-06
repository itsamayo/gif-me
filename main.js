var menubar = require('menubar');
const config = require('./assets/js/config');
const {app, BrowserWindow} = require('electron');
const contextMenu = require('electron-context-menu');
const path = require('path');

var mb = menubar();
mb.setOption( 'height', 600 );

var iconPath = path.join(__dirname, '/assets/images/menuicon.png');

// Set default icon
mb.setOption( 'icon', iconPath );

mb.on('ready', function ready () {
  console.log('app is ready');
})

mb.on('after-create-window', function createWindow(){
  if(config.dev == true){
    mb.window.openDevTools();	
  }  
})

contextMenu({
  showSaveImageAs: true,
  showInspectElement: false
});