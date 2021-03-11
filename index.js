import { planets } from './planets.js'

var allPlanets = planets

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
}
