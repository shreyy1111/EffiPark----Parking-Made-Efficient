const parkingSpace = document.getElementById('parking-space');
const message = document.getElementById('message');
const vehicleInput = document.getElementById('vehicle-input');
const vehicleType = document.getElementById('vehicle-type');
const numberPlate = document.getElementById('number-plate');

let carSpots = [];
let bikeSpots = [];

// Generate parking space
// Generate parking space for cars
for (let i = 0; i < 4; i++) { // Generate 6 rows for cars
    let row = document.createElement('div');
    row.classList.add('row');
    parkingSpace.appendChild(row);
    
    for (let j = 0; j < 3; j++) { // Generate 6 spots per row for cars
        let carSpot = createSpot('car');
        carSpots.push(carSpot);
        row.appendChild(carSpot);
    }
}

// Generate parking space for bikes
for (let i = 0; i < 6; i++) { // Generate 5 rows for bikes
    let row = document.createElement('div');
    row.classList.add('row');
    parkingSpace.appendChild(row);
    
    for (let j = 0; j < 3; j++) { // Generate 6 spots per row for bikes
        let bikeSpot = createSpot('bike');
        bikeSpots.push(bikeSpot);
        row.appendChild(bikeSpot);
    }
}


// Handle form submission
vehicleInput.addEventListener('submit', (event) => {
    event.preventDefault();
    let vehicle = {
        type: vehicleType.value.toLowerCase(),
        numberPlate: numberPlate.value
    }

    if (vehicle.type !== 'car' && vehicle.type !== 'bike') {
        message.textContent = 'Invalid Vehicle Type. Please enter car or bike.';
        return;
    }

    let spot = findBestSpot(vehicle.type);

    if (!spot) {
        message.textContent = 'No Space Available.';
        return;
    }

    parkVehicle(spot, vehicle);
});

// Function to create parking spot
function createSpot(type) {
    let spot = document.createElement('div');
    spot.classList.add('block');
    spot.classList.add(type + '-block');
    return spot;
}

// Function to find best spot
function findBestSpot(vehicleType) {
    let availableSpots = vehicleType === 'car' ? carSpots : bikeSpots;

    for (let i = 0; i < availableSpots.length; i++) {
        if (!availableSpots[i].classList.contains('taken')) {
            return availableSpots[i];
        }
    }

    return null; // No available spots found
}


// Function to park vehicle
function parkVehicle(spot, vehicle) {
    let icon = document.createElement('img');
    icon.src = vehicle.type === 'car' ? 'image.png' : 'bike.png';
    icon.alt = vehicle.type;
    icon.classList.add('vehicle-icon');
    spot.appendChild(icon);

    let numberPlateText = document.createElement('span');
    numberPlateText.textContent = vehicle.numberPlate;
    numberPlateText.style.color = 'white'; // Set number plate color to white
    spot.appendChild(numberPlateText);

    spot.classList.add('taken');

    message.textContent = `Vehicle parked: ${vehicle.numberPlate}`;

    // Add click event to remove vehicle
    spot.addEventListener('click', () => {
        removeVehicle(spot);
    });
}


// Function to remove vehicle
function removeVehicle(spot) {
    spot.innerHTML = '';
    spot.classList.remove('taken');
    message.textContent = 'Vehicle removed from spot.';
}

