function criarNovaSectionTinta() {

    const novaSection = document.createElement('section'); // Cria a nova section
    novaSection.setAttribute('id', 'secao_tintas');

    const conteiner = document.createElement('div'); // Inserir este elemento dentro da section com id=secao_tintas
    conteiner.setAttribute('id', 'headerTintas');

    const titulo = document.createElement('h2'); // Inserir este elemento dentro da div com id=headerTintas
    titulo.textContent = 'Tintas cadastradas';

    const busca = document.createElement('input'); // Inserir este elemento dentro da div com id=headerTintas
    busca.setAttribute('type', 'text');
    busca.setAttribute('id', 'campo-busca');
    busca.setAttribute('placeholder', 'Digite trecho da descrição');
    busca.setAttribute('oninput', 'this.value = this.value.toUpperCase()');
    busca.focus();

    const botaoBuscar = document.createElement('button'); // Inserir este elemento dentro da div com id=headerTintas
    botaoBuscar.textContent = 'Buscar';
    botaoBuscar.setAttribute('type', 'submit');
    botaoBuscar.setAttribute('id', 'btn-buscar');

    const conteiner1 = document.createElement('div'); // Inserir este elemento dentro da section com id=secao_tintas
    conteiner1.setAttribute('id', 'principal_secao_tintas');

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
        </tr>
    `;

    // Função para renderizar as linhas da tabela
    function renderizarLinhas(dados) {
        tbody.innerHTML = ''; // Limpa as linhas existentes
        dados.forEach(tinta => {
            const linha = document.createElement('tr'); // Cria tr para linha
            const tdCodigoTinta = document.createElement('td'); // Cria td para célula
            tdCodigoTinta.textContent = tinta.codigo;
            tdCodigoTinta.style.cursor = 'pointer'; // Adiciona efeito de mãozinha
            tdCodigoTinta.style.color = 'blue'; // Cor azul para indicar que é clicável
            tdCodigoTinta.title = 'Clique para copiar o código'; // Dica ao passar o mouse
            tdCodigoTinta.addEventListener('click', () => {
                // Chama a função de copiar passando o código da tinta
                copiarCodigoTintaChapa(tinta.codigo);
            });
            // Cria a célula para descrição
            const tdDescricaoTinta = document.createElement('td'); // Cria td para célula
            tdDescricaoTinta.textContent = tinta.descricao;
            // Adiciona as duas céluas a linha
            linha.appendChild(tdCodigoTinta)
            linha.appendChild(tdDescricaoTinta);
            // Adiciona a linha ao corpo da tabela
            tbody.appendChild(linha);
        });
    }

    // Renderiza a tabela inicial com todas as tintas
    renderizarLinhas(tintas);

    // Adiciona o evento de clique ao botão de busca
    botaoBuscar.addEventListener('click', () => {
        const termoBusca = busca.value.toUpperCase();
        const tintasFiltradas = tintas.filter(tinta => 
            tinta.descricao.toUpperCase().includes(termoBusca)
        );
        renderizarLinhas(tintasFiltradas);
    });

    // Adiciona a tabela completa à div 'principal'
    conteiner1.appendChild(tabela);

    botaoTintas.disabled = true;
    botaoResetListas.disabled = false;
}