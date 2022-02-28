![image](https://i.imgur.com/7yzQ8u1.png)

Simple and stylish to use! Access FalixNodes features such as your client and game panel, help center, phpMyAdmin, status, and more all from a centralized place.

[Download Now](https://desktop.falixnodes.net/)  
[View on Electron Apps](https://www.electronjs.org/apps/falix-software)

___

### To Do List
 - More customization
   - (?) Toggle native titlebar for Windows and macOS
   - Sidebar wallpaper (Disables blur)
   - Run on startup (Windows)
   - Return compact sidebar (Control alternative style needed)
   - Custom color
   - Toggle tabs
   - On start tab
   - Splash [Disable, Simple, Default, Show in App]
 - Create custom sounds for the software
   - Boot (can be toggled)
   - Update downloading (Must be very settle)
   - Update available
   - Update failed
   - Notification
   - Server started (must stay in console)
   - Server stopped (must stay in console)
 - Support tab with following options: 
   - Contact Form
   - Report Bug Form
   - Discord link (Use protocol)
   - Live Chat
 - New Welcome Back tab
 - Re-design blog posts
 - Convert Settings into a pop-up modal
 - Convert all dialogs into pop-ups modal
 - Add transitions between tabs
 - Add start animation when main window opens
 - Splash checklist: Check resources to see if machine has enough to run to FalixNodes Desktop, if not give user option to 'Run Anyway...'
 - Add warning if user tries to open FalixNodes Desktop twice, give user option to 'Run Anyway...'
 - Remove dialog for 'Update Available'
 - Add built-in SFTP client (Already tested back in January, confirmed working)
 - Add option to open Help Center has pinned sidebar(right-side) or as a pop-up window
 - (?) Pop-out console from Game Panel
 - Remove most icons from Font Awesome folder (At least brands)
 - Security
   - Add PIN/Fingerprint Reader option
   - If user uses PIN, then set automatic lock(25 minutes default)
   - (?) VPN (For certain countries only)
   - (?) Full-isolation mode (Revoke permission for FalixNodes Desktop to access anything including internet and file acccess) (Experimental ONLY)
   - Improved security warnings
   - Prevent tamper of FalixNodes Desktop
 - Utility Settings Tab, will include:
   - Internet Speed Test
   - Internet Ping Test
   - Update Server Check
   - IsItUp Test(See if other services a user may rely on like Discord/Google login, etc)
 - Enhancements
   - Settings toggle design
   - Battery saver
   - Notifications area
     - Actions
     - Rich content
     - Dynamic
   - Loading Performance
   - ~~Auto-login for email(Probably no chance of this not happening since we use Captcha)~~
   - (?) Optimize internet usage
 - Installer
   - Warn if user is using Windows 7
   - Custom UI (Windows)
   - Command-line install script (Linux)

Anything with (?) means it may not happen, but is kept in mind.

___

## FAQ
Q: Why and what's the point of this software?

A: Originally, a member of the community developed the software to avoid having to use their web browser to access FalixNodes. Eventfully this 'community' software became official, and that member being Korbs. FalixNodes Desktop was designed to be a simple and quick method to access FalixNodes' services, and it still is. The software has improved greatly over the years and get better in each update.

<br/>

Q: Who is the developer of FalixNodes Desktop?

A: FalixNodes Desktop is developed and owned by Korbs Studio. To be clear, Korbs Studio owns the code to ONLY FalixNodes Desktop for desktop and does NOT have ownership over FalixNodes itself.    

<br/>

Q: Can I use FalixNodes Desktop?

A: It supports Windows 8/10/11, macOS Yosemite and up, and Linux. You may be able to run FalixNodes Desktop on a chromebook as well by enabling Linux.

The software can run on Windows 7, but will not be supported if something goes wrong.

As for mobile, you can try out our mobile app, which serves the same purpose as our desktop software.

<br/>

Q: Is this official software by FalixNodes?

A: Yes, FalixNodes Desktop has been approved official software for FalixNodes back in mid-2020.

<br/>

Q: How do I update it?

A: This is done automatically on Windows and Linux. We recommend that you wait at least 1 - 2 minutes for the update to download in the background, or depending on your internet speed.

On macOS, each update must be installed manually by the user. No, you are not required to do this on a regular basis; nevertheless, upgrading is recommended if you want the most up-to-date version in general. Given the fact that updates need the signing of the DMG file, we are already working on certifying the DMG file using our Apple Certificate. We're getting close ;)

<br/>

## FAQ - For Developers
Q: Why is Font Awesome included offline? Just use a script instead.

A: I understand that using one line of code, in this case a link to the Font Awesome script, will do the trick. Yes, you can do that, but the reason why I'm including Font Awesome locally with the software is for offline usage.

If the user is not connected to the internet, the software's icons will not load unless Font Awesome is installed locally. 

<br/>

Q: Why Electron and what is it?

A.1 (Why): I, Korbs, am mostly comfortable and knowledgeable with web coding languages such as HTML, CSS, and JavaScript. Using Electron was the right approach for me, and I've acquired a huge amount of experience with it over the last three years. The process of doing cross-platform support was also shortened and easier for me to do. I've also gotten very attach to Electron and am also most comfortable using technology built specifically for the framework like Electron Builder, Glasstron, and more.

A.2 (What): Electron is an open-source software framework developed and maintained by GitHub. It allows for the development of desktop GUI applications using web technologie. It combines the Chromium rendering engine and the Node.js runtime. - [Wikipedia](https://en.wikipedia.org/wiki/Electron_(software_framework))

___

## Development and Building
## Checklist
 - Using latest version of ElectronJS
 - Using latest version of Electron Builder
 - Using latest version of Glasstron
 - Update server is pointed to correct source
 - FalixNodes Desktop starts up with no errors on all platforms
   - Windows
   - macOS
   - Linux (Bad Atom error allowed)

### Preparing to Develop FalixNodes Desktop
#### Requirements
To run FalixNodes Desktop in development mode and later build it, you must have the following installed on your workstation:
 - NodeJS 14 or 16 (17 will cause a build issue)
 - Python 3.9 and up
 - g++ (Linux)
 - Visual Studio (Windows)
   - Development with C++
 - Visual C++ Redistributable (Windows)
 - At least 2GB of storage (macOS/Linux/Other)
 - At least 8GB of storage (Windows)

It's also a good idea to have a capable code editor and be familiar with the fundamentals of the ElectronJS framework.

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
 - `/build/icons`/ - Obviously the icon, the icon included is trademark of FalixNodes Limited

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

## Credits
 - Developer: [Korbs Studio](https://github.com/KorbsStudio/)
 - Framework: [Electron](https://electronjs.org/)
 - Blur Composition Effect: [Glasstron](https://github.com/NyaomiDEV/Glasstron/)
