// This file manipulates the DOM of the YouTube Page
(() => {
    
    // Stores access to the video controls and play button
    let YouTubeControls, YouTubePlayer
    let video = ""; // the current video loaded

    // param obj: 
    // param sender:
    // param response:
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, value, videoId} = obj;

        if(type === "NEW"){
            video = videoId;
            newVideo();
        }
    })

    newVideo = () => {

        // checks if the loaded video has any saved timestamps
        const timeStampExists = document.getElementsByClassName("bookmark-btn")
        
        if (!timeStampExists){
            // creates a button to create new timestamps
            let timeStampBtn = document.createElement("icon");
            timeStampBtn.src = chrome.runtime.getURL() // set this to bootstrap icons
            timeStampBtn.className = "ytp-button" + "timestamp-btn"
            timeStampBtn.title = "Create new timestamp"
        }
    }

    hideRecs = () => {
        // hides the next recommended videos
        var videoRecs = document.getElementsByClassName(
            "style-scope ytd-watch-next-secondary-results-renderer")
            videoRecs.remove();
    }

    hideComms = () => {
        // hides the comment section
        var videoComments = document.getElementById("comments")
        videoComments.remove();
    }
})();
