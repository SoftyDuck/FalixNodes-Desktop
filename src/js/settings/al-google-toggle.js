var setTheme = localStorage.getItem('auto-login-google')
console.log('Auto Login:', setTheme)
if (setTheme == null){
  setalG('./css/settings/auto-login/google/off.css')
}else{
  setalG(setTheme)
}
function setalG(sheet){
  document.getElementById('auto-login-google-setting').href = sheet
  localStorage.setItem('auto-login-google', sheet)
}