chrome.tabs.onUpdated.addListener((tabId, tab) =>{

    // checks if the tab is on a YouTube video
    if(tab.url && tab.url.includes("youtube.com/watch")){
        
        // gets the unique video ID
        const youtubeVideoID = tab.url.split("?")[1]; 
        const url = new URLSearchParams(youtubeVideoID);

        // communicates with the content script that a new video has loaded
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: urlParameters.get("v")
        })
    }
})
