const btn = document.getElementById("search-button");
const colours = {
	normal: "#A8A77A",
	fire: "#EE8130",
	water: "#6390F0",
	electric: "#F7D02C",
	grass: "#7AC74C",
	ice: "#96D9D6",
	fighting: "#C22E28",
	poison: "#A33EA1",
	ground: "#E2BF65",
	flying: "#A98FF3",
	psychic: "#F95587",
	bug: "#A6B91A",
	rock: "#B6A136",
	ghost: "#735797",
	dragon: "#6F35FC",
	dark: "#705746",
	steel: "#B7B7CE",
	fairy: "#D685AD",
};

const loadData = (pokemon) => {
	document.getElementById("pokemon-name").innerHTML =
		pokemon.name.toUpperCase();
	document.getElementById("pokemon-id").innerHTML = "#" + pokemon.id;
	document.getElementById("height").innerHTML = "Height: " + pokemon.height;
	document.getElementById("weight").innerHTML = "Weight: " + pokemon.weight;
	let img = document.createElement("img");
	img.id = "sprite";
	img.width = 200;
	img.src = pokemon.sprites.front_default;
	document.getElementById("img").append(img);
	document.getElementById("hp").innerHTML = pokemon.stats[0].base_stat;
	document.getElementById("attack").innerHTML = pokemon.stats[1].base_stat;
	document.getElementById("defense").innerHTML = pokemon.stats[2].base_stat;
	document.getElementById("special-attack").innerHTML =
		pokemon.stats[3].base_stat;
	document.getElementById("special-defense").innerHTML =
		pokemon.stats[4].base_stat;
	document.getElementById("speed").innerHTML = pokemon.stats[5].base_stat;
	pokemon.types.forEach((type) => {
		let div = document.createElement("div");
		div.innerHTML = type.type.name;
		div.style.backgroundColor = colours[type.type.name];
		document.getElementById("types").append(div);
	});
};

const clearData = () => {
	document.getElementById("pokemon-name").innerHTML = "";
	document.getElementById("pokemon-id").innerHTML = "";
	document.getElementById("height").innerHTML = "";
	document.getElementById("weight").innerHTML = "";
	document.getElementById("img").innerHTML = "";
	document.getElementById("hp").innerHTML = "";
	document.getElementById("attack").innerHTML = "";
	document.getElementById("defense").innerHTML = "";
	document.getElementById("special-attack").innerHTML = "";
	document.getElementById("special-defense").innerHTML = "";
	document.getElementById("speed").innerHTML = "";
	document.getElementById("types").innerHTML = "";
};

btn.addEventListener("click", async () => {
	const pokemon = document.getElementById("search-input").value.toLowerCase();
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	clearData();
	if (!res.ok) {
		alert("Pokémon not found");
	} else {
		const data = await res.json();
		console.log(data);
		loadData(data);
	}
});
