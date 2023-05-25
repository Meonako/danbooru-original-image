function tabUpdate(tabId, _, tab) {
    if (typeof tab.title == "undefined" || typeof tab.url == "undefined")
        return;

    // For Google Chrome
    if (tab.url.startsWith("chrome")) return;

    // https://danbooru.donmai.us/posts/4606250
    // Only danbooru with `posts` in path is allowed to go thru this line
    if (!tab.url.includes("danbooru") && !tab.url.includes("posts")) return;

    // Try to inject JS as fast as possible to reduce load time.

    // Inject Script
    chrome.scripting.executeScript({
        target: { tabId },
        files: ["js/content/img.js"],
    });
}

chrome.tabs.onUpdated.addListener(tabUpdate);