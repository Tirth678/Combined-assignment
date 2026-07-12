const pokemonContainer = document.getElementById('pokemonContainer');
const cardCountInput = document.getElementById('cardCount');
const fetchBtn = document.getElementById('fetchBtn');
const loading = document.getElementById('loading');
const categoryButtons = document.querySelectorAll('.category-btn');

let selectedType = 'fire';
const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    dragon: '#7038F8',
    normal: '#A8A878',
    poison: '#A040A0',
    fairy: '#EE99AC',
    ground: '#E0C068',
    fighting: '#C03028',
    flying: '#A890F0',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    steel: '#B8B8D0'
};

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedType = btn.dataset.type;
    });
});

// Set initial active button
document.querySelector('[data-type="fire"]').classList.add('active');

async function fetchPokemonByType(type) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();
        return data.pokemon.map(p => p.pokemon);
    } catch (error) {
        console.error('Error fetching type data:', error);
        return [];
    }
}

async function fetchPokemonData(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokemon not found');
        return await response.json();
    } catch (error) {
        console.error('Error fetching pokemon:', error);
        return null;
    }
}

function getRandomPokemonIds(count) {
    const ids = [];
    for (let i = 0; i < count; i++) {
        ids.push(Math.floor(Math.random() * 151) + 1);
    }
    return ids;
}

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    
    const types = pokemon.types.map(t => `
        <span class="type-badge type-${t.type.name}">${t.type.name}</span>
    `).join('');
    
    const stats = pokemon.stats.map(stat => `
        <div class="stat-item stat-${stat.stat.name}">
            <span class="stat-name">${stat.stat.name.replace('-', ' ')}</span>
            <span class="stat-value">${stat.base_stat}</span>
            <div class="stat-bar">
                <div class="stat-bar-fill" style="width: ${Math.min(stat.base_stat / 1.5, 100)}%"></div>
            </div>
        </div>
    `).join('');
    
    card.innerHTML = `
        <div class="pokemon-image">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>
        <h2 class="pokemon-name">${pokemon.name}</h2>
        <p class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</p>
        <div class="pokemon-types">${types}</div>
        <div class="pokemon-stats">${stats}</div>
    `;
    
    return card;
}

async function loadPokemon() {
    const count = parseInt(cardCountInput.value) || 6;
    
    loading.classList.remove('hidden');
    pokemonContainer.innerHTML = '';
    
    try {
        const typePokemon = await fetchPokemonByType(selectedType);
        
        if (typePokemon.length === 0) {
            const randomIds = getRandomPokemonIds(count);
            const pokemonPromises = randomIds.map(id => fetchPokemonData(id));
            const pokemonData = await Promise.all(pokemonPromises);
            
            pokemonData.filter(Boolean).forEach(pokemon => {
                const card = createPokemonCard(pokemon);
                pokemonContainer.appendChild(card);
            });
        } else {
            const shuffled = typePokemon.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, count);
            
            const pokemonPromises = selected.map(p => fetchPokemonData(p.name));
            const pokemonData = await Promise.all(pokemonPromises);
            
            pokemonData.filter(Boolean).forEach(pokemon => {
                const card = createPokemonCard(pokemon);
                pokemonContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading Pokemon:', error);
        pokemonContainer.innerHTML = '<p style="color: white; text-align: center;">Error loading Pokemon. Please try again.</p>';
    } finally {
        loading.classList.add('hidden');
    }
}

fetchBtn.addEventListener('click', loadPokemon);

// Load initial Pokemon
loadPokemon();