function repeat_checkNetwork() {
  checkNetwork();
  setTimeout(repeat_checkNetwork, 1000);
}
repeat_checkNetwork();

function checkNetwork() {
  if (navigator.onLine) {
    console.log('Internet Connection Restored')
      document.getElementById("nd_offline").style.display = 'none';
      document.getElementById("nd_online").style.display = 'inherit';
  } else {
    console.log('Internet Connection Lost')
      document.getElementById("nd_offline").style.display = 'inherit';
      document.getElementById("nd_online").style.display = 'none';
  }
}