var setTheme = localStorage.getItem('accent')
console.log('Accent Color:', setTheme)
if (setTheme == null){
    setAccentColor('./assets/stylesheets/settings/accent-color/default.css')
}else{
    setAccentColor(setTheme)
}
function setAccentColor(sheet){
  document.getElementById('accent-setting').href = sheet
  localStorage.setItem('accent', sheet)
}