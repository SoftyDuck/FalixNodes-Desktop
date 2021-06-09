if(!localStorage.getItem("firstBoot")){
  console.log('New user, showing welcome screen') // This will show up if your cache was clear
  localStorage.setItem("firstBoot","true");
  setTimeout(() => {
    createBrowserWindow();
  }, 5250);
}else{
  console.log('Existing user, aborting welcome screen.');
}

function createBrowserWindow() {
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const welcome = new BrowserWindow({
    height: 360,
    width: 500,
    autoHideMenuBar: true,
    resizable: false,
    maxHeight: false,
    center: true,
    webPreferences: {
      devTools: true
    }
  });
  welcome.loadFile('./src/welcome.html');
  mainWindow.hide;
  setTimeout(() => {mainWindow.hide();}, 5500);
}