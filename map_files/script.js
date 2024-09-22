// Initialize the map
function initMap() {
    const mapOptions = {
        center: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates
        zoom: 12,
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Fetch and parse the CSV data
    fetch("../data/cleaned_crash_data.csv")
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").slice(1); // Skip header row
            rows.forEach(row => {
                const columns = row.split(","); 
                const lat = parseFloat(columns[4]); // Adjust index based on your CSV structure
                const lng = parseFloat(columns[5]); // Adjust index based on your CSV structure

                if (!isNaN(lat) && !isNaN(lng)) {
                    new google.maps.Marker({
                        position: { lat: lat, lng: lng },
                        map: map,
                    });
                }
            });
        })
        .catch(error => console.error("Error loading the CSV file:", error));
}

// Load the map once the window has loaded
window.onload = initMap;
