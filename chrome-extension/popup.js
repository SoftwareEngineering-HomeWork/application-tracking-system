
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get('extension', (result) => {
    console.log("This is the stored data", result.extension);
    displayDetails(result.extension);
  });
});


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
