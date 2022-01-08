function hotkeys(e) {

    if (e.ctrlKey && e.key === '2') {hk_open_clientPanel();}
    if (e.ctrlKey && e.key === '3') {hk_open_gamePanel();}
    if (e.ctrlKey && e.key === '4') {hk_open_phpmyadmin();}
    if (e.ctrlKey && e.key === '.') {hk_open_helpCenter();}
    if (e.ctrlKey && e.key === ',') {hk_open_settings();}
}

function hk_open_clientPanel() {document.getElementById("nav_to_clientPanel").click();}
function hk_open_gamePanel() {document.getElementById("nav_to_gamePanel").click();}
function hk_open_phpmyadmin() {document.getElementById("nav_to_phpmyadmin").click();}
function hk_open_helpCenter() {document.getElementById("nav_to_helpCenter").click();}
function hk_open_settings() {document.getElementById("nav_to_settings").click();}
document.addEventListener('keyup', hotkeys, false);