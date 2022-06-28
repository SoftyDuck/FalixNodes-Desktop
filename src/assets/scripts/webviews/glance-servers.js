var url = window.location.href;

setTimeout(() => {
    document.querySelectorAll('style,link[rel="stylesheet"]')
    .forEach(element => element.remove())

    if(window.location.href.match("https://dev-panel.falixnodes.net/auth/login"))
    {setTimeout(() => {
        document.getElementById("app").innerHTML = '<p id="falix-desktop-glance">Server panel login is required to view your servers. <a style="text-decoration: underline; cursor: pointer;" href="https://panel.falixnodes.net/">Reload Componment</a></p><style>#falix-desktop-glance {display: inherit; pointer-events: all;}</style>';
    }, 1000);} else {console.log('null')}
}, 1000);