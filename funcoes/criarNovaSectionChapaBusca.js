function criarNovaSectionChapa() {

    const novaSection = document.createElement('section'); // Cria a nova section
    novaSection.setAttribute('id', 'secao_chapas');

    const conteiner = document.createElement('div'); // Inserir este elemento dentro da section com id=secao_chapas
    conteiner.setAttribute('id', 'headerChapas');

    const titulo = document.createElement('h2'); // Inserir este elemento dentro da div com id=headerChapas
    titulo.textContent = 'Chapas cadastradas';

    const busca = document.createElement('input'); // Inserir este elemento dentro da div com id=headerChapas
    busca.setAttribute('type', 'text');
    busca.setAttribute('id', 'campo-busca');
    busca.setAttribute('placeholder', 'Digite trecho da descrição');
    busca.setAttribute('oninput', 'this.value = this.value.toUpperCase()');
    busca.focus();

    const botaoBuscar = document.createElement('button'); // Inserir este elemento dentro da div com id=headerChapas
    botaoBuscar.textContent = 'Buscar';
    botaoBuscar.setAttribute('type', 'submit');
    botaoBuscar.setAttribute('id', 'btn-buscar');

    const conteiner1 = document.createElement('div'); // Inserir este elemento dentro da section com id=secao_chapas
    conteiner1.setAttribute('id', 'principal_secao_chapas');

    novaSection.appendChild(conteiner);
    novaSection.appendChild(conteiner1);
    conteiner.appendChild(titulo);
    conteiner.appendChild(busca);
    conteiner.appendChild(botaoBuscar);
    estruturaPrincipal.appendChild(novaSection);

    // Criando a tabela
    const tabela = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Adiciona o cabeçalho e o corpo a tabela
    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    // Cria o cabeçalho da tabela
    thead.innerHTML = `
        <tr>
            <th>Código</th>
            <th>Descrição</th>
        </th>
    `;
    
    // Função para renderizar as linhas da tabela
    function renderizarLinhas(dados) {
        tbody.innerHTML = ''; // Limpa as linhas existentes
        dados.forEach(chapa => {
            const linha = document.createElement('tr'); // Cria tr para linha
            const tdCodigoChapa = document.createElement('td'); // Cria td para célula
            tdCodigoChapa.textContent = chapa.codigo;
            tdCodigoChapa.style.cursor = 'pointer'; // Adiciona efeito de mãozinha
            tdCodigoChapa.style.color = 'blue'; // Cor azul para indicar que é clicável
            tdCodigoChapa.title = 'Clique para copiar o código'; // Dica ao passar o mouse
            tdCodigoChapa.addEventListener('click', () => {
                // Chama a função de copiar passando o código da chapa
                copiarCodigoTintaChapa(chapa.codigo);
            });
            // Cria a célula para descrição
            const tdDescricaoChapa = document.createElement('td'); // Cria td para célula
            tdDescricaoChapa.textContent = chapa.descricao;
            // Adiciona as duas células a linha
            linha.appendChild(tdCodigoChapa);
            linha.appendChild(tdDescricaoChapa);
            // Adiciona a linha ao corpo da tabela
            tbody.appendChild(linha);
        });
    }

    // Renderiza a tabela inicial com todas as chapas
    renderizarLinhas(chapas);

    // Adiciona o evento de clique ao botão de busca
    botaoBuscar.addEventListener('click', () => {
        const termoBusca = busca.value.toUpperCase();
        const chapasFiltradas = chapa.filter(chapa => chapa.descricao.toUpperCase().includes(termoBusca));
        renderizarLinhas(chapasFiltradas);
    });

    // Adiciona a tabela completa à div 'principal'
    conteiner1.appendChild(tabela);

    botaoChapas.disabled = true;
    botaoResetListas.disabled = false;
}