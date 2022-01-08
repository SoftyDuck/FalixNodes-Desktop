var ifConnected = window.navigator.onLine;
var updateServer = "https://updates.korbsstudio.com/check.png";
var updateServerCR = new Image();

checkNetwork();

function checkNetwork() {
    document.getElementById('checklist-one').style.display = 'inherit';
    if (ifConnected) {
        console.log('An internet connection is available.');
        checkUpdateServer();
    } else {
        console.log('An internet connection is not available.');
        document.getElementById('checklist-one').style.display = 'none';
        document.getElementById('checklist-one-failing').style.display = 'inherit';
        setTimeout(() => {
            location.href = "./index.html";
        }, 5000);
    }
}

function checkUpdateServer() {
    document.getElementById('checklist-one').style.display = 'none';
    document.getElementById('checklist-one-failing').style.display = 'none';
    document.getElementById('checklist-two').style.display = 'inherit';
    updateServerCR.src = updateServer;
    updateServerCR.onload = function(){carryOn();}
    updateServerCR.onerror = function(){
        document.getElementById('checklist-two').style.display = 'none';
        document.getElementById('checklist-two-failed').style.display = 'inherit';
        setTimeout(() => {
            carryOn();
        }, 2000);
    }
}

function carryOn() {
    document.getElementById('checklist-two').style.display = 'none';
    document.getElementById('checklist-two-failed').style.display = 'none';
    document.getElementById('checklist-three').style.display = 'inherit';
    setTimeout(() => {
        window.api.send('launch')
    }, 2500);
}