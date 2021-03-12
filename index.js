import { planets } from './planets.js'

var allPlanets = planets

/************** This will print all planet names onto the page -- probably delete later
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

// This block executes searchByClimate() from the search button
var searchButton = document.getElementById("search-button");
if (searchButton.addEventListener)
    searchButton.addEventListener("click", searchByClimate, false);
else if (searchButton.attachEvent)
    searchButton.attachEvent('onclick', searchByClimate);

// logic to search by the selected climate
function searchByClimate() {
    // get text from the picklist element
    var selectedClimate = document.getElementById('climate-picklist');
    selectedClimate = selectedClimate.options[selectedClimate.selectedIndex].value;

    // Sort through all possible climates and try to find a match,
    //    if a match is found, print it.
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

// TODO: 
// prior to running any code through the submit button, figure out a way to clear out all existing planet divs