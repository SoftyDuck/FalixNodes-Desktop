function toTab(pageName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "inherit";
    elmnt.style.backgroundColor = color;
}

do {
  selectDashboard()
}
while (addComponent());

function selectDashboard() {
  setTimeout(() => {
    document.querySelector("button#fxdk1").click();
  }, 1000);
}

function toNotifications() {
  document.querySelector('.tabs#dashboard').style.display = 'none'
  document.querySelector('.tabs#notifications').style.display = 'block'
  document.querySelector('.tabs#settings').style.display = 'none'
}
function toSettings() {
  document.querySelector('.tabs#dashboard').style.display = 'none'
  document.querySelector('.tabs#notifications').style.display = 'none'
  document.querySelector('.tabs#settings').style.display = 'grid'
}
function toDashboard() {
  document.querySelector('.tabs#dashboard').style.display = 'grid'
  document.querySelector('.tabs#notifications').style.display = 'none'
  document.querySelector('.tabs#settings').style.display = 'none'
}

function tgMH() {
  document.querySelector('button#command-menu-o').style.display = 'none';
  document.querySelector('button#profile').style.display = 'none';
}
function tgMS() {
  document.querySelector('button#command-menu-o').style.display = 'inherit';
  document.querySelector('button#profile').style.display = 'inherit';
}