var url = window.location.href;
if(url.startsWith("https://falixnodes.net/")
|| url.startsWith("https://client.falixnodes.net/")
|| url.startsWith("https://panel.falixnodes.net/")
|| url.startsWith("https://start.falixnodes.net/")
|| url.startsWith("https://help.falixnodes.net/")
|| url.startsWith("https://support.falixnodes.net/")
|| url.startsWith("https://software.falixnodes.net/")
|| url.startsWith("https://discord.com/")
|| url.startsWith("http://localhost:9999/domain-access.html")
)
{} else {setTimeout(() => {location.href = 'http://localhost:9999/domain-access.html'}, 500);}