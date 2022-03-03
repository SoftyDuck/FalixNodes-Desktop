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

setTimeout(() => {
    document.getElementById("fxdk1").click();
}, 0400);

function toNotifications() {
  document.querySelector('.tabs#notifications').style.display = 'block'
  document.querySelector('.tabs#dashboard').style.animation = '0.6s sidebarOut ease-in-out'
  document.querySelector('.tabs#notifications').style.animation = '0.6s sidebarIn ease-in-out'
  setTimeout(() => {
    document.querySelector('.tabs#dashboard').style.display = 'none'
    document.querySelector('.tabs#dashboard').style.transform = 'translate(-100px)'
    document.querySelector('.tabs#notifications').style.transform = 'translate(0px)'
  }, 0600);
}
function toDashboard() {
  document.querySelector('.tabs#dashboard').style.display = 'grid'
  document.querySelector('.tabs#notifications').style.animation = '0.6s sidebarOut ease-in-out'
  document.querySelector('.tabs#dashboard').style.animation = '0.6s sidebarIn ease-in-out'
  setTimeout(() => {
    document.querySelector('.tabs#notifications').style.display = 'none'
    document.querySelector('.tabs#notifications').style.transform = 'translate(100px)'
    document.querySelector('.tabs#dashboard').style.transform = 'translate(0px)'
  }, 0600);
}