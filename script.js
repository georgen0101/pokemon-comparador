const tipoColores = {
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
    fairy: "#D685AD"
};


window.onload = () => {
    const selects = document.querySelectorAll("select");

    fetch("https://pokeapi.co/api/v2/pokemon?limit=149")
        .then(res => res.json())
        .then(data => {
            data.results.forEach(pokemon => {
                selects.forEach(select => {
                    const option = document.createElement("option");
                    option.value = pokemon.name;
                    option.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                    select.appendChild(option);
                });
            });
        });
};


function cargarPokemon(nombre, index) {
    if (!nombre) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)
        .then(res => res.json())
        .then(data => {
            const contenedor = document.getElementById(`pokemon${index}`); // DEFINIDO AQUÍ

            const tipos = data.types.map(t => t.type.name).join(', ');
            const tipoPrincipal = data.types[0].type.name;
            const color = tipoColores[tipoPrincipal] || "#FFFFFF"; // AHORA SÍ está definido antes de usarlo

            const habilidades = data.abilities.map(h => h.ability.name).join(', ');

            let stats = '';
            data.stats.forEach(stat => {
                stats += `<li>${stat.stat.name.toUpperCase()}: ${stat.base_stat}</li>`;
            });

            contenedor.style.backgroundColor = color;
            contenedor.style.color = "black";
            contenedor.style.borderRadius = "10px";

            contenedor.innerHTML = `
                <h2>${data.name.toUpperCase()}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}" />
                <p><strong>Tipo:</strong> ${tipos}</p>
                <p><strong>Altura:</strong> ${data.height / 10} m</p>
                <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                <p><strong>Habilidades:</strong> ${habilidades}</p>
                <ul>${stats}</ul>
            `;
        })
        .catch(() => {
            document.getElementById(`pokemon${index}`).innerHTML = "Error al cargar.";
        });
}


