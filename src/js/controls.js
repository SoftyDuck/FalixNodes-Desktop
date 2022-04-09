webview = document.querySelector('webview')
var webviewCP = document.getElementById('client_panel_wv');
var webviewGP = document.getElementById('game_panel_wv');
var webviewSP = document.getElementById('support_wv')
var webviewAC = document.getElementById('account_wv')
var webviewHC = document.getElementById('help_wv')
var webviewSU = document.getElementById('uptime')
var webviewPosts = document.getElementById('postview')

// For Developers
function CP_wvDevTools(){webviewCP.openDevTools()}
function wvDevTools(){webviewGP.openDevTools()}
function SP_wvDevTools(){webviewSP.openDevTools()}
function webviewAC(){webviewAC.openDevTools()}
function webviewHC(){webviewHC.openDevTools()}
function SU_wvDevTools(){webviewSU.openDevTools()}

// Log Out Function
function logOutEverywhere() {
  webviewCP.loadURL('https://client.falixnodes.net/logout')
  webviewGP.loadURL('https://panel.falixnodes.net/auth/logout')
}

// General Controls
function CP_wvGoBack(){webviewCP.goBack()}
function CP_wvGoForward(){webviewCP.goForward()}
function CP_mvBlank(){webviewCP.loadURL('https://desktop.falixnodes.net/blank/')}
function mvClientPanel(){webviewCP.loadURL('https://client.falixnodes.net/')}

function wvGoBack(){webviewGP.goBack()}
function wvGoForward(){webviewGP.goForward()}
function mvBlank(){webviewGP.loadURL('https://desktop.falixnodes.net/blank/')}
function mvGamePanel(){webviewGP.loadURL('https://panel.falixnodes.net/')}

// Other Functions
function loadGamePanel() {
  mvGamePanel();
  document.getElementById('game_panel_wv').style.display = 'inline-flex';
  document.getElementById('game_panel-loaded').style.display = 'inline-flex';
  document.getElementById('game_panel-unloaded').style.display = "none";
}

function unloadGamePanel() {
  mvBlank();
  document.getElementById('game_panel_wv').style.display = 'none';
  document.getElementById('game_panel-loaded').style.display = 'none';
  document.getElementById('game_panel-unloaded').style.display = "inherit";
}


onload = () => {
  const loadingAV = document.querySelector('.IndicatorAV')
  const loadingCP = document.querySelector('.IndicatorCP')
  const loadingGP = document.querySelector('.IndicatorGP')
  const loadingHC = document.querySelector('.IndicatorHC')
  const loadingAC = document.querySelector('.IndicatorSE')

  const loadstartAV = () => {document.getElementById('IndicatorAV').style.display='unset'}
  const loadstopAV = () => {setTimeout(function(){document.getElementById('IndicatorAV').style.display='none'}, 500);}

  const loadstartCP = () => {document.getElementById('IndicatorCP').style.display='unset'}
  const loadstopCP = () => {setTimeout(function(){document.getElementById('IndicatorCP').style.display='none'}, 500);}

  const loadstartGP = () => {document.getElementById('IndicatorGP').style.display='unset'}
  const loadstopGP = () => {setTimeout(function(){document.getElementById('IndicatorGP').style.display='none'}, 500);}

  const loadstartHC = () => {document.getElementById('IndicatorHC').style.display='unset'}
  const loadstopHC = () => {setTimeout(function(){document.getElementById('IndicatorHC').style.display='none'}, 500);}

  const loadstartAC = () => {document.getElementById('IndicatorSE').style.display='unset'}
  const loadstopAC = () => {setTimeout(function(){document.getElementById('IndicatorSE').style.display='none'}, 500);}

  webviewPosts.addEventListener('did-start-loading', loadstartAV)
  webviewPosts.addEventListener('did-stop-loading', loadstopAV)

  webviewCP.addEventListener('did-start-loading', loadstartCP)
  webviewCP.addEventListener('did-stop-loading', loadstopCP)

  webviewGP.addEventListener('did-start-loading', loadstartGP)
  webviewGP.addEventListener('did-stop-loading', loadstopGP)

  webviewHC.addEventListener('did-start-loading', loadstartHC)
  webviewHC.addEventListener('did-stop-loading', loadstopHC)

  webviewAC.addEventListener('did-start-loading', loadstartAC)
  webviewAC.addEventListener('did-stop-loading', loadstopAC)
}


var webview = document.getElementById('uptime');
webview.addEventListener('dom-ready', function () {
    webview.insertCSS('body, .page-content, div#bulkreportcontainer, html {background: transparent !important;} *{border:none!important}::-webkit-scrollbar{width:0!important}.page-header,.page-prefooter{display:none!important}.note.note-success.note-bordered{display:none!important}div#twitterport_md{display:none!important}.col-lg-4.col-md-6.col-sm-6.col-xs-12.searchcol{display:none!important}.col-lg-4.col-md-6.col-sm-6.col-xs-12.overalluptime{display:none!important}.col-lg-4.col-md-12.col-sm-12.col-xs-12.dbbtns,.col-lg-4.col-md-12.col-sm-12.col-xs-12.dbbtns.dbbtnstop{display:none!important}#bulkreportcontainer #datatable_products,.portlet.light{background-color:transparent!important;color:#fff!important}#bulkreportcontainer .table-bordered>tbody>th,#bulkreportcontainer table .heading{display:none!important}.table-bordered{border:none!important}#bulkreportcontainer .table-bordered>tbody>tr>td,#bulkreportcontainer .table-bordered>tbody>tr>th,#bulkreportcontainer .table-bordered>tfoot>tr>td,#bulkreportcontainer .table-bordered>tfoot>tr>th,#bulkreportcontainer .table-bordered>thead>tr>td,#bulkreportcontainer .table-bordered>thead>tr>th{border:none!important;border-bottom:none!important}#bulkreportcontainer .table-bordered>tbody>tr[role=row]{border:none!important;background:#0b1725!important}#bulkreportcontainer .table-bordered>tbody>tr>td,#bulkreportcontainer .table-bordered>tbody>tr>th,#bulkreportcontainer .table-bordered>tfoot>tr>td,#bulkreportcontainer .table-bordered>tfoot>tr>th,#bulkreportcontainer .table-bordered>thead>tr>td,#bulkreportcontainer .table-bordered>thead>tr>th{border:none!important}.portlet.light{margin-top:-40px!important}div#bulkreportcontainer{background:#162230!important}.row.reglnk{text-align:left!important;position:absolute!important;margin:-25px 0 0 22px!important;pointer-events:none!important}')
});

var webview_account = document.getElementById('account_wv');
webview_account.addEventListener('dom-ready', function () {
    webview_account.insertCSS('body {background: transparent !important;} nav.navbar.navbar-light.navbar-glass.navbar-top.navbar-expand {display: none !important;}.card-body.position-relative {display: none !important;}div#adngin-bottom_leaderboard_client_panel-0 {display: none !important;}')
});

webviewCP.addEventListener('dom-ready', function () {webviewCP.insertCSS('body {background: transparent !important;} .navbar-vertical .navbar-collapse {width: 100%;position: fixed;left: 0px;text-align: center;}');});

webviewPosts.addEventListener('dom-ready', function () {webviewPosts.insertCSS('body {background: transparent !important} header, footer {display: none !important;} .content {top: 10px !important;}')});

webviewGP.addEventListener('dom-ready', function () {webviewGP.insertCSS('body {background: transparent !important;}')})
webviewHC.addEventListener('dom-ready', function () {webviewHC.insertCSS('#lunrsearchresults{background: transparent !important;} #bg-art-he::before {opacity: 0.7} body {background: transparent !important;} footer, header {display: none !important;} .article-header {margin-bottom: 80px !important;margin-top: -40px !important;} #date {top: 36px !important;}')
});