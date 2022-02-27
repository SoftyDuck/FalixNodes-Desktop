var setTheme = localStorage.getItem('auto-login-discord')
console.log('Auto Login:', setTheme)
if (setTheme == null){
  setalD('./css/settings/auto-login/discord/off.css')
}else{
  setalD(setTheme)
}
function setalD(sheet){
  document.getElementById('auto-login-discord-setting').href = sheet
  localStorage.setItem('auto-login-discord', sheet)
}