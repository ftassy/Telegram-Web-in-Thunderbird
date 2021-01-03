//@ts-ignore
const browser = browser;

async function createOrActivateTab() {

    const urlTelegramWeb: string[] = ["https://web.telegram.org/*"];

    let tabId: number = NaN;

    const tabProperties: any = {
        active: true,
        url: "https://web.telegram.org",
    };

    const queryTabs: any = await browser.tabs.query({ url: urlTelegramWeb });
    if (queryTabs.length >= 1) {
        for (let tab of queryTabs) {
            tabId = tab.id;
        }
    }

    if (isNaN(tabId)) {
        browser.tabs.create(tabProperties);
    } else {
        browser.tabs.update(tabId, tabProperties);
    }
}


browser.browserAction.onClicked.addListener(createOrActivateTab);