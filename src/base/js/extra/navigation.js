// Sidebar Tabs

function toTab(pageName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("sidebar-tab");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "inherit";
    elmnt.style.backgroundColor = color;
}

function toSettingsTab(pageName,elmnt,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("hs-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("modal-sidebar-tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "inherit";
  elmnt.style.backgroundColor = color;
}

// Toast
function toastRR() {
    document.querySelector("#username-set").style.display = 'inherit'
    setTimeout(() => {document.querySelector("#username-set").style.opacity = '1'}, 1000)
    setTimeout(() => {document.querySelector("#username-set").style.opacity = '0'}, 3000)
    setTimeout(() => {document.querySelector("#username-set").style.display = 'none'}, 4000)
}
// Modals
function toggleModal(modalName) {
    var i, modalcontent;
    modalcontent = document.getElementsByClassName("modal");
    for (i = 0; i < modalcontent.length; i++) {
        modalcontent[i].style.display = "none";
    }
    document.getElementById(modalName).style.display = "inherit";
}

function modalOpen() {
  document.querySelector(".modal#backdrop").style.filter = 'opacity(0.5)'
}

function modalClose() {
  document.querySelector(".modal#backdrop").style.filter = 'opacity(0)'
}

//// Modals - Settings - Troubleshoot Navigation

function TroubleshootingHideStart() {document.querySelector("#troubleshooting > div.co1").style.display = 'none'}
function TroubleshootingShowStart() {document.querySelector("#troubleshooting > div.co1").style.display = 'grid'}

function Troubleshooting(pageName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("troubleshoot-check");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(pageName).style.display = "inherit";
}

// Do on startup

setTimeout(() => {
  document.querySelector("body > div > sidebar > div > div.sidebar-top > button:nth-child(1)").click();
  document.querySelector("#settings > div:nth-child(1) > div > div.modal-sidebar-top > div:nth-child(1)").click();1
  Troubleshooting('null')
}, 2500);