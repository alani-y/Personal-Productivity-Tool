chrome.tabs.onUpdated.addListener((tabId, tab) =>{

    // checks if the user is on a google calendar tab for today
    if(tab.url && tab.url.includes("calendar.google.com/calendar")){
        
        // gets the unique url for today's date in google calendar
        const dayParameter = tab.url.split("r/")[1]; 
        const urlParameters = new URLSearchParams(dayParameter);


    }
})