window.addEventListener('load', () => {
	//Pozwolenie na notyfikacje
	Notification.requestPermission().then((result) => {
		console.log(result);
	});
	//Puzzle
	const image = new Image();
	window.counter = 0;
	window.paragraf = document.getElementById("nofi");
	//Przyciski
	const geoloc = document.getElementById('geobutt');
	const getmap = document.getElementById('rasbutt');
	const puzzle = document.getElementById('puzzbutt');
	geoloc.disabled = false;
	getmap.disabled = false;
	puzzle.disabled = true;
	
	//Paragraf
	var x = document.getElementById("nofi");
	//Wyświetlanie bazowej mapy Szczecina
	const map = L.map('geo').setView([53.43, 14.55], 13);
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	}).addTo(map);
	
	//POBRANIE LOKALIZACJI
	geoloc.addEventListener('click', add=>{
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else { 
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	})
	//POBRANIE MAPY
	getmap.addEventListener('click', add=>{	
		leafletImage(map, function(err, canvas) {
			const mapcanv = document.getElementById('drop_map');
			const dataURL = canvas.toDataURL();
			mapcanv.setAttribute('src', canvas.toDataURL());
		});
		puzzle.style.background='green';
		puzzle.disabled = false;
	})
	//PODZIAŁ NA PUZZLE
	puzzle.addEventListener('click', add=>{
		image.onload = cutImageUp;
		image.src = document.getElementById('drop_map').getAttribute('src');
		geoloc.disabled = true;
		getmap.disabled = true;
		puzzle.disabled = true;
		geoloc.style.background='red';
		getmap.style.background='red';
		puzzle.style.background='red';
	})
	//Pokaż moją pozycję na mapie
	function showPosition(position) {
		x.innerHTML = "Twoja geolokalizacja: Latitude: " + position.coords.latitude + 
		" Longitude: " + position.coords.longitude;
		map.setView([position.coords.latitude, position.coords.longitude], 13);
	} 
	
	//FUNKCJA PRZECINAJĄCA/UMIESZCZAJĄCA
	function cutImageUp() {
		var imagePieces = [];
		//Przecięcie obrazu na puzzle
		for(let x = 0; x < 4; ++x) {
			for(let y = 0; y < 4; ++y) {
				const puzel = document.createElement('canvas');
				puzel.width = 100;
				puzel.height = 100;
				const ctx = puzel.getContext('2d');
				ctx.drawImage(image, x * 100, y * 100, 100, 100, 0, 0, puzel.width, puzel.height);
				imagePieces.push(puzel.toDataURL());
			}
		}
		//Umieszczenie puzzli w divach
		var randomPuzzle = document.getElementsByClassName('puzzle_element');
		var arr = []
		var iter = 0
		while(arr.length < 16) {
			const index = Math.floor(Math.random() * imagePieces.length);
			if(arr.indexOf(index) === -1){ 
				arr.push(index);
				const img = document.createElement('img');
				img.width = 100;
				img.height = 100;
				img.draggable= 'true';
				img.src = imagePieces[index]
				img.id = "tp"+index
				randomPuzzle[iter].appendChild(img);
				iter+=1;
				//imagePieces.splice(index, 1);
			}
		}
	}
	//Pokaż moją pozycję na mapie
	function showPosition(position) {
		x.innerHTML = "Twoja geolokalizacja: Latitude: " + position.coords.latitude + 
		" Longitude: " + position.coords.longitude;
		map.setView([position.coords.latitude, position.coords.longitude], 13);
	} 
})
function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	window.dragid = ev.target;
	ev.dataTransfer.setData("text", ev.target.id);
	dragid.value="Niema"
}

function drop(ev) {
	window.dropid = ev.target;
	if (dropid.value == "Niema"){return;} 
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
	dropid.value = "Jest";
	checker();
}

function checker(){
		if (dragid.id == "tp0" && dropid.id == "lp0"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp1" && dropid.id == "lp4"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp2" && dropid.id == "lp8"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp3" && dropid.id == "lp12"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp4" && dropid.id == "lp1"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp5" && dropid.id == "lp5"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp6" && dropid.id == "lp9"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp7" && dropid.id == "lp13"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp8" && dropid.id == "lp2"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp9" && dropid.id == "lp6"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp10" && dropid.id == "lp10"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp11" && dropid.id == "lp14"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp12" && dropid.id == "lp3"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp13" && dropid.id == "lp7"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp14" && dropid.id == "lp11"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	else if (dragid.id == "tp15" && dropid.id == "lp15"){dragid.ondragover='false'; dropid.ondragstart='false'; counter += 1;}
	
	if (counter == 16){
		paragraf.innerHTML = "POPRAWNIE UŁOŻYŁEŚ PUZZLE!!!";
		showNotification();
	}
}
function showNotification(){
	const notification = new Notification("Puzzle", {
		body: "Gratulacje użytkowniku, poprawnie ułożyłeś puzzle!"
	});
}
