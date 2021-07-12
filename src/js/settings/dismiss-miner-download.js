var setTheme = localStorage.getItem('dismissMinerDownload')
console.log('Dismiss Miner Download:', setTheme)
if (setTheme == null){
    dismissMinerDownload('./css/miner-download/keep.css')
}else{
  dismissMinerDownload(setTheme)
}
function dismissMinerDownload(sheet){
  document.getElementById('dismissMinerDownload').href = sheet
  localStorage.setItem('dismissMinerDownload', sheet)
}