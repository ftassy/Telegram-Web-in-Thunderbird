//@ts-ignore
const browser = browser;

async function createOrActivateTab() {

    const urlTelegramWeb: string = "https://web.telegram.org";

    let tabId: number = NaN;

    const tabProperties: any = {
        active: true,
        url: urlTelegramWeb,
    };

    // Querying with empty queryInfo instead of URL is counter intuitive but is a 
    // workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1728631 causing
    // errors where querying with URL criteria while calendar tab is open.
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


browser.browserAction.onClicked.addListener(createOrActivateTab);