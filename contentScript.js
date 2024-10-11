// This file manipulates the DOM of the YouTube Page
(() => {

    try{
        document.requestStorageAccess();
    }
    catch (err){
        console.log("access denied")
    }

    console.log("content running")

    // Stores access to the video controls and play button
    let PlaybackControls, YouTubePlayer
    let video = ""; // the current video loaded
    let alreadyLoaded = false; // checks if the video already loaded
    let allTimestamps = []; // array that stores all timestamps
    
    hideRecs = () => {
        // hides the next recommended videos
        let recVideos = document.getElementsByClassName("style-scope ytd-watch-next-secondary-results-renderer");
        recVideos.innerHTML = "";
    }

    hideComms = () => {
        // hides the comment section
        let comments = document.getElementById("comments")
        comments.innerHTML = "";
    }

    getTimestamps = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[video] ? JSON.parse(obj[video]): [])
            });
        });
    }

    // param obj: 
    // param sender:
    // param response:
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, value, videoId} = obj;

        // checks if a new video has loaded
        if(type === "NEW"){
            video = videoId;
            newVideo();
            alreadyLoaded = True
        }

        // checks if the video was simply refreshed and is not new
        if(!alreadyLoaded){
            newVideo();
        }

    })

    newVideo = async () => {
        // checks if the loaded video has any saved timestamps
        const timeStampBtnExists = document.getElementsByClassName("bookmark-btn")
        allTimestamps = await getTimestamps();

        if (!timeStampBtnExists){
            // creates a button to create new timestamps
            let timeStampBtn = document.createElement("icon");
            timeStampBtn.src = chrome.runtime.getURL() // set this to bootstrap icons
            timeStampBtn.className = "ytp-button" + "timestamp-btn"
            timeStampBtn.title = "Create new timestamp"

            PlaybackControls = document.getElementsByClassName("ytp-left-controls")[0];
            YouTubePlayer = document.getElementsByClassName("video-stream")[0];
            PlaybackControls.appendChild(timeStampBtn);
            timeStampBtn.addEventListener("click", addNewTimestamp);
        }
    }

    hideRecs();
    hideComms();

    // Adds a timestamp when the button is clicked
    addNewTimestamp = async () => {

        var currentTime = YouTubePlayer.currentTime;
        var newTimestamp = {
            time: currentTime,
            caption: "Timestamp at " + getTime(currentTime)
        }

        console.log("timestamp added")

        allTimestamps = await getTimestamps();

        // adds the timestamp to storage
        chorme.storage.sync.set({
            [video]: JSON.stringify
            ([...allTimestamps, newTimestamp].sort((a, b) => a.time - b.time))
        });
    }

    // converts the video time from seconds to 00:00:00 format
    getTime = t => {
        var date = new Date(0);
        date.setSeconds(t);

        return date.toISOString().substring(11, 8);
    }
})();
