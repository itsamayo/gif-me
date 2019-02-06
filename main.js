var menubar = require('menubar');

var mb = menubar();
mb.setOption( 'height', 600 );

mb.on('ready', function ready () {
  console.log('app is ready');
})

mb.on('after-create-window', function createWindow(){
	mb.window.openDevTools();	
})