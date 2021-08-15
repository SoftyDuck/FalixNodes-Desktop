# Falix Software (Formly FalixNodes Software)
![image](https://user-images.githubusercontent.com/51213244/121123903-fe27d080-c7f1-11eb-9aba-4102590265f7.png)

Simple and easy to use. Access Falix services all from one place like your client and game panel, help center, status, and more.

[Download](https://software.falixnodes.net/) from our official website.

________________________

![Latest Version of Falix Software](https://img.shields.io/badge/Version-v3.2.2-blue.svg)

![Workflow for Distribution to Windows](https://github.com/FalixNodes-Software/Desktop-App/actions/workflows/nsis-deployment.yml/badge.svg)
![Workflow for Distribution to macOS](https://github.com/FalixNodes-Software/Desktop-App/actions/workflows/dmg-deployment.yml/badge.svg)
![Workflow for Distribution to Linux](https://github.com/FalixNodes-Software/Desktop-App/actions/workflows/appimage-deployment.yml/badge.svg)
![Workflow for Distribution to Windows 10/11](https://github.com/FalixNodes-Software/Desktop-App/actions/workflows/appx-deployment.yml/badge.svg)

________________________

## ❔ Q&A for Developers
### Why is Font Awesome included offline? You could use a script instead.
#### What is Font Awesome?
Font Awesome is a font and icon toolkit based on CSS and Less.

[Learn More](https://fontawesome.com/)

[Learn to Upgrade](https://fontawesome.com/v5.15/how-to-use/on-the-desktop/setup/upgrading-from-version-4)

#### Why include it offline?
I understand that using one line of code, in this case a link to the Font Awesome script, will do the trick. Yes, you can do that, but the reason why I'm including Font Awesome locally with the software is for offline usage. 

If the user is offline, the icons in the software won't load unless Font Awesome is included locally.

### Why all these requirements to just build it?
The reason why the software needs all these requirements like Python and Visual Studio(Desktop Development with C++) is because of technology that was coded into the software like [Glasstron](https://www.npmjs.com/package/glasstron) for visual appeal and [XTerm](https://xtermjs.org/) for the built-in terminal to use FalixCoins Miner with.

### Why Electron?
#### What is it?
Electron is an open-source software framework developed and maintained by GitHub. It allows for the development of desktop GUI applications using web technologie. It combines the Chromium rendering engine and the Node.js runtime. - [Wikipedia](https://en.wikipedia.org/wiki/Electron_(software_framework))

#### Why I use it
I, Korbs, am mostly comfortable and knowledgeable with web coding languages such as HTML, CSS, and JavaScript. Using Electron was the right approach for me, and I've acquired a huge amount of experience with it over the last three years. The process of doing cross-platform support was also shortened and easier for me to do.

There are tons of other good reasons why to use Electron, you can read more about that here on [Alibaba Cloud](https://www.alibabacloud.com/blog/what-is-electronjs-and-why-should-you-use-it_581971) (Article).

________________________

## Push Notification
### What is it?
A push notification works simiar to a native notification, where it pops up like any other notification. With push notifcations, the developer can send a notification at any time he or she wants. Since we're doing this in Electron, the app has to be opened to see the notification. I could let the app run in the background after it closes, but I refuse to, as that could have an impact on performance.

### How to use it?
Falix Software is using a service called [Pushy](https://pushy.me/), which is a reliable push notification delivery system. It's also cross-platform and supports [Electron](https://pushy.me/docs/additional-platforms/electron) application, meaning we can use Pushy API in the main file of Falix Software.

Everything is already setup in the main file, I've had it setup where can you send the title, message, and url for the push notification. You just need to use it right.

In the notification data, when sending a notification, it should look like this:
```
{
  "title": "Title of Notification",
  "message": "This is a message, with a brief explanation or a short description.",
  "url": "https://example.com/"
}
```

In Pushy's API, the data is set out like this:

`title` - `${data.title}`

`message` - `${data.message}`

`url` - `${data.url}`

You can see these used in the main file.

A notification is clicked, a invisible window will open and will trigger the `shell.openExternal('')` command. The reason why we use a URL that has this command seperately, is because using `shell.openExternal` doesn't seem to work in the main file on the Linux platform, but has been tested to work fine on Windows 10.

If a URL isn't used in the notification, you'll be fine. The invisible window will load nothing at all, making it a dummy window.

If a message or title isn't used, it will default to `undefined`.

If you want, you can read [Pushy's Docs](https://pushy.me/docs).

________________________

## 🔧 Preparing to Build
### Requirements
 - [NodeJS](https://nodejs.org/en/) 14.16.0 or above
 - [Python](https://www.python.org/) 3.9 or above
 - G++ (Linux)
    - Debian/Ubuntu: `apt install g++`
    - Fedora: `dnf install g++`
 - [Visual Studio Community](https://visualstudio.microsoft.com/) (Install Desktop Development with C++) (on Windows)
 - [Visual C++ Redistributable](https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0) (on Windows)
 - At least 8GB of storage

### Downloading Source Code
#### Using Git
If you have Git already installed, run the following command to download and automatically extract the source code from our GitHub:
```
git clone https://github.com/FalixNodes-Software/Desktop-App/
```

#### Using GitHub CLI
If you have GitHub CLI already installed, run the following command to download and automatically extract the source code from our GitHub:
```
gh repo clone FalixNodes-Software/Desktop-App
```

If you don't have Git or GitHub CLI installed, you can download it manually from our [GitHub](https://github.com/FalixNodes-Software/Desktop-App/) or install [Git](https://git-scm.com/) or install [GitHub CLI](https://cli.github.com/).

You can also download the source code manually and go from there.

### Other Modifications
There are some other assets you may need to change if you're forking this repo for another host or for a simliar project. Assets for the background images, names, etc need to be changed as they may contain resources from Falix or the name "Falix" in general. You also need to update other stuff like the update server provider and learn how it works if you do plan to include auto updating like we did.

#### Pushy Notifications
To make sure your fork of the software doesn't recieve notifications for Falix Inc, you'll need to either remove Pushy all together or change the app ID of Pushy.

If this isn't changed, your customers who'll use the software may recieve push notifications from the forked version of the software and may be confused.

#### Auto Updates
As seen here in the __[package.json](https://github.com/FalixNodes-Software/Desktop-App/blob/master/package.json#L47)__, there is a url "https://updates.korbsstudio.com/falix-software/", which is a self hosted update server. 

The file structure is simply, you're required to have a "latest" file in there like `latest.yml`, `latest-mac.yml`, and a `latest-linux.yml` file along with a setup file for the software. 

If you don't plan to self host your own update server, then GitHub Releases is recommended.
Simply change the publish area of the package.json file to this:
```
...
    "publish": {
      "provider": "github",
      "repo": "repo-name",
      "owner": "owner-username",
    },
...
```
You're required to have your GitHub token to publish new releases with Electron Builder, so add the token to the environment.

On Linux/macOS:
``` 
export GH_TOKEN="<YOUR_TOKEN_HERE>"
```

On Windows:
```
[Environment]::SetEnvironmentVariable("GH_TOKEN","<YOUR_TOKEN_HERE>","User")
```

Make sure to restart your terminal after doing the export command.

#### NSIS Setup
<img width="450" src="https://miro.medium.com/max/499/0*fMHZpJv5BjlmnJE4.png">

As shown above, there is an image shown in the left sidebar of installer. This can be changed by updating the image in `/build/installerSidebar.bmp`. Image size has to be 164x314 pixels.

Just download the [Figma file](https://github.com/FalixNodes-Software/Desktop-App/tree/master/build/assets/figma/Falix Software Resources.fig) for this and simply update the screenshots. Or if you want, you're allowed to create your own image for the sidebar.

What's a BMP file? The BMP file format, also known as bitmap image file, device independent bitmap file format and bitmap, is a raster graphics image file format used to store bitmap digital images, independently of the display device, especially on Microsoft Windows and OS/2 operating systems. In this case, we're using NSIS, which requires the use of BMP.

[PNG to BMP Converter](https://cloudconvert.com/png-to-bmp)

#### DMG Setup
<div>
  <img width="450" src="https://cdn.discordapp.com/attachments/829662493533667339/862790846201331762/unknown.png">
</div>

As shown above, there is background image shown in the DMG installer. This can be changed by updating the image in `/build/background.png`. Image size has to be 540x380 pixels. The only objects in the image above that isn't part of the background image is the __falixnodes.app__ file and the Applications folder shown in the center.

### Building
#### Installing Dependencies
FalixNodes Software uses Electron and other required packages to run the app and uses Electron Builder to package it up nicely. Run the following commands to install them:
```
npm install install
```

### Running
After all required dependencies are installed, you should be able to run the software with the start command provided in __package.json__.

To run the start command, simply run the following command:
```
npm start
```

### Create a Package
Wanna create an installer? You can do this with Electron Builder, there is already a build command ready which is provided in __package.json__.

To start building the installer, run the following command: 
```
npm run build
```

After installer is done building, check the `/dist/` folder.

________________________

## 📊 Benchmark Testing
### What is this?
This will show data and timing of Falix Software being ran on my machines. This will show how well the computer performs running the software, as we're still improving performance in v3.

### Machines
#### HP All In One 24-e014
 - CPU: Intel Core i3 7100u | 2.24GHz | 4 Cores
 - Memory: 16GB DDR4
 - Graphics Card: Intel HD 620 Kaby Lake GT2
 - Storage: 120GB SSD
 - Operating System: Fedora 34
 - Desktop Environment: GNOME 40 Wayland
 - Node Version: v14.17.1

#### Dell Inspiron 15-3552
 Note: This low end laptop appears to have no fans.
 - CPU: Intel Celeron N3060 | 1.60GHz | 2 Cores
 - Memory: 4GB DDR3L
 - Graphics Card: Intel HD (Unknown model)
 - Storage: 320GB HDD
 - Operating System: Windows 10 v1909
 - DirectX: 12
 - Node Version: v14.17.1

#### HP Omni-100 5050
 - CPU: AMD Althon | 1.80Ghz | 2 Cores
 - Memory: 8GB DDR3L
 - Graphics Card: 
 - Storage: 320GB HDD
 - Operating System: Windows 10 v21H1
 - DirectX: 12
 - Node Version: v14.17.1

### Running
Running software after intended install (Not building)

#### HP All In One 24-e014
 - Start software             |        01s

#### Dell Inspiron 15-3552
 - Start software             |        09s

#### HP Omni-100 5050
 - Start software             |        07s


### Building
Running commands from __package.json__ in the following order:
 - Install node packages: `npm i`
 - Rebuild modules like node-pty and Glasstron: `npm run rebuild`
 - Start software: `npm start`
 - Build setup files: `npm run build`

#### HP All In One 24-e014
 - Installing node packges    |        50s
 - Rebuild Modules            |        12s
 - Start software             |        02s
 - Build - Target: AppImage   |     1m 49s
 
 AppImage file is smaller than NSIS

#### Dell Inspiron 15-3552
 - Installing node packges    |    4m  31s
 - Rebuild Modules            |    2m  15s
 - Start software             |        09s
 - Build - Target: NSIS       |    10m 23s

#### HP Omni-100 5050
 - Installing node packges    |    3m  46s
 - Rebuild Modules            |    1m  37s
 - Start software             |        07s
 - Build - Target: NSIS       |    9m  00s

 NOTE: We also build .appx files with [`electron-windows-store`](https://www.npmjs.com/package/electron-windows-store) for the Microsoft Store

________________________

## 💡 Credits
Developer/Maintainer: [Korbs Studio](https://github.com/KorbsStudio)

Electron Titlebar OS Detection: [Korbs Studio](https://github.com/KorbsStudio/electron-titlebar-os-detection)

Blur Composition Effect: [Glasstron by AryToNex](https://github.com/AryToNeX/Glasstron)

Built-in Terminal: [XTerm](https://xtermjs.org/)

Game Panel Controls: [/webview/browser/ in Electron Sample Apps by Hokein](https://github.com/hokein/electron-sample-apps/tree/master/webview/browser)
