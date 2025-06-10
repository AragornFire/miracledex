/*
I came so close to asking ChatGPT on multiple occasions,
until I thought "Wait, what if I just looked that up?"
 */

async function loadMiracles () {
	const res = await fetch("https://gist.githubusercontent.com/trevortomesh/7bbf97b2fbae96639ebf1a254b6a7a70/raw/miracles.json");
	const data = await res.json();
	console.log(data);
	renderMiracles(data, "first"); // Go to the first page
	return data;
}

loadMiracles().then((data) => {globalThis.miracles = data;});

function makeHTMLElement (pair) {
	const elem = document.createElement(pair[0]);
	elem.textContent = pair[1];
	return elem;
}

function displayBrick (id) {
	const brick = document.getElementById(id);
	const display = document.getElementById('display');
	const miracle = globalThis.miracles[parseInt(brick.id) - 1];
	//console.log(data); // Debugging

	display.classList = brick.classList; // Should have the same styling
	display.classList.add('display'); // This is used to avoid the hovering style change
	display.innerHTML = ''; // Clear out element

	[['h1', miracle.title], ['h2', miracle.type + ': ' + miracle.category], ['h3', miracle.location + ' - ' + miracle.year], ['p', miracle.summary], ['p', miracle.details]].forEach(pair => {
		display.appendChild(makeHTMLElement(pair)); // Add all the elements
	});
}

const subclasses = { // Subclasses for special coloring
	"Apparition": "apparition",
	"Healing": "healing",
	"Eucharistic": "eucharistic",
	"Incorruptible": "incorruptible"
}

function renderMiracles (data, half) {
	const wall = document.getElementById("wall");
	wall.innerHTML = ""; // Clear out the contents for pagination
	let myData = []; // Used for slicing
	const midpoint = Math.floor(data.length / 2); // Save code
	if (half === "first") {
		myData = data.slice(0, midpoint);
	} else if (half === "second") {
		myData = data.slice(midpoint, data.length);
	} else {
		alert("Error in determining which page to load!") // Should always be there, so must be an error
	}

	myData.forEach(miracle => {
		const brick = document.createElement('div');
		brick.id = miracle.id; // For showing at the top of the page
		brick.classList.add('brick');
		brick.classList.add(subclasses[miracle.type]); // Special coloring

		[['h3', miracle.title], ['h4', miracle.location + ' - ' + miracle.year], ['p', miracle.summary]].forEach(pair => {
			brick.appendChild(makeHTMLElement(pair)); // Add all the elements
		});
		brick.addEventListener('click', () => {displayBrick(brick.id)}); // For putting them at the top of the page

		wall.appendChild(brick);
	})
}

const buttons = document.getElementsByTagName('button'); // Add paging functionality to buttons
for (let button of buttons) {
	button.addEventListener('click', () => {renderMiracles(miracles, button.id)});
}

/*
Reference data
{
    id: 20,
    type: 'Eucharistic',
    title: 'Siena Incorrupt Hosts',
    location: 'Siena, Italy',
    year: 1730,
    summary: 'Consecrated hosts remain miraculously preserved for nearly 300 years.',
    details: 'Scientific tests show no decay despite natural conditions for disintegration.',
    category: 'Incorrupt host'
}
 */