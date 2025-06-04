$.ajaxSetup({async: false});
const animals = $.getJSON("http://100.80.135.130:8500/data/animals").responseJSON;
const plants = $.getJSON("http://100.80.135.130:8500/data/plants").responseJSON;
const habitats = $.getJSON("http://100.80.135.130:8500/data/habitats").responseJSON;
const habitat_plants = $.getJSON("http://100.80.135.130:8500/data/habitat-flora").responseJSON;
const habitat_animals = $.getJSON("http://100.80.135.130:8500/data/habitat-fauna").responseJSON;
const species = $.getJSON("http://100.80.135.130:8500/data/species").responseJSON;
const species_plants = $.getJSON("http://100.80.135.130:8500/data/species-flora").responseJSON;
const species_animals = $.getJSON("http://100.80.135.130:8500/data/species-fauna").responseJSON;

function greenCard(data) {
	return `<div class="card green fadeInUp-animation"> <img src="${data.imgsrc}"/> <div> <h8>${data.name}</h8> <p>${data.desc}</p> </div> </div>`
}

function blueCard(data) {
	return `<div class="card blue"> <img src="${data.imgsrc}"/> <div> <h8>${data.name}</h8> <p>${data.desc}</p> </div> </div>`
}

function dropDownItem(data) {
	return `<div class="ddi"> <img src="${data.imgsrc}"/> <div> <h8>${data.name}</h8> <p>${data.desc}</p> </div> </div> <hr>`
}

function dropDown(data) {
	return `<div> <div class="ddh" onclick="toggleDrop('d${data.id}');toggleDrop('b${data.id}')"> <h1>${data.name}</h1> <img src="https://icons.veryicon.com/png/o/miscellaneous/arrow-4/down-arrow-1-4.png"/> </div> <div style="display:none;" id ="d${data.id}"> <p>${data.desc}</p> <div id="d${data.id}o"> <h2>Life in the ${data.name}:</h2> </div> </div> <button  id="b${data.id}" style="display:none;" onclick="toggleDrop('d${data.id}');toggleDrop('b${data.id}')"> <img src="https://icons.veryicon.com/png/o/miscellaneous/arrow-4/up-arrow-1-3.png" /> </button> </div>`
}

function dropDown2(data) {
	return `<div> <div class="ddh" onclick="toggleDrop('d${data.id}');toggleDrop('b${data.id}')"> <h1>${data.name}</h1> <img src="https://icons.veryicon.com/png/o/miscellaneous/arrow-4/down-arrow-1-4.png"/> </div> <div style="display:none;" id ="d${data.id}"> <div id="d${data.id}o"></div> </div> <button id="b${data.id}" style="display:none;" onclick="toggleDrop('d${data.id}');toggleDrop('b${data.id}')"> <img src="https://icons.veryicon.com/png/o/miscellaneous/arrow-4/up-arrow-1-3.png" /> </button> </div>`
}


const search = (arr, key, value) => {
	const results = arr.filter(
		(item) => {
			return item[key].toLowerCase().includes(value.toLowerCase());
		}
	)	
	return results;
}	

// returns string with html data of cards
function buildElement(arr, cardFunction) {
	let build = "";
	arr.forEach( (item) => {
			build += cardFunction(item);
		} 
	)
	return build;
}

const toggleDrop = (id) => {
	const element = document.getElementById(id);
	if( element.style.cssText == "display: none;" ) {
		element.style = "display: block";
	} else if( element.style.cssText == "display: block;" ) {
		element.style = "display: none";
	}
}

const searchAnimals = () => {
		const searchElement = document.getElementById("search");
		const output = document.getElementById("container");
		const results = search(animals, "name", searchElement.value);
		output.innerHTML = results.length > 0 ? buildElement(results,greenCard) : "No Results";
		
	}


const searchPlants = () => {
		const searchElement = document.getElementById("search");
		const output = document.getElementById("container");
		const results = search(plants, "name", searchElement.value);
		
		output.innerHTML = results.length > 0 ? buildElement(results,greenCard) : "No Results";
		
	}


function initAnimals() {

	container = document.getElementById("container");

	container.innerHTML = buildElement(animals, greenCard);
}

function initPlants() {

	container = document.getElementById("container");

	container.innerHTML = buildElement(plants, greenCard);
}

function initHabitats() {
	container = document.getElementById("dds");

	container.innerHTML = buildElement(habitats, dropDown);

	habitats.forEach( (habitat) => {
		const p = habitat_plants.filter( (plant) => {return habitat.id == plant.id} );
		const a = habitat_animals.filter( (animal) => {return habitat.id == animal.id} )
		const c = document.getElementById(`d${habitat.id}o`)
		c.innerHTML += buildElement(a, dropDownItem);
		c.innerHTML += buildElement(p, dropDownItem);
	} )
}

function initSpecies() {
	container = document.getElementById("dds");

	container.innerHTML = buildElement(species, dropDown2);

	species.forEach( (species) => {
		const p = species_plants.filter( (plant) => {return species.id == plant.id} );
		const a = species_animals.filter( (animal) => {return species.id == animal.id} )
		const c = document.getElementById(`d${species.id}o`)
		c.innerHTML += buildElement(a, dropDownItem);
		c.innerHTML += buildElement(p, dropDownItem);
	} )
}
