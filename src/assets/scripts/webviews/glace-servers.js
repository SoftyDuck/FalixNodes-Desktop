var url = window.location.href;

if(url.endsWith("/auth/login/"))
{setTimeout(() => {
    document.getElementById("app").innerHTML = '<p id="falix-desktop-glace">Server panel login is required to view your servers. <a style="text-decoration: underline" href="https://panel.falixnodes.net/">Reload Componment</a></p><style>#falix-desktop-glace {display: inherit}</style>';
}, 250);} else {}