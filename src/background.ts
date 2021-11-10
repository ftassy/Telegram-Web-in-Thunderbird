const urlTelegramWeb = "https://web.telegram.org";
//@ts-ignore
let browser = browser;

function initialize(): void {
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

function popupSwitch(item: any) {
    if (item.hasOwnProperty("te-in-th-mode")) {
        item["te-in-th-mode"].newValue === "popup" ? browser.browserAction.setPopup({ popup: urlTelegramWeb }) : browser.browserAction.setPopup({ popup: "" });
    }
}

initialize();
browser.storage.onChanged.addListener(popupSwitch);
browser.browserAction.onClicked.addListener(createOrActivateTab);
