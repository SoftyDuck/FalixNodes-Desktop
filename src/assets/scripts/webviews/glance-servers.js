var url = window.location.href;

setTimeout(() => {
    if(url.match("https://dev-panel.falixnodes.net/auth/login"))
    {setTimeout(() => {
        document.getElementById("app").innerHTML = '<p id="falix-desktop-glance">Server panel login is required to view your servers. <a style="text-decoration: underline" href="https://panel.falixnodes.net/">Reload Componment</a></p><style>#falix-desktop-glance {display: inherit}</style>';
    }, 1000);} else {console.log('null')}
}, 6000);