// Wait for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Get the necessary elements from the page
    const searchInput = document.getElementById('searchInput');
    const googleSearchBtn = document.getElementById('googleSearchBtn');
    const luckyBtn = document.getElementById('luckyBtn');

    // Function to perform a Google search
    function performGoogleSearch() {
        const query = searchInput.value;
        // Check if the input is not empty before searching
        if (query.trim() !== '') {
            // Construct the search URL and redirect the user
            const searchURL = 'https://www.google.com/search?q=' + encodeURIComponent(query);
            window.location.href = searchURL;
        }
    }
    
    // Function for the "I'm Feeling Lucky" button
    function feelingLuckySearch() {
        const query = searchInput.value;
        if (query.trim() !== '') {
            // Google's "I'm Feeling Lucky" redirects server-side, 
            // but we can simulate it with this specific URL parameter.
            const luckyURL = 'https://www.google.com/search?q=' + encodeURIComponent(query) + '&btnI=1';
            window.location.href = luckyURL;
        }
    }

    // Add a click event listener to the "Google Search" button
    googleSearchBtn.addEventListener('click', performGoogleSearch);

    // Add a click event listener to the "I'm Feeling Lucky" button
    luckyBtn.addEventListener('click', feelingLuckySearch);

    // Add a keydown event listener to the search input field
    searchInput.addEventListener('keydown', function(event) {
        // Check if the key pressed was 'Enter'
        if (event.key === 'Enter') {
            performGoogleSearch();
        }
    });

});