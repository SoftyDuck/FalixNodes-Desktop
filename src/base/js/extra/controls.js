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

// Navigation Controls
function rootCP() {webviewCP.loadURL('https://client.falixnodes.net/')}
function reloadCP() {webviewCP.reload()}
function backCP() {webviewCP.goBack()}
function forwardCP() {webviewCP.goForward()}

function rootGP() {webviewGP.loadURL('https://dev-panel.falixnodes.net/')}
function reloadGP() {webviewGP.reload()}
function backGP() {webviewGP.goBack()}
function forwardGP() {webviewGP.goForward()}

// For Developers
function CP_wvDevTools(){webviewCP.openDevTools()}
function wvDevTools(){webviewGP.openDevTools()}

// CSS
webviewCP.addEventListener('dom-ready', function () {
    webviewCP.insertCSS(`
    body,
    .navbar-vertical .navbar-collapse,
    .navbar-glass,
    .dark .table, .bg-200
    {
        background: transparent !important;
        --falcon-table-striped-bg: transparent !important;
    }
    
    body::-webkit-scrollbar {
        width: 0px !important;
    }
    
    .card.py-3.mb-3,
    .card.h-100,
    .card.mb-3,
    .card.h-lg-100.overflow-hidden {
        border: 1px rgb(255 255 255 / 25%) solid !important;
        border-radius: 10px !important;
        padding: 16px 24px !important;
        display: flex !important;
        background: rgba(255,255,255,0.1) !important;
        margin-right: 12px !important;
        cursor: default !important;
    }
    .card.mb-3, .card.h-lg-100.overflow-hidden {padding: 0px !important}
    `)
})