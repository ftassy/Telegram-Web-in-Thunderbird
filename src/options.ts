let buttonTab: HTMLElement | null = document.getElementById("mode-switcher-tab");
let buttonPopup: HTMLElement | null = document.getElementById("mode-switcher-popup");
let labelTab: HTMLElement | null = document.getElementById("tab");
let labelPopup: HTMLElement | null = document.getElementById("popup");
let labelDisplay: HTMLElement | null = document.getElementById("display");

let spacesToolbarOptions: HTMLElement | null = document.getElementById("spaces-toolbar-options");
let buttonNo: HTMLElement | null = document.getElementById("spaces-toolbar-switcher-no");
let buttonYes: HTMLElement | null = document.getElementById("spaces-toolbar-switcher-yes");
let labelNo: HTMLElement | null = document.getElementById("no");
let labelYes: HTMLElement | null = document.getElementById("yes");
let labelShowSpacesToolbar: HTMLElement | null = document.getElementById("show-spaces-toolbar");
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

function initializeSpacesToolbarInputs(): void {
    if (browser.spacesToolbar) {
        spacesToolbarOptions?.removeAttribute("style");
    } else {
        return;
    }

    let getTeInThSpacesToolbar = browser.storage.local.get("te-in-th-spaces-toolbar");
    getTeInThSpacesToolbar.then((storedValue: any) => {
        if (!(buttonNo instanceof HTMLElement && buttonYes instanceof HTMLElement)) {
            return;
        }
        if (storedValue.hasOwnProperty("te-in-th-spaces-toolbar")) {
            switch (storedValue["te-in-th-spaces-toolbar"]) {
                case "false":
                    buttonNo.setAttribute("checked", "true");
                    return;
                case "true":
                    buttonYes.setAttribute("checked", "true");
                    return;
            }
        }
        browser.storage.local.set({ "te-in-th-mode": "true" });
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
    if (labelNo instanceof HTMLElement) {
        labelNo.innerText = browser.i18n.getMessage("no");
    }
    if (labelYes instanceof HTMLElement) {
        labelYes.innerText = browser.i18n.getMessage("yes");
    }
    if (labelShowSpacesToolbar instanceof HTMLElement) {
        labelShowSpacesToolbar.innerText = browser.i18n.getMessage("show-spaces-toolbar");
    }
}

function onClick(newValue: string): void {
    browser.storage.local.set({ "te-in-th-mode": newValue });
}

if (buttonTab instanceof HTMLElement && buttonPopup instanceof HTMLElement) {
    buttonTab.addEventListener("input", () => onClick("tab"));
    buttonPopup.addEventListener("input", () => onClick("popup"));
}

function onClickSpacesToolbarSwitcher(newValue: string): void {
    browser.storage.local.set({ "te-in-th-spaces-toolbar": newValue });
}

if (buttonNo instanceof HTMLElement && buttonYes instanceof HTMLElement) {
    buttonNo.addEventListener("input", () => onClickSpacesToolbarSwitcher("false"));
    buttonYes.addEventListener("input", () => onClickSpacesToolbarSwitcher("true"));
}


initializeButtons();
initializeSpacesToolbarInputs();
internationalize();
