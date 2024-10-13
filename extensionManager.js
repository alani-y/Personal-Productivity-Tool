// facilitates the UI for the extension

import { getCurrentTab } from "./checkTab.js";


// adds a new timestamp to the UI
const addNewTimestamp = (timestampsElement, timestamp) => {
    const timestampTitleElement = document.createElement("div");
    const newTimestampElement = document.createElement("div");
    const controlsElement = document.createElement("div");

    timestampTitleElement.textContent = timestamp.desc;
    timestampTitleElement.className = "timestamp-title";

    controlsElement.className = "timestamp-controls";

    newTimestampElement.id = "timestamp-" + timestamp.time;
    newTimestampElement.className = "timestamp";
    newTimestampElement.setAttribute("timestamp", timestamp.time);

    // adds the play and delete buttons for each timestamp
    setTimestampAttributes("play", onPlay, controlsElement);
    setTimestampAttributes("delete", onDelete, controlsElement);

    newTimestampElement.appendChild(timestampTitleElement);
    newTimestampElement.appendChild(controlsElement);
    timestampsElement.appendChild(newTimestampElement);
};

const viewTimestamps = (currentVideoTimestamps = []) => {

    const timestampsElement = document.getElementById("timestamps")

    // clears the extension UI
    timestampsElement.innerHTML = ""

    // loops once for each timestamp if there are saved bookmarks
    if (currentVideoTimestamps.length > 0) {
        console.log("entered")
        for(let i = 0; i < currentVideoTimestamps.length; i++){

            const timestamp = currentVideoTimestamps[i];
            // adds the new timestamp to the thing
            addNewTimestamp(timestampElement, timestamp);
        }
    }
    else{
        console.log("no saved timestamps")
        timestampsElement.innerHTML = '<i class="row">No saved timestamps.</i>'
    }
};

// plays a timestamp
const onPlay = async e  => {
    const timestampTime = e.target.parentNode.parentNode.getAttribute("timestamp");
    const currentTab = await getCurrentTab();

    chrome.tabs.sendMessage(currentTab.id, {
        type: "PLAY",
        value: timestampTime
    })
};

// deletes a timestamp
const onDelete = async e => {
    const currentTab = await getCurrentTab();
    const timestampTime = e.target.parentNode.parentNode.getAttribute("timestamp");

    const deleteTimestamp = document.getElementById("timestamp-" + timestampTime);
    timestampElementDelete.parentNode.removeChild(deleteTimestamp)
};

// adds functionality to play and delete buttons
// param: controlParentElement: a play or delete button
const setTimestampAttributes = (eventListener, controlParentElement) => {
    const controlElement = document.createElement("") // set to bootstrap icon

    controlElement.src = ""; // set to bootstrap icon for play or delete
    controlElement.addEventListener("click", eventListener);
    controlParentElement.appendChild(controlElement);

};

console.log("extension is running")

document.addEventListener("copy", async () => {
    console.log("full screen test");
})


document.addEventListener("DOMContentLoaded", async () => {
    const currentTab = await getCurrentTab();

    console.log("extension is running")

    // gets the unique video ID
    const youtubeVideoID = currentTabab.url.split("?")[1]; 
    const url = new URLSearchParams(youtubeVideoID);

    const currentVideo = url.get("v")

    // checks if the page is a youtube video
    if (currentTab.url.includes("youtube.com/watch") && currentVideo) {
        chrome.storage.sync.get([currentVideo], (data) => {
            
            // stores the timestamps returned from chrome storage
            const currentVideoTimestamps = data[currentVideo] ? JSON.parse(data[currentVideo]): [];
            
            // fills the UI with the stored timestamps
            viewTimestamps(currentVideoTimestamps);
        
        })
    }

    else{
        const container = document.getElementsByClassName("container")[0];
        container.innerHTML = '<div class="title"> This is not a youtube video.</div>';
    }
});
