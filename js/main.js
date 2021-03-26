import { planets } from './swapi_files/planets.js'
import { species } from './swapi_files/species.js'

var allPlanets = planets
var allSpecies = species

/****************************************************************************************/
/************************************GLOBAL VARIABLES************************************/
/****************************************************************************************/
var parsedURLArray = window.location.href.split("/");
const CURRENT_PAGE = parsedURLArray[parsedURLArray.length - 1];

/************* This will print all species names onto the page -- probably delete later
for (var i = 0; i < allSpecies.length; i++) {
    // create a new element of type div as a variable
    var div = document.createElement('div');

    // assign the new div a class of 'planet' -> use CSS for styling later
    div.className = 'species';

    // fill the div with a <p> element and fill the planet name
    div.innerHTML = '<p>' + allSpecies[i].classification + '</p>';

    // add the whole div variable to the document body
    document.body.appendChild(div);

    // iterate and go to the next planet
} */

/****************************************************************************************/
/**************************CODE THAT RUNS BASED ON CURRENT PAGE**************************/
/****************************************************************************************/
if (CURRENT_PAGE == "planets.html") {
    var searchButtonClimate = document.getElementById("search-button-climate");
    if (searchButtonClimate.addEventListener)
        searchButtonClimate.addEventListener("click", searchByClimate, false);
    else if (searchButtonClimate.attachEvent)
        searchButtonClimate.attachEvent('onclick', searchByClimate);
    var searchButtonDaylength = document.getElementById("search-button-daylength");
    if (searchButtonDaylength.addEventListener)
        searchButtonDaylength.addEventListener("click", searchByDaylength, false);
    else if (searchButtonDaylength.attachEvent)
        searchButtonDaylength.attachEvent('onclick', searchByDaylength);
}
if (CURRENT_PAGE == "species.html") {
    var searchButtonClimate = document.getElementById("search-button-classification");
    if (searchButtonClimate.addEventListener)
        searchButtonClimate.addEventListener("click", searchByClassification, false);
    else if (searchButtonClimate.attachEvent)
        searchButtonClimate.attachEvent('onclick', searchByClassification);
    var searchButtonAvgHeight = document.getElementById("search-button-avgheight");
    if (searchButtonAvgHeight.addEventListener)
        searchButtonAvgHeight.addEventListener("click", searchByAvgHeight, false);
    else if (searchButtonAvgHeight.attachEvent)
        searchButtonAvgHeight.attachEvent('onclick', searchByAvgHeight);
}

/****************************************************************************************/
/************************************PLANET FUNCTIONS************************************/
/****************************************************************************************/

// --------------------------------- searchByClimate() ---------------------------------//
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
                loadResultsTable(planet);
            }
        });
    });
}

// --------------------------------- searchByDaylength() ---------------------------------//
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
            loadResultsTable(planet);
        }
    });
}

/****************************************************************************************/
/************************************SPECIES FUNCTIONS***********************************/
/****************************************************************************************/

// ----------------------------- searchByClassification() ------------------------------//
// search by the selected classification
function searchByClassification() {
    // clear current results on the page so you don't have to refresh between searches
    clearResults();

    // get text of the currently selected option from the classification picklist
    var selectedClassification = document.getElementById('classification-picklist');
    selectedClassification = selectedClassification.options[selectedClassification.selectedIndex].value;

    // Sort through all possible classifications and try to find a match,
    //    if a match is found, print it and loop until complete.
    allSpecies.forEach(species => {
        if (selectedClassification === species.classification) {
            loadResultsTable(species);
        }
    });
}

// --------------------------------- searchByAvgHeight() ---------------------------------//
// search by the selected average height
function searchByAvgHeight() {
    // clear current results on the page so you don't have to refresh between searches
    clearResults();

    // get text of the currently selected option from the avgheight picklist
    var selectedAvgHeight = document.getElementById('avgheight-picklist');
    selectedAvgHeight = selectedAvgHeight.options[selectedAvgHeight.selectedIndex].value;

    // Sort through all heights and try to find a match (logic included in block),
    //    if a match is found, print it and loop until complete.
    allSpecies.forEach(species => {
        // for the currently selected species, create and set a variable for avgheight
        var currentSpeciesAvgHeight = "";
        if (species.average_height <= 100) {
            currentSpeciesAvgHeight = "short";
        } else if (species.average_height > 100 && species.average_height <= 200) {
            currentSpeciesAvgHeight = "medium";
        } else if (species.average_height > 200) {
            currentSpeciesAvgHeight = "tall";
        } else if (species.average_height == "n/a") {
            currentSpeciesAvgHeight = "na";
        } else {
            currentSpeciesAvgHeight = "unknown";
        }

        // if the currently selected species height matches the picklist value, print it
        if (currentSpeciesAvgHeight == selectedAvgHeight) {
            loadResultsTable(species);
        }
    });
}

/****************************************************************************************/
/**********************************UNIVERSAL FUNCTIONS***********************************/
/****************************************************************************************/
// load results table for the current page
function loadResultsTable(searchItem) {
    // reference the current page so that this function can be used across pages
    var currentPageClass;
    switch(CURRENT_PAGE) {
        case "species.html":
            currentPageClass = "species"
            break;
        case "planets.html":
            currentPageClass = "planet"
            break;
        default:
            break;
    }
    
    var tr = document.createElement('tr');
    tr.className = 'result';
    // prints out results based on the current page
    if (currentPageClass == "species") {
        tr.innerHTML = '<td>' + searchItem.name + '</td>' +
        '<td>' + searchItem.classification + '</td>' +
        '<td>' + searchItem.average_height + '</td>';
    } else if (currentPageClass == 'planet') {
        tr.innerHTML = '<td>' + searchItem.name + '</td>' +
        '<td>' + searchItem.climate + '</td>' +
        '<td>' + searchItem.rotation_period + '</td>';
    }
    // print to the console that we're using querySelector() - fulfilling requirement on the rubric
    console.log("querySelector() was just used!")
    document.querySelector("#results-table").appendChild(tr);
}

// clear out all results that are currently on the page
function clearResults() {
    // find all results elements on the page, set them as 'element' in an array, 'elements'
    var elements = document.getElementsByClassName('result'), element;
    // loop through elements and delete each result element
    while (element = elements[0]) {
        element.parentNode.removeChild(element);
    }
}