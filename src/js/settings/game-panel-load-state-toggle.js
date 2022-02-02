var setTheme = localStorage.getItem('game-panel-load-state')
console.log('Game Panel by default is:', setTheme)
if (setTheme == null){
    setGPLS('./css/settings/game-panel-load-state/off.css')
}else{
    setGPLS(setTheme)
}
function setGPLS(sheet){
  document.getElementById('game-panel-load-state').href = sheet
  localStorage.setItem('game-panel-load-state', sheet)
}