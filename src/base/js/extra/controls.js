webview = document.querySelector('webview')
var webviewCP = document.getElementById('web-client-area');
var webviewGP = document.getElementById('web-servers-panel');

// Toggle Controls in Sidebar Header
function toggleDefaultControls() {
    document.querySelector('.sidebar-header-controls#master-control-client-area').style.display = 'none';
    document.querySelector('.sidebar-header-controls#master-control-servers-panel').style.display = 'none';
    document.querySelector('.sidebar-header-controls#default').style.display = 'initial';
}

function toggleCAControls() {
    document.querySelector('.sidebar-header-controls#master-control-client-area').style.display = 'initial';
    document.querySelector('.sidebar-header-controls#master-control-servers-panel').style.display = 'none';
    document.querySelector('.sidebar-header-controls#default').style.display = 'none';
}

function toggleSPControls() {
    document.querySelector('.sidebar-header-controls#master-control-servers-panel').style.display = 'initial';
    document.querySelector('.sidebar-header-controls#master-control-client-area').style.display = 'none';
    document.querySelector('.sidebar-header-controls#default').style.display = 'none';
}

// For Developers
function CP_wvDevTools(){webviewCP.openDevTools()}
function wvDevTools(){webviewGP.openDevTools()}