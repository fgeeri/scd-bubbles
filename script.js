// script.js
// Function to fetch data from data.json
async function fetchData(startDate = "2007-01-18") {
    try {
        const response = await fetch('bubbles.json');
        let data = await response.json();

        // Sort the data by date
        data.sort((a, b) => {
            // Assuming each item in the data has a 'date' property
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });

        // Filter out entries with dates lower than the provided date
        data = data.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= new Date(startDate);
        });

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

let speedSliderValue = 1
const loadBatch = 1000
let currentDate="";
const visualization = document.querySelector('.visualization');
function createDots(data) {
        
    //Set the start date
    currentDate=data[0].date;
    datePickerLabel.innerHTML=data[0].date;
    datePicker.value="";

    // Loop through the data and create a dot for each entry
    for (let i = 0; i < loadBatch; i++) {
        const entry = data[i];
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.backgroundColor = getColor(entry.colour); // Set dot color
        dot.style.width = (entry.size / 200) + 'px'; // Set dot size
        dot.style.height = (entry.size / 200) + 'px'; // Set dot size
        dot.style.position = 'absolute'; // Set position to absolute for manual positioning
        dot.style.top = '100%'; // Set initial position at the bottom of the visualization area
        if(entry.area_general=="s"){
            dot.style.left = 66 + Math.random() * 33 + '%';
        } else if(entry.area_general=="o"){
            dot.style.left = 33 + Math.random() * 33 + '%';
        } else if(entry.area_general=="p"){
            dot.style.left = 0 + Math.random() * 33 + '%';
        }
        dot.id = entry.docref;
        dot.color = entry.colour;
        dot.duration = entry.duration;
        if (entry.leading_case) {
            dot.style.border = '4px solid #B59A62';
        };

        visualization.appendChild(dot);

        dot.addEventListener('mouseenter', function() {
            const id = dot.id;
            dot.innerHTML = id;
        });

        dot.addEventListener('click', function() {
            // Navigate to the desired URL
            const id = dot.id;
            window.open("https://bger.li/" + id, '_blank');
        });
    
        dot.addEventListener('mouseleave', function() {
            dot.textContent = "";
        });

        // Animate the dot
        animateDot(dot, i, entry);
        // If it's the last dot, remove all dots and load the next batch after 1000 seconds
        if (i === (loadBatch-1) || !data[i + 1]) {
            setTimeout(async () => {
                await removeDots(visualization);
                await createDots(data.slice(i + 1)); // Load the next batch of bubbles
            }, loadBatch * 1000); // 1000 seconds (1000 * 1000 milliseconds)
            break; // Exit the loop as we've scheduled the next batch loading
        }
    }
}

// Function to remove the last 950 bubbles
function removeDots(visualization) {
    const dots = visualization.querySelectorAll('.dot');
    for (let i = 0; i < (loadBatch-50); i++) {
        visualization.removeChild(dots[i]);
    }
}

function removeAllDots(){
    const dots = visualization.querySelectorAll('.dot');

    // Loop through each dot and remove it from the DOM
    dots.forEach(dot => {
        dot.remove();
    });
}

let animations = [];
// Function to animate a dot
function animateDot(dot, index, entry) {

    const animationDuration = (13000 + entry.duration)*speedSliderValue; // Animation duration in milliseconds
    const opacityValue = 0.6 + Math.random() * 0.2

    // Start the animation
    let animation = dot.animate(
        [
            { top: '100%', opacity: opacityValue }, // From bottom with opacity
            { top: '-200px', opacity: opacityValue } // To top with opacity
        ],
        {
            duration: animationDuration, // Duration with delay based on index
            easing: 'linear', // Linear animation
            fill: 'forwards', // Keep the final state of the animation
            delay: index * 1000 // Delay based on index
        }
    );
    animations.push(animation);
    animation.onfinish = function () {
        // Call your function here, animation has finished
        if (new Date(entry.date) > new Date(currentDate)) {
            currentDate = entry.date;
            updateDateIndicator(entry.date);
        }
        dot.remove();
    };
}

// Function to update the date indicator
function updateDateIndicator(date) {
    console.log(datePicker.value)
    datePickerLabel.innerHTML = date;
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

function playSound(sound) {
    // Create an audio element
    var audio = new Audio(sound+'.wav');
    // Play the audio
    audio.play();
}

//date picker
lastDate="";
const datePicker = document.getElementById('date-picker');
const datePickerLabel = document.getElementById('date_display');
datePicker.addEventListener('change', handleDateSet);

async function handleDateSet(event) {
    const selectedDate = event.target.value;
    datePicker.value="";
    if(new Date(selectedDate) > new Date("2023-12-29") || new Date(selectedDate) < new Date("2007-01-18")){
        alert('Select a date beween 2007-01-18 and 2023-12-29.');
    } else{
        const data = await fetchData(selectedDate);
        removeAllDots();
        currentDate=selectedDate;
        updateDateIndicator(selectedDate);
        createDots(data);
    }
}

// Overlay
function toggleOverlay() {
  var overlay = document.getElementById("overlay");
  if (overlay.style.display === "block") {
    overlay.style.display = "none";
  } else {
    overlay.style.display = "block";
  }
}

// Dark mode toggle
function toggleDarkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
} 

function setSpeed(speed) {
    const dots = visualization.querySelectorAll('.dot');

    // Loop through each dot and adjust its animation duration
    dots.forEach(dot => {
        const animation = dot.getAnimations()[0]; // Assuming there's only one animation
        if (animation) {
            const currentDuration = animation.effect.getTiming().duration;
            const newDuration = (13000 + dot.duration)/speed; // Adjust speed
            animation.effect.updateTiming({ duration: newDuration });
        }
    });
}

//speed slider
const speedSlider = document.getElementById('speed-slider');
speedSlider.value = speedSliderValue*100;
speedSlider.addEventListener('change', function(event) {
    const value = event.target.value; // Get the current value of the slider
    if(value < 10){
        speedSliderValue = 0.1;
    } else{
        speedSliderValue = value/100;
    }
    console.log("Slider value:", speedSliderValue);
    setSpeed(speedSliderValue);
    // You can perform any actions you need with the slider value here
});

// Fetch data and create dots when the page loads
window.addEventListener('load', async () => {
    const data = await fetchData();
    createDots(data);
});
