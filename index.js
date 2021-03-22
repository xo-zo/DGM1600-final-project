import { planets } from './planets.js'

var allPlanets = planets

/************* This will print all planet names onto the page -- probably delete later
for (var i = 0; i < allPlanets.length; i++) {
    // create a new element of type div as a variable
    var div = document.createElement('div');

    // assign the new div a class of 'planet' -> use CSS for styling later
    div.className = 'planet';

    // fill the div with a <p> element and fill the planet name
    div.innerHTML = '<p>' + allPlanets[i].name + '</p>';

    // add the whole div variable to the document body
    document.body.appendChild(div);

    // iterate and go to the next planet
}*/


// --------------------------------- searchByClimate() ---------------------------------//
// This block executes searchByClimate() from the search button
var searchButtonClimate = document.getElementById("search-button-climate");
if (searchButtonClimate.addEventListener)
    searchButtonClimate.addEventListener("click", searchByClimate, false);
else if (searchButtonClimate.attachEvent)
    searchButtonClimate.attachEvent('onclick', searchByClimate);

// search by the selected climate
function searchByClimate() {
    // clear current results on the page so you don't have to refresh between searches
    clearResults();

    // get text of the currently selected option from the climate picklist
    var selectedClimate = document.getElementById('climate-picklist');
    selectedClimate = selectedClimate.options[selectedClimate.selectedIndex].value;

    // Sort through all possible climates and try to find a match,
    //    if a match is found, print it and loop until complete.
    allPlanets.forEach(planet => {
        var climateArray = planet.climate.split(", ");
        climateArray.forEach(climate => {
            if (selectedClimate === climate) {
                var div = document.createElement('div');
                div.className = 'planet';
                div.innerHTML = '<p>' + planet.name + '</p>';
                document.body.appendChild(div);
            }
        });
    });
}

// --------------------------------- searchByDaylength() ---------------------------------//
// This block executes searchByDayLength() from the search button
var searchButtonDaylength = document.getElementById("search-button-daylength");
if (searchButtonDaylength.addEventListener)
    searchButtonDaylength.addEventListener("click", searchByDaylength, false);
else if (searchButtonDaylength.attachEvent)
    searchButtonDaylength.attachEvent('onclick', searchByDaylength);

// search by the selected climate
function searchByDaylength() {
    // clear current results on the page so you don't have to refresh between searches
    clearResults();

    // get text of the currently selected option from the daylength picklist
    var selectedDaylength = document.getElementById('daylength-picklist');
    selectedDaylength = selectedDaylength.options[selectedDaylength.selectedIndex].value;

    // Sort through all lengths and try to find a match (logic included in block),
    //    if a match is found, print it and loop until complete.
    allPlanets.forEach(planet => {
        // for the currently selected planet, create and set a variable for daylength
        var currentPlanetDaylength = "";
        if (planet.rotation_period <20) {
            currentPlanetDaylength = "short";
        } else if (planet.rotation_period >= 20 && planet.rotation_period <= 28) {
            currentPlanetDaylength = "average";
        } else if (planet.rotation_period > 28) {
            currentPlanetDaylength = "long";
        } else {
            currentPlanetDaylength = "unknown";
        }

        // if the currently selected planet daylength matches the picklist value, print it
        if (currentPlanetDaylength == selectedDaylength) {
            var div = document.createElement('div');
            div.className = 'planet';
            div.innerHTML = '<p>' + planet.name + '</p>';
            document.body.appendChild(div);
        }
    });
}




// -------------------------------- Universal Functions --------------------------------//

// clear out all planets that are currently on the page
function clearResults() {
    // find all planet elements on the page, set them as 'element' in an array, 'elements'
    var elements = document.getElementsByClassName('planet'), element;
    // loop through elements and delete each planet element
    while (element = elements[0]) {
        element.parentNode.removeChild(element);
    }
}
// TODO: 
// X // Add options and search button to html page
// X // Create a standard function for displaying planets based on standard earth day length
// X // Call the clearResults() function when running this one
//   // Improve the quality of search results -- include climate and standard earth day
