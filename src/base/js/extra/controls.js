webview = document.querySelector('webview')
var webviewCP = document.getElementById('web-client-area');
var webviewGP = document.getElementById('web-servers-panel');
var webviewISAC = document.getElementById('inSettings-account');

// Toggle Controls in Sidebar Header
function toggleDefaultControls() { /* Show default controls when user selects other tabs other than panels */
    document.querySelector('.sidebar-header-controls#master-control-client-area').style.display = 'none';
    document.querySelector('.sidebar-header-controls#master-control-servers-panel').style.display = 'none';
    document.querySelector('.sidebar-header-controls#default').style.display = 'initial';
}

function toggleCAControls() { /* Show Client Area controls */
    document.querySelector('.sidebar-header-controls#master-control-client-area').style.display = 'initial';
    document.querySelector('.sidebar-header-controls#master-control-servers-panel').style.display = 'none';
    document.querySelector('.sidebar-header-controls#default').style.display = 'none';
}

function toggleSPControls() { /* Show Servers Panel controls */
    document.querySelector('.sidebar-header-controls#master-control-servers-panel').style.display = 'initial';
    document.querySelector('.sidebar-header-controls#master-control-client-area').style.display = 'none';
    document.querySelector('.sidebar-header-controls#default').style.display = 'none';
}

// For Developers
function CP_wvDevTools(){webviewCP.openDevTools()}
function wvDevTools(){webviewGP.openDevTools()}