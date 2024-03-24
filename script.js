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



function createDots(data) {
    const visualization = document.querySelector('.visualization');

    // Loop through the data and create a dot for each entry
    for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.backgroundColor = getColor2(entry.outcome); // Set dot color
        dot.style.width = (entry.length / 200) + 'px'; // Set dot size
        dot.style.height = (entry.length / 200) + 'px'; // Set dot size
        dot.style.position = 'absolute'; // Set position to absolute for manual positioning
        dot.style.top = '100%'; // Set initial position at the bottom of the visualization area
        dot.style.left = Math.random() * 100 + '%'; // Set dot position randomly
        visualization.appendChild(dot);

        // Animate the dot
        animateDot(dot, i);
    }
}

// Function to animate a dot
function animateDot(dot, index) {
    const animationDuration = 20000; // Animation duration in milliseconds

    // Start the animation
    dot.animate(
        [
            { top: '100%', opacity: 0.8 }, // From bottom with opacity
            { top: '-200px', opacity: 0.8 } // To top with opacity
        ],
        {
            duration: animationDuration, // Duration with delay based on index
            easing: 'linear', // Linear animation
            fill: 'forwards', // Keep the final state of the animation
            delay: index * 1000 // Delay based on index
        }
    );
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

// Function to get color based on colour code
function getColor2(colourCode) {
    switch (colourCode) {
        case 'granted':
            return '#1a9641';
        case 'partly granted':
            return '#a6d96a';
        case 'rejected':
            return '#e6550d';
        case 'inadmissible':
            return '#fdae61';
        case 'writeoff':
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
