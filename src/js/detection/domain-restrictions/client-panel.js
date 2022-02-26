var url = window.location.href;
if(url.startsWith("https://client.falixnodes.net/")
|| url.startsWith("https://discord.com/")
|| url.startsWith("https://accounts.google.com/")
)
{} else {setTimeout(() => {location.href = 'https://client.falixnodes.net/'}, 250);}