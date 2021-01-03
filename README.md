<p align="center"><img src="https://github.com/ftassy/Telegram-Web-in-Thunderbird/blob/master/icons/icon.svg" alt="Telegram Web in Thunderbird icon"></p>

<h1>Telegram Web in Thunderbird</h1>
Telegram Web in Thunderbird is a Thunderbird add-on that opens Telegram Web in a Thunderbird tab.  

******************
<p align="center">
    <strong>Get it from<br>
    <a href="https://addons.thunderbird.net/fr/thunderbird/addon">addons.thunderbird.net</a>
    </strong>
</p>

******************

<h2>How does it work ?</h2>
Once the add-on is installed, a new icon appears in Thunderbird Mail toolbar:
![Thunderbird Mail toolbar](images/browser_action.png)

Click on it to open the Telegram Web tab.  

<h3>What permissions are needed ?</h3>
Telegram Web in Thunderbird will need to access Thunderbird tabs to maintain a unique tab.

<h3>Does Telegram Web in Thunderbird collects my data ?</h3>
No, Telegram Web in Thunderbird simply opens tabs in Thunderbird, exactly as it would be done in a web browser.  
It does not collect any data.  

Of course, Telegram Web works as it would do in your web browser, including regarding their own data collection.  

<h3>So Telegram Web in Thunderbird will never collect my data ?</h3>
Never.

<h3>How do I stay connected when I re-open Thunderbird ?</h3>
If you wish to stay connected to Telegram Web, you will have to allow cookies.  
The cookies menu can be access as follow in Thunderbird:    
_GNU/Linux_ : "Edit" > "Preferences" > "Privacy" or "Privacy and Security" > "Web Content" section.  
_macOS_ : "Thunderbird" > "Preferences" > "Privacy" or "Privacy and Security" > "Web Content" section.  
_Windows_ : "Tools" > "Options" > "Privacy" or "Privacy and Security" > "Web Content" section.  
You will have to allow and keep cookies for this domain:  
* https://web.telegram.org

<h2>Build from source</h2>
Prerequisite:  
Install [Node.js](https://nodejs.org).  

The add-on can be built by running the following command from its root directory:  
```
npm install
npm run build
```

<h2>Legal notice</h2>
Thunderbird is a registered trademark of the Mozilla Foundation.  
Telegram is a registered trademark of TELEGRAM FZ-LLC.  
GNU is a registered trademark of the Free Software Foundation.  
Linux is a registered trademark of Linus Torvalds.  
Windows is a registered trademark of Microsoft Corporation.  
macOS is a registered trademark of Apple Inc.  

The above-mentioned trademarks are only used to refer to products.  
Telegram Web in Thunderbird and its developer are not affiliated, sponsored nor endorsed by any of the above-mentioned organizations.  

<h2>Changelog</h2>
1.0.0 -> first release  
