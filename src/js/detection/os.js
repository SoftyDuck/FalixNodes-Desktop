(function() {

    var htmlElement = document.documentElement;
  
    if (navigator.platform.match(/(Mac)/i)) {
      htmlElement.className = 'mac';
    } else if (navigator.platform.match(/(Windows)/i)) {
      htmlElement.className = 'windows';
    } else if (navigator.platform.match(/(Linux)/i)) {
      htmlElement.className = 'linux';
    }
  
    document.addEventListener('click', function(event) {
      var target = event.target;
      if (target.getAttribute && target.getAttribute('data-action') === 'switch-os') {
        event.preventDefault();
        htmlElement.className = target.getAttribute('data-os')
      }
    })
})();