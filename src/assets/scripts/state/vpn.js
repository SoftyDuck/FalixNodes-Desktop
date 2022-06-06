let switches = document.getElementsByClassName('switch');
let VPNob = localStorage.getItem('VPNob');

if (VPNob == null) {
  setVPNOB('On');
} else {
  setVPNOB(VPNob);
}

for (let i of switches) {
  i.addEventListener('click', function () {
    let theme = this.dataset.theme;
    setVPNOB(theme);
  });
}

function setVPNOB(theme) {
  if (theme == 'On') {
      setTimeout(() => {
        document.querySelector('sidebar .top button#setup-vpnsetup').setAttribute('onclick', 'toTab("VPN-Setup", this, "#2970CC")')
        document.querySelector('sidebar .top button#setup-vpnsetup i').setAttribute('class', 'fa-light fa-globe')
        document.querySelector('sidebar .top button#setup-vpn').style.cursor = 'default'
        document.querySelector('sidebar .top button#setup-vpn').style.display = 'none'
        document.querySelector('sidebar .top button#setup-vpnsetup').style.display = 'inherit'
      }, 6000);
  }
  else if (theme == 'Off') {
      setTimeout(() => {
        document.querySelector('sidebar .top button#setup-vpn').setAttribute('onclick', 'toTab("VPN", this, "#2970CC")')
        document.querySelector('sidebar .top button#setup-vpnsetup i').setAttribute('class', 'fa-light fa-globe')
      }, 6000);
  }
  localStorage.setItem('VPNob', theme);
}