chrome.tabs.onUpdated.addListener(( TabId, changeInfo, Tab ) => {
    // Opera GX is somehow undefined on settings and so on
    if (typeof Tab.title == 'undefined' || typeof Tab.url == 'undefined') return;
    
    // For Google Chrome
    if (Tab.url.startsWith('chrome')) return;

    // Only danbooru is allowed to go thru this line
    if (!Tab.url.includes('danbooru')) return;

    // Inject JavaScript when page is done loading
    if (changeInfo.status != 'complete') return;

    // Inject Script
    chrome.scripting.executeScript({
        target: { tabId: TabId },
        files: ['js/content/img.js']
    });
})