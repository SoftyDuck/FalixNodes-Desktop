if(!localStorage.getItem("firstBoot")){
  console.log('New user, showing welcome screen') // This will show up if your cache was clear or the item was removed from local storage
  setTimeout(() => {
    document.write('<style>.content {opacity: 0.4; background: rgb(11 23 37 / 80%) !important;} div#window-controls, div#game_panel, div#client_panel, div#help_center, div#support, div#terminal_mining, div#settings, div#sb_ct {display: none;}</style> <div include-html="./index.html"></div> <div include-html="./welcome.html"></div> <script src="./js/ui/include.js"></script> <script>includeHTML();</script> <script src="./js/switchIndex.js"></script>')
  }, 1000);
}else{
  console.log('Existing user, aborting welcome screen.');
}