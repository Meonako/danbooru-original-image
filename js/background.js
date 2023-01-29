chrome.tabs.onUpdated.addListener(( TabId, changeInfo, Tab ) => {
    // Opera GX is somehow undefined on settings and so on
    if (typeof Tab.title == 'undefined' || typeof Tab.url == 'undefined') return;
    
    // For chrome
    if (Tab.url.startsWith('chrome')) return;

    // Not danbooru
    if (!Tab.url.includes('danbooru')) return;

    if (changeInfo.status != 'complete') return;

    chrome.scripting.executeScript({
        target: { tabId: TabId },
        files: ['js/content/img.js']
    });
})