const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImage = document.getElementById("sprite");
const pokemonTypes = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

async function fetchAllPokemon() {
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value.toLowerCase()}`);
        if (!response.ok) throw new Error("Pokémon not found");

        const data = await response.json();
        const { name, height, weight, id, types, stats, sprites } = data;

        pokemonName.textContent = name.toUpperCase();
        pokemonId.textContent = `#${id}`;
        pokemonWeight.textContent = `Weight: ${weight}`;
        pokemonHeight.textContent = `Height: ${height}`;

        
        pokemonTypes.innerHTML = types
            .map(type => `<span class="${type.type.name.toLowerCase()}">${type.type.name.toUpperCase()}</span>`)
            .join(" ");

        // ✅ Display stats
        hp.textContent = stats[0].base_stat;
        attack.textContent = stats[1].base_stat;
        defense.textContent = stats[2].base_stat;
        specialAttack.textContent = stats[3].base_stat;
        specialDefense.textContent = stats[4].base_stat;
        speed.textContent = stats[5].base_stat;

        
        const pokemonSprite = sprites?.front_default || "";
        if (pokemonSprite) {
            pokemonImage.src = pokemonSprite;
            pokemonImage.style.display = "block";
        } else {
            pokemonImage.style.display = "none";
        }

    } catch (error) {
        alert("Pokémon not found");
        console.error("Error fetching Pokémon:", error);
    }
}
