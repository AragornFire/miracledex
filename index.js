/*
I came so close to asking ChatGPT on multiple occasions,
until I thought "Wait, what if I just looked that up?"
 */

async function loadMiracles () {
	const res = await fetch("https://gist.githubusercontent.com/trevortomesh/7bbf97b2fbae96639ebf1a254b6a7a70/raw/miracles.json");
	const data = await res.json();
	console.log(data);
	renderMiracles(data);
	return data;
}

loadMiracles().then((data) => {globalThis.miracles = data;});


function displayBrick (id) {
	const brick = document.getElementById(id);
	const display = document.getElementById('display');
	const data = globalThis.miracles[parseInt(brick.id) - 1];
	console.log(data);

	display.classList = brick.classList;
	display.classList.add('display')
	display.innerHTML = '';

	const title = document.createElement("h1");
	title.textContent = data.title;
	display.appendChild(title);

	const location = document.createElement('h2');
	location.textContent = data.location;
	display.appendChild(location);

	const year = document.createElement('h4');
	year.textContent = data.year;
	display.appendChild(year);

	const summary = document.createElement("p");
	summary.textContent = data.summary;
	display.appendChild(summary);

}

const subclasses = {
	"Apparition": "apparition",
	"Healing": "healing",
	"Eucharistic": "eucharistic",
	"Incorruptible": "incorruptible"
}

function renderMiracles (data) {
	const wall = document.getElementById("wall");
	data.forEach(miracle => {
		const brick = document.createElement('div');
		brick.id = miracle.id;
		brick.classList.add('brick');
		brick.classList.add(subclasses[miracle.type]);

		const title = document.createElement("h3");
		title.textContent = miracle.title;
		brick.appendChild(title);

		const location = document.createElement('h4');
		location.textContent = miracle.location;
		brick.appendChild(location);

		const year = document.createElement('p');
		year.textContent = miracle.year;
		brick.appendChild(year);

		const summary = document.createElement("p");
		summary.textContent = miracle.summary;
		brick.appendChild(summary);

		brick.addEventListener('click', () => {displayBrick(brick.id)});

		wall.appendChild(brick);
	})
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