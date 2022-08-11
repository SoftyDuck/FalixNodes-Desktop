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

function toggleModal(pageName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("modal");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(pageName).style.display = "inherit";
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

do {
  document.querySelector("body > sidebar > div > div.sidebar-top > button:nth-child(1)").click();
  document.querySelector("#settings > div.modal-sidebar > div.modal-sidebar-top > div:nth-child(1)").click();
}
while (addComponent());