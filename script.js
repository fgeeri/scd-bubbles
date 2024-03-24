// script.js

// Function to fetch data from data.json
async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to create floating dots based on the fetched data
function createDots(data) {
    const visualization = document.querySelector('.visualization');

    // Loop through the data and create a dot for each entry
    data.forEach(entry => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.backgroundColor = getColor(entry.colour); // Set dot color
        dot.style.width = entry.size + 'px'; // Set dot size
        dot.style.height = entry.size + 'px'; // Set dot size
        dot.style.top = '100%'; // Set initial position at the bottom of the visualization area
        dot.style.left = Math.random() * (100) + '%'; // Set dot position randomly
        visualization.appendChild(dot);
        
        // Add animation
        const animationDuration = 20; // Animation duration in seconds
        dot.style.animationDuration = animationDuration + 's';
        dot.style.animationTimingFunction = 'linear';
    });
}

// Function to create floating dots based on the fetched data
function createDots2(data) {
    const visualization = document.querySelector('.visualization');

    // Loop through the data and create a dot for each entry
    data.forEach(entry => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.backgroundColor = getColor(entry.colour); // Set dot color
        dot.style.width = entry.size + 'px'; // Set dot size
        dot.style.height = entry.size + 'px'; // Set dot size
        dot.style.top = 'calc(100% - ' + entry.timing + 'px)'; // Set dot position
        dot.style.left = Math.random() * (100 - entry.size) + '%'; // Set dot position randomly
        visualization.appendChild(dot);

        // Add animation
        const animationDuration = 5 + Math.random() * 5; // Random duration between 5 and 10 seconds
        dot.style.animationDuration = animationDuration + 's';
        dot.style.animationTimingFunction = 'linear';
    });
}

// Function to get color based on colour code
function getColor(colourCode) {
    switch (colourCode) {
        case 'g':
            return '#1a9641';
        case 'p':
            return '#a6d96a';
        case 'r':
            return '#e6550d';
        case 'i':
            return '#fdae61';
        case 'w':
            return '#d9d9d9';
        default:
            return '#ffff99';
    }
}

// Fetch data and create dots when the page loads
window.addEventListener('load', async () => {
    const data = await fetchData();
    createDots(data);
});
