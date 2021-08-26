var OSVersion = "Not Supported";
if (window.navigator.userAgent.indexOf("Windows NT 11.0")!= -1) OSVersion="Windows 11";
if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSVersion="Windows 10";
if (window.navigator.userAgent.indexOf("Windows NT 6.3") != -1) OSVersion="Windows 8.1";
if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSVersion="Windows 8";
if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSVersion="Windows 7";
if (window.navigator.userAgent.indexOf("Linux") != -1) OSVersion="Linux";
if (window.navigator.userAgent.indexOf("Macintosh") != -1) OSVersion="macOS";
if (window.navigator.userAgent.indexOf("MacIntel") != -1) OSVersion="macOS";