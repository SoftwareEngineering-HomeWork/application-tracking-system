// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Popup has received the data")
    if (request.extensionDetails) {
        displayDetails(request.extensionDetails);
    }
});

// document.addEventListener("DOMContentLoaded", () => {
//   chrome.storage.local.get("extension", (result) => {
//     if (result.data) {
//       displayDetails(result.data);
//     }
//   });
// });

// Function to display the extension details
function displayDetails(details) {
    const container = document.getElementById('detailsContainer');
    container.innerHTML = ''; // Clear previous details

    details.forEach(detail => {
        const detailDiv = document.createElement('div');
        detailDiv.className = 'detail';
        detailDiv.innerHTML = Object.entries(detail).map(([key, value]) => 
            `<strong>${key}:</strong> ${value}`
        ).join('<br>');
        container.appendChild(detailDiv);
    });
}

