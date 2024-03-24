// script.js
const animationDuration = 20; // Animation duration in seconds
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

async function createDots(data) {
    const visualization = document.querySelector('.visualization');

    // Delay execution by 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Loop through the data and create a dot for each entry
    data.forEach(entry => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.backgroundColor = getColor2(entry.outcome); // Set dot color
        dot.style.width = (entry.length / 200) + 'px'; // Set dot size
        dot.style.height = (entry.length / 200) + 'px'; // Set dot size
        dot.style.top = '100%'; // Set initial position at the bottom of the visualization area
        dot.style.left = Math.random() * 100 + '%'; // Set dot position randomly
        visualization.appendChild(dot);
    });

    // Add animation
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.style.animationDuration = animationDuration + 's';
        dot.style.animationTimingFunction = 'linear';
        dot.style.animationDelay = index * 1 + 's'; // Delay each dot by index seconds
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
