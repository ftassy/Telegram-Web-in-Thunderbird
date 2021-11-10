let buttonTab: HTMLElement | null = document.getElementById("mode-switcher-tab");
let buttonPopup: HTMLElement | null = document.getElementById("mode-switcher-popup");
let labelTab: HTMLElement | null = document.getElementById("tab");
let labelPopup: HTMLElement | null = document.getElementById("popup");
let labelDisplay: HTMLElement | null = document.getElementById("display");
//@ts-ignore
let browser = browser;

function initializeButtons(): void {
    let getTeInThMode = browser.storage.local.get("te-in-th-mode");
    getTeInThMode.then((storedValue: any) => {
        if (!(buttonTab instanceof HTMLElement && buttonPopup instanceof HTMLElement)) {
            return;
        }
        if (storedValue.hasOwnProperty("te-in-th-mode")) {
            switch (storedValue["te-in-th-mode"]) {
                case "tab":
                    buttonTab.setAttribute("checked", "true");
                    return;
                case "popup":
                    buttonPopup.setAttribute("checked", "true");
                    return;
            }
        }
        browser.storage.local.set({ "te-in-th-mode": "tab" });
    });
}

function internationalize() {
    if (labelTab instanceof HTMLElement) {
        labelTab.innerText = browser.i18n.getMessage("tab");
    }
    if (labelPopup instanceof HTMLElement) {
        labelPopup.innerText = browser.i18n.getMessage("popup");
    }
    if (labelDisplay instanceof HTMLElement) {
        labelDisplay.innerText = browser.i18n.getMessage("display");
    }
}

function onClick(newValue: string): void {
    browser.storage.local.set({ "te-in-th-mode": newValue });
}


if (buttonTab instanceof HTMLElement && buttonPopup instanceof HTMLElement) {
    buttonTab.addEventListener("input", () => onClick("tab"));
    buttonPopup.addEventListener("input", () => onClick("popup"));
}

initializeButtons();
internationalize();