
// exports the current tab
export async function  getCurrentTab(params) {
    let search = {active: true, currentWindow: true};
    let [tab] = await chrome.tabs.query(search);
    return tab
}