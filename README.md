# FalixNodes Desktop v4
![image](https://user-images.githubusercontent.com/51213244/156048274-c4eb3840-8b3a-41be-8439-3fedc24f5aa5.png)

Simple and stylish to use! A centralized place to use all of FalixNodes like your client area, server panel, phpMyAdmin, status, and much more. Including more features VPN, SFTP, at a glance servers list, minecraft launcher, and more amazing features.

## FAQ 
Q: Why and what's the point of FalixNodes Desktop?

A: Originally, a member of the community developed the software to avoid having to use their web browser to access FalixNodes. Eventfully this 'community' software became official, and that member being Korbs. FalixNodes Desktop was designed to be a simple and quick method to access FalixNodes' services, and it still is. The software has improved greatly over the years and get better in each update.

<br/>

Q: Who are the developers behind FalixNodes Desktop?

A: FalixNodes Desktop is primarly developed and maintained by Korbs Studio. There are some contribors that have helped out in the past.

<br/>

Q: Can I use FalixNodes Desktop?

A: The software supports the following:
 - Windows 8.1/10/11
 - maccOS High Sierra and up
 - Linux (Debian/Fedora/Arch)

It is possible to run FalixNodes Desktop on other operating system like Windows 7 and ChromeOS, however we won't help you if the software is acting buggy on those operating system. As we don't officially support Windows 7 or ChromeOS, or anything else that isn't listed above. 

As for mobile, you can try out our mobile app, which is suppose to serve the same purpose as our desktop software.

<br/>

Q: Is this official software of FalixNodes?

A: Yes, FalixNodes Desktop is offical software and has been approved for FalixNodes since mid-2020.

<br/>

Q: If an update is available, how do I get it?

A: This is done automatically on Windows and Linux, with auto update. We recommend that you wait at the least 1 - 2 minutes for the update to download, or depending on your internet. This usually take about 10 - 30 seconds for decent internet(200mbps).

On macOS, however, each update must be installed manually by the user themself. No, you are not required to do this on a regular basis; nevertheless, updating FalixNodes Desktop is recommended if you want the most up-to-date version in general. It's difficult to support macOS for auto updating at the time being.

<br/>

Q: The CPU usage from FalixNodes Desktop is a bit high, what do I do?

A: FalixNodes Desktop does have a lot going on behind the scene when it's running. High CPU usage is mainly caused by ads loading in the background on the client area and servers panel, sometimes caused by the blur effect of the window. You can easily disable the blur affect in Customization, located in Settings. 

As for the ads, we can't do much about this. 

<br/>

Q: At a glance servers shows ads, in the Dashboard.

A: This feature is only built for premium users only., for the time being. If you do have premium, make sure you're logged in, in the client area then reload or restart FalixNodes Desktop.

<br/>

## FAQ - For Developers
Q: Why is Font Awesome included offline? Just use a script instead.

A: Yeah, you're right. I could just use one line of code, linking the script to Font Awesome, and it'll do the trick. But I don't like that for an Electron application.

I keep Font Awesome locally on the software for offline usage. If the user is not connected to the internet, the icons won't load unless Font Awesome if provided locally.

<br/>

Q: Why Electron and what is it?

A.1 (Why): I, Korbs, am mostly comfortable and knowledgeable with web coding languages such as HTML, CSS, and JavaScript, along with APIs by ElectronJS. Using Electron was the right approach for me, and I've acquired a huge amount of experience with it over the last three and a half years. The process of doing cross-platform support was also shortened and easier for me to do. I've also gotten very attach to Electron and am also most comfortable using technology built specifically for the framework like Electron Builder, Glasstron, and more.

A.2 (What): Electron is an open-source software framework developed and maintained by GitHub. It allows for the development of desktop GUI applications using web technologie. It combines the Chromium rendering engine and the Node.js runtime. - [Wikipedia](https://en.wikipedia.org/wiki/Electron_(software_framework))

<br/>

Q: What's the difference between the official X11 package and Korbs Studio's fork of X11?

A: Nothing, literally nothing. The fork only removes a lot of `console.log` code, so it would stop spitting out annoying "Bad Atom" errors when using Glasstron. Korbs Studio, nor the developer of Glasstron, don't know why these errors are happening. 

But I got sick of seeing the error over and over.

## How-To
### Chaning Panels' Destination
FalixNodes' has two panels for it's customers to use; for starters is the client area where customers can create, manage, or delete their server and also manage their account if needed; and then the servers panel where customers can interact with each of their servers from sending commands to the console, mananging and editing files, configuring databases, and much more. Since both of these panels are seperate, they both get their tab in FalixNodes Desktop, if you're forking this repo for another host, this *how-to* will show what you need to do in order to change both tabs to the host's panels instead of showing FalixNodes' panel.

First you need to know how each panel is setup in FalixNodes Desktop, as special functions are put in place to ensure better experience for the user. 

Let's discuss those functions first, they're three functions put in place for both panels: CSS injection, basic navigation, and domain restriction.

**CSS Injection**

As a visual appeal, FalixNodes Desktop has a blur effect applied behind it's window, with CSS injection this blur effect can be seen behind the WebView that the panel is displayed in. Without the CSS injection, this blur effect is not shown, and the background is plain solid in the WebView. Besides showing the blur effect, more CSS code has been added to change styles in the Pterodactyl panel that FalixNodes uses. If your host uses Pterodactyl, then you probably don't need to make any changes for the CSS injection in the Servers Panel, mostly. As for the Client Area, you will probably need to make changes on your own, you'll need to remove all CSS codes and just add more opacity to the webpage background.

**Basic Navigation**

In FalixNodes Desktop, you'll noticing when selecting either of the tabs, different controls are displayed in the sidenbar header, these controls are(obviously) for the selected panel. In order the controls shown are: Home, Refresh, Back, and Forward.

**Domain Restriction**

If a user clicks on something, commonly an advertisement, that directs them outside the panel's URL, the domain restriction script will display a security warning and then shortly redirect the user back to the panel.

This function has been created due to common cases where users will mistakingly click on advertisements. You'll need to modify the script to whitelist URLs you'll need to be accessed in both panels, make sure to include social logins if needed.

**Adjustments to CSS Injection**

 - Located At: `/src/base/js/webview/`
 - You can open developer tools for the panel if needed (e.x. `webviewCP.openDevTools()` in DevTools console)


**Adjustments to Domain Restriction**
 - Located At: `/src/base/js/webview/`
 The script uses an if statement and detects the URL the WebView is currently on. Viewing the script, you'll see that's it pretty straight forward to edit. As a reminder, add social logins if needed.

**Changing WebView Destination**

Of course, make sure to change where the WebView goes by default in the __index.html__ file. Simply edit the `src` variable.

### Managing Updates
**Building Your Own Update Server**

When a new update is available for FalixNodes Desktop, the app will detect that from a specific URL, that being __https://falixnodes.net/releases/updates/falixnodes-desktop/live/__. This is set in the __package.json__ file under the build configuration for `electron-builder`. All you really need is just a VPS/Web Server.

It's common for updates to be done with GitHub Releases when it comes to use Electron Builder handling updates, however I don't recommend this to avoid token conflicts in the future, so a VPS is more future-proof and as long as you have access to the domain and can afford renewing the domain down the line.

 - With GitHub Actions (Workflow is included with repo):

 If you want full automation, then you're in-luck! I've made sure that building and releasing updates for FalixNodes Desktop is fully automated by GitHub Actions. The workflow file that I've built does everything needed, in order: Build the app for each platform(Windows, macOS, and Linux), upload the new builds to VPS with SFTP to a prepare folder(Repo Secret required for SFTP username and password), and then copying the new builds on the VPS from the prepare folder to the live folder where the app will detect new updates.

 First, you'll need to setup three repo secrets for the VPS' IP address, username, and password. Adding information like this as secrets will keep the information hidden when looking at GitHub Actions logs.
 You'll need to add these secrets as is:
 IP: `SFTP_IP`
 Username: `SFTP_USERNAME`
 Password: `SFTP_PASSWORD`

 In the workflow file, you'll only need to edit the directory path that being `remoteDir`. If you don't, the upload will fail.

 The reason why you need a prepare folder for each operating system, is because the SFTP action used always overwrites the entire folder it uploads to, deleting all old files. 

 It usually takes 10 minutes to each build to occur and upload to the VPS(could vary on your VPS' network speed), so you'll need to add GitHub Actions onto your VPS so it can runs commands to move the builds from the prepare folders to the live folders. 
 Go to the repo settings > Actions > Runners and follow instructions.

 - Without GitHub Actions (Manually):

 If you're not interested in using GitHub Actions for automation, using an alternative, or maybe having trouble with it there is always the old fashioned way.
 Build the app for each OS you have access to by using the `npm run build` command and uploading it manually to your VPS.
 The following files must be included:

 (For Windows)
  - `.exe`
  - `.exe.blockmap`
  - `latest.yml`

 (For macOS)
  - `.dmg`
  - `.dmg.blockmap`
  - `latest-macos.yml`
  
 (For Linux)
  - `.AppImage`
  - `latest-linux.yml`

**NOTES**
> DMG files must be signed in order for auto updating to work, by default FalixNodes Desktop does not support auto updating for macOS in the first place. 

> Only the formats `nsis`, `dmg`, and `AppImage` are auto update supported in Electron Builder. So you must use these options.

> If you plan to publish app to Microsoft Store, you do not need to include AppX file in your update server. When running the app as a Windows UWP application, pinging the update server appears to be blocked causing the update to fail automatically. That is why auto update has been fully disabled if the application is detected running in the WindowsApp directory. (There are future plans to discontiue FalixNodes Desktop's Microsoft Store version, sorry if this disappoints you)

## Preparing to Develop FalixNodes Desktop
### Requirements
 - NodeJS 18 or up
 - Python 3.10 or up
 - g++ (Linux)
 - Visual Studio (Windows)
  - Development with C++
 - Visual C++ Redistributable (Windows)
 - At least 4GB of storage available, recommended is 8GB (macOS/Linux)
 - At least 8GB of storage available, recommended is 16GB (Windows)

 > If you're using Windows, please be using Windows 10 or Windows 11. Windows 8.1 or older are not supported by FalixNodes Desktop, older versions may be able to run the application but may run into some issues along the way.

### Building FalixNodes Desktop
#### Electron Builder Environment
You should probably adjust a few additional things for Electron Builder before building. 

First off, what is Electron Builder?

We can easily distribute FalixNodes Desktop cross-platform using Electron Builder, which has auto-update support out of the box. We can also distribute our software in other formats if we wanted to like Snap, MSI, PKG, etc.

<br/>

What needs to be changed?

We include assets with our setup files like banners, backgrounds, and licenes. If you're planning on building your software on top of a fork of FalixNodes Desktop, it's best you change these to not confuse users who will use your fork. 

Everything you need to change is located in the `/build` folder, also note that any files in this folder won't be distrbuted as part of the software itself. So if you were to set the software icon, and point to the icon file in the build folder, it won't work in production. The build folder is for Electron Builder only.

You need to change the following files as they may include the name "FalixNodes" or include screenshots of previous versions of FalixNodes Desktop:
 - `/build/background.png` - Background of the DMG installer (macOS)
 - `/build/installSidebar.bmp` - Sidebar banner of the NSIS installer (Windows)
 - `/build/license_*.txt` - All license files
 - `/build/icons/` - Obviously the icon, the icon included is trademark of FalixNodes Limited

 A Figma file is included if you want to the same layout for the background and banner, Figma is a free tool to use.

#### Metadata
Another thing to change is the metadata of FalixNodes Desktop like the ID, name, versions, update server location, and more.

The following should be changed in <u>package.json</u>:
 - Name
 - Under build config:
    - url
      - This tells the software where to pull new updates from
    - maintainer
      - Example: <u>com.electron.app</u>
    - shortcutName
    - description

Also if you plan to leave the settings page mostly as is, make sure to update the version number manually in there.

#### Building
Now to build the actual software, this process has been made more simple over time during the development of FalixNodes Desktop, all thanks to GitHub Actions and Electron Builder. 

With Electron Builder, you can simply run:
```
npm run build
```

Then Electron builder will start building for your operating system.

If you desire to, or are required to, create the software for multiple operating systems, you may leverage GitHub Actions. Using GitHub Actions, you can write software on many operating systems without having to use them. You can build a DMG file for macOS, for example, without owning or having access to a Mac. Workflow files have been added and are ready to be deployed.

## Support
Reach out to the maintainer at one of the following places:

- [GitHub issues](https://github.com/FalixNodes-Software/falixnodes-desktop/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+)
- Contact options listed on [Korbs Studio's GitHub profile](https://github.com/KorbsStudio)

## Contributing
Please read [our contribution guidelines](docs/CONTRIBUTING.md), and thank you for being involved!

## Security
FalixNodes Desktop follows good practices of security, but 100% security cannot be assured.
FalixNodes Desktop is provided **"as is"** without any **warranty**. Use at your own risk.

_For more information and to report security issues, please refer to our [security documentation](docs/SECURITY.md)._

## Acknowledgements
 - Creator/Developer: [Korbs Studio](https://korbsstudio.com/)
 - Past Contributors: 
  [LogicApples](https://github.com/LogicApples/), 
  [Alex](https://github.com/Alex-idk)

### Frameworks
 - Built on: [ElectronJS](https://electronjs.org/)
 - Styled with: [SASS](https://sass-lang.com/)

### Packages Used
 - For Blur composition effect: [Glasstron Clarity](https://code.korbsstudio.com/KorbsStudio/Glasstron-Clarity)
 - Building for distrubtion: [Electron Builder](https://github.com/electron-userland/electron-builder/)

### 3rd-Party Services
 - Command Menu: [Ninja Keys](https://github.com/ssleptsov/ninja-keys)
 - ~~Push Notifications: [Pushy](https://pushy.me/)~~
