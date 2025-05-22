// (36) >> .innerHTML : Usada para acessar ou alterar o conteúdo HTML de um elemento.
// (30) >> .join() : junta todos os elementos da lista em uma string. Por padrão, uma VIRGULA separa os elementos

// pokemonList recebe o elemento com id pokemonList 
const pokemonList = document.getElementById('pokemonList')

const modal = document.getElementById('pokemonModal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalImage = document.getElementById('modal-image');
const closeButton = document.querySelector('.close-button');

// loadMoreButton recebe o elemento com id loadMoreButton 
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151 // define o limite de pokemons a serem exibidos na página
const limit = 4 // define cada incremento da listagem
let offset = 0; // define em qual pokemon vai iniciar a listagem




function loadPokemonItens(offset, limit) {// Function que acrescenta mais pokemons a listagem quando botão "Load More" é clicado
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { // Converte a lista de pokemons para uma lista no HTML
        const newHtml = pokemons.map((pokemon) => // Function que acrescenta os pokemons e seus detalhes com base na API
            `
            <li class="pokemon ${pokemon.type}" 
                data-name="${pokemon.name}" 
                data-description="Tipos: ${pokemon.types.join(', ')}" 
                data-image="${pokemon.photo}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>
            `
        ).join('')
        pokemonList.innerHTML += newHtml // Ao invés de substituir a página, junta as páginas, mantendo os pokemons anteriores
    })
}

// Função para abrir o modal
function openModal(pokemonName, pokemonDescription, pokemonImage) {
    modalTitle.textContent = pokemonName; // Atualiza o título do modal
    modalDescription.textContent = pokemonDescription; // Atualiza a descrição do modal
    modalImage.src = pokemonImage;
    modalImage.alt = `imagem de ${pokemonName}`;
    modal.classList.remove('hidden');
    modal.classList.add('visible'); // Exibe o modal
}

// Função para fechar o modal
function closeModal() {
    modal.classList.remove('visible'); // Esconde o modal
}
// Eventos para fechar o modal
closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Evento de clique nos itens da lista
pokemonList.addEventListener('click', (event) => {
    const target = event.target.closest('li'); // Garante que clique no <li> seja capturado
    if (target) {
        const pokemonName = target.getAttribute('data-name'); // Obtém o nome
        const pokemonDescription = target.getAttribute('data-description'); // Obtém a descrição
        const pokemonImage = target.getAttribute('data-image');
        openModal(pokemonName, pokemonDescription, pokemonImage); // Abre o modal com os dados
    }
});

// Inicializar o carregamento dos Pokémon
loadPokemonItens(offset, limit);// Chama a function para gerar os primeiros pokemons

// *Function click button 
loadMoreButton.addEventListener('click', () => {
     offset += limit;
    const qtdRecordsWithNextPage = offset + limit;
     if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

// Function click button + limitação de pokemons
// loadMoreButton.addEventListener('click', () => {
//     offset += limit

//     const qtdRecordWithNextPage = offset + limit

//     if (qtdRecordWithNextPage >= maxRecords) {
//         const newLimit = maxRecords - offset
//         loadPokemonItens(offset, newLimit)
        
//         loadMoreButton.parentElement.removeChild(loadMoreButton)
//     } else {
//         loadPokemonItens(offset, limit)
//     }
// })