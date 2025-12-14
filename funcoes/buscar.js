// Seleciona o contêiner onde os cards serão exibidos.
let cardContainer = document.querySelector('.card-container');
// Seleciona o campo de input usado para a busca.
let campoBusca = document.querySelector('header input');
// Seleciona o botão de limpar.
let botaoLimpar = document.querySelector('#botao-limpa');

// Array que irá armazenar os dados carregados do arquivo JSON.
let dados = [];

// Função assíncrona para buscar e filtrar os dados.
async function iniciarBusca() {
    // Se o array 'dados' estiver vazio, busca os dados do arquivo JSON.
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json"); // fetch significa buscar, nesse caso ele trará o arquivo data.json
            dados = await resposta.json();
        } catch (error) {
            console.error("Falha ao buscar dados:", error);
            return; // Interrompe a execução se houver erro
        }
    }

    // Obtém o valor do campo de busca e converte para minúsculas para uma busca case-insensitive.
    const termoBusca = campoBusca.value.toLowerCase();
    // Filtra o array 'dados' para encontrar itens que correspondam ao termo de busca no nome ou na descrição.
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    
    // Chama a função para renderizar os cards com os dados filtrados.
    renderizaCard(dadosFiltrados);
}

// Função para renderizar os cards na tela com base nos dados fornecidos.
function renderizaCard(dados) {

    // Limpa o conteúdo do contêiner de cards para evitar duplicatas ao renderizar novos resultados.
    cardContainer.innerHTML = ""; 
    
    // Itera sobre cada item do array de dados para criar um card para cada um.
    for (let dado of dados) {

        // Cria um novo elemento <article> para representar o card.
        let article = document.createElement('article');
        article.classList.add('card');
        // Define o conteúdo HTML do card usando um template literal com os dados do item.
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>Data de criação: ${dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <p>Tags: ${dado.tags}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>`;

        // Adiciona o card recém-criado ao contêiner de cards no DOM.
        cardContainer.appendChild(article);
    }
}

// Função para limpar os resultados da busca e o campo de input.
function limparBusca() {
    // Limpa o conteúdo do contêiner de cards.
    cardContainer.innerHTML = "";
    // Limpa o valor do campo de busca.
    campoBusca.value = "";
}

// Adiciona um ouvinte de evento ao botão 'limpar' que chama a função limparBusca ao ser clicado.
botaoLimpar.addEventListener('click', limparBusca);