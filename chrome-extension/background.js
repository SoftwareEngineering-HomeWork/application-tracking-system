chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //The userID is received here
    let userID=request[0];
    let token=request[1];

    if(userID=="delete")
    {
        console.log("The user has logged out!")
        chrome.storage.local.clear();
        return;
    }

    //Now we get the profile from the backend
    // ... existing code ...
    fetch('http://localhost:5001/profile', {
        method: 'GET',
        headers: {
            userid: userID,
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then((data) => {
        //From here we send the data to popup.html
        console.log("Received data successfully");
        console.log(data.extensionDetails)
        chrome.storage.local.set({extension:data.extensionDetails});

    })
    .catch((err) => console.log(err.message));

    }
);
