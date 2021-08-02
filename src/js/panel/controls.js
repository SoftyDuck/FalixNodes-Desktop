webview = document.querySelector('webview')
var webviewCP = document.getElementById('client_panel_wv');
var webviewGP = document.getElementById('game_panel_wv');

// For Developers
function CP_wvDevTools(){webviewCP.openDevTools()}
function wvDevTools(){webviewGP.openDevTools()}

// General Controls
function CP_wvGoBack(){webviewCP.goBack()}
function CP_wvGoForward(){webviewCP.goForward()}
function CP_mvBlank(){webviewCP.loadURL('https://software.falixnodes.net/blank/')}
function mvClientPanel(){webviewCP.loadURL('https://client.falixnodes.net/')}

function wvGoBack(){webviewGP.goBack()}
function wvGoForward(){webviewGP.goForward()}
function mvBlank(){webviewGP.loadURL('https://software.falixnodes.net/blank/')}
function mvGamePanel(){webviewGP.loadURL('https://panel.falixnodes.net/')}

// Other Functions
function loadGamePanel() {
  mvGamePanel();
  document.getElementById('game_panel_wv').style.display = 'inline-flex';
  document.getElementById('game_panel-loaded').style.display = 'inline-flex';
}

function unloadGamePanel() {
  mvBlank();
  document.getElementById('game_panel_wv').style.display = 'none';
  document.getElementById('game_panel-loaded').style.display = 'none';
}

// Detect Loading State
// onload = () => {
//   const indicator = document.querySelector('.indicator')

//   const loadstart = () => {
//       console.log('Webview is loading')
//   }

//   const loadstop = () => {
//       console.log('Webview is done loading')
//   }

//   webviewGP.addEventListener('did-start-loading', loadstart)
//   webviewGP.addEventListener('did-stop-loading', loadstop)
// }