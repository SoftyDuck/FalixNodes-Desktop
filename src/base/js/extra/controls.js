webview = document.querySelector('webview')
var webviewCP = document.getElementById('web-client-area');
var webviewGP = document.getElementById('web-servers-panel');
var webviewHC = document.getElementById('web-help-center');
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

    

    a#navbarDropdownUser {
        background: #ffffff1a !important;
        padding: 4px 12px !important;
        border-radius: 50px !important;
        border: 1px rgb(255 255 255 / 25%) solid !important;
    }
    
    .card {
        border: 1px rgb(255 255 255 / 25%) solid !important;
        border-radius: 10px !important;
        background: rgba(255,255,255,0.1) !important;
        margin-right: 12px !important;
        cursor: default !important;
    }
    `)
})

webviewGP.addEventListener('dom-ready', function () {
    webviewGP.insertCSS(`
    body,
    .bg-neutral-900,
    .jZPsWO
    {
        background: transparent !important;
    }

    .bg-neutral-900,
    .jZPsWO
    {
        box-shadow: none !important;
    }
    
    body::-webkit-scrollbar {
        width: 0px !important;
    }

    .card, .style-module_1WqkLT9X, .oLbNP, .style-module_2Vp6MaXq, .style-module_2XbmHEcn.group, .shadow-md.rounded.p-3.text-xs.bg-gray-600 {
        border: 1px rgb(255 255 255 / 25%) solid !important;
        border-radius: 10px !important;
        padding: 16px 24px !important;
        background: rgba(255,255,255,0.1) !important;
        margin-right: 12px !important;
        cursor: default !important;
    }
    .style-module_2Vp6MaXq {padding: 0px 16px !important}
    .style-module_2XbmHEcn.group {padding: 6px !important}
    .style-module_1WqkLT9X {
        border: none !important
        border-radius: 0px !important;
        margin-bottom: 0px !important;
        padding: 0px !important;
    }
    .jRrWLs {
        background: #ffffff1a !important;
        border-radius: 10px 10px 0px 0px !important;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 0px !important;
        box-shadow: rgb(255 255 255 / 10%) 0px 0px 0px 1px inset, rgb(255 255 255 / 10%) 0px 0px 0px 4px inset;
    }
    `)
})

webviewHC.addEventListener('dom-ready', function () {
    webviewHC.insertCSS(`
    body, .las-articles, .article-metadata :before {
        background: transparent !important;
    }
    header, footer {
        display: none !important;
    }
    .content {
        top: 0px !important;
    }
    #minecraft.las-articles,
    #falix.las-articles,
    #discord.las-articles {
        border: 1px rgb(255 255 255 / 25%) solid !important;
        border-radius: 10px !important;
        background: rgba(255,255,255,0.1) !important;
        margin-right: 12px !important;
        cursor: default !important;
    }
    .las-header {
        background: #ffffff1a;
        margin: 0px;
    }
    `)
})