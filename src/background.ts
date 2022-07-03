const urlTelegramWeb = "https://web.telegram.org";
const spacesToolbarButtonId = "te_in_th_" + (Math.floor(Math.random() * 99999999)).toString();
//@ts-ignore
let browser = browser;

function initialize(): void {
    setTeInThMode();
    createContextMenu();
    setSpacesToolbarButton();
}

function setTeInThMode(): void {
    let getTeInThMode = browser.storage.local.get("te-in-th-mode");
    getTeInThMode.then((storedValue: any) => {
        if (storedValue["te-in-th-mode"] === "popup") {
            browser.browserAction.setPopup({ popup: urlTelegramWeb });
        } else {
            browser.browserAction.setPopup({ popup: "" });
            browser.storage.local.set({ "te-in-th-mode": "tab" });
        }
    }); 
}

function createContextMenu(): void {
    browser.menus.create({
        id: "contextMenuEntry",
        title: browser.i18n.getMessage("context"),
        type: "normal",
        contexts: ["browser_action"],
        onclick: createOrActivateTab
    }, console.log("Telegram Web context menu created"));
}

function setSpacesToolbarButton(): void {
    let getTeInThMode = browser.storage.local.get("te-in-th-spaces-toolbar");
    getTeInThMode.then((storedValue: any) => {
        if (storedValue["te-in-th-spaces-toolbar"] === "true") {
            addSpacesToolbarButton();
            return;
        } 
        if (storedValue["te-in-th-spaces-toolbar"] === "false") {
            removeSpacesToolbarButton();
            return;
        }
        browser.storage.local.set({ "te-in-th-spaces-toolbar": "true" });
        addSpacesToolbarButton();
    });
}

function addSpacesToolbarButton(): void {
    const label: string = browser.i18n.getMessage("context");
    try {
        browser.spacesToolbar.addButton(
            spacesToolbarButtonId,
            {
                defaultIcons: {
                    "16": "icons/icon16.png",
                    "32": "icons/icon32.png"
                },
                title: label,
                url: urlTelegramWeb
            });
        console.log("Telegram Web spaces toolbar menu created.");
    } catch(e: any) {
        console.log("spacesToolbar is not defined...\n", e);
    }
}

function removeSpacesToolbarButton(): void {
    const label: string = browser.i18n.getMessage("context");
    try {
        browser.spacesToolbar.removeButton(spacesToolbarButtonId);
        console.log("Telegram Web spaces toolbar menu removed.");
    } catch(e: any) {
        console.log("spacesToolbar is not defined...\n", e);
    }
}

async function createOrActivateTab() {

    let tabId: number = NaN;

    const tabProperties: any = {
        active: true,
        url: urlTelegramWeb,
    };

    // Querying with empty queryInfo instead of URL is counter intuitive but is a 
    // workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1728631 causing
    // errors where querying with URL criteria while calendar tab is open.
    //@ts-ignore
    const queryTabs: any = await browser.tabs.query({});
    if (queryTabs.length >= 1) {
        for (let tab of queryTabs) {
            if (tab.hasOwnProperty("url")) {
                if (tab.url.includes(urlTelegramWeb)) {
                    tabId = tab.id;
                    break;
                }
            }
        }
    }

    if (isNaN(tabId)) {
        browser.tabs.create(tabProperties);
    } else {
        browser.tabs.update(tabId, tabProperties);
    }
}

function onStorageChange(item: any) {
    if (item.hasOwnProperty("te-in-th-mode")) {
        item["te-in-th-mode"].newValue === "popup" ? 
            browser.browserAction.setPopup({ popup: urlTelegramWeb }) : 
            browser.browserAction.setPopup({ popup: "" });
    }
    if (item.hasOwnProperty("te-in-th-spaces-toolbar")) {
        setSpacesToolbarButton();
    }
}

initialize();
browser.storage.onChanged.addListener(onStorageChange);
browser.browserAction.onClicked.addListener(createOrActivateTab);
