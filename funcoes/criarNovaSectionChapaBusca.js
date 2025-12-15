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

    const botaoLimpaBusca = document.createElement('button'); // Inserir este elemento dentro da div com id=headerChapas
    botaoLimpaBusca.textContent = 'Limpar';
    botaoLimpaBusca.setAttribute('type', 'submit');
    botaoLimpaBusca.setAttribute('id', 'btn-limpa-busca');

    const conteiner1 = document.createElement('div'); // Inserir este elemento dentro da section com id=secao_chapas
    conteiner1.setAttribute('id', 'principal_secao_chapas');

    novaSection.appendChild(conteiner);
    novaSection.appendChild(conteiner1);
    conteiner.appendChild(titulo);
    conteiner.appendChild(busca);
    conteiner.appendChild(botaoBuscar);
    conteiner.appendChild(botaoLimpaBusca);
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
    function renderizarLinhas(dados, termoBusca = '') {
        tbody.innerHTML = ''; // Limpa as linhas existentes

        // Converte o termo de busca para maiúsculas (para corresponder ao filtro)
        const termoBuscaUpper = termoBusca.toUpperCase();

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

            if(termoBuscaUpper.length > 0) {
                // Se houver um termo de busca, aplica o destaque
                const descricaoUpper = chapa.descricao.toUpperCase();
                const indice = descricaoUpper.indexOf(termoBuscaUpper); // Encontra o índice, localiza onde a palavra começa (em maiúsculas)

                if(indice !== -1) {
                    // Constrói o HTML com a parte destacada
                    // Divide a string e 3 partes (parteAntes, parteDestacada e parteDepois)
                    /*
                    Importante: É usado chapa.descricao.substring(...) (a string original, com a caixa correta) para montar as partes, garantindo que o caso (maiúsculas/minúsculas) da descrição original seja mantido, exceto na parte do destaque que é retirada com base no índice encontrado
                    */
                    const parteAntes = chapa.descricao.substring(0, indice);
                    const parteDestacada = chapa.descricao.substring(indice, indice + termoBuscaUpper.length);
                    const parteDepois = chapa.descricao.substring(indice + termoBuscaUpper.length);

                    // Montando o HTML
                    tdDescricaoChapa.innerHTML = `${parteAntes}<span class="destaque-busca">${parteDestacada}</span>${parteDepois}`;
                } else {
                    // Caso não encontre (o que não deve acontecer se a filtragem for correta), usa o texto original
                    tdDescricaoChapa.textContent = chapa.descricao;
                }
            } else {
                // Se não houver termo de busca, usa o texto simples
                tdDescricaoChapa.textContent = chapa.descricao;
            }
        
            // Adiciona as duas células a linha
            linha.appendChild(tdCodigoChapa);
            linha.appendChild(tdDescricaoChapa);
            // Adiciona a linha ao corpo da tabela
            tbody.appendChild(linha);
        });
    }

    // Renderiza a tabela inicial com todas as chapas (sem termo de busca)
    renderizarLinhas(chapas);

    // Adiciona o evento de clique ao botão de busca
    botaoBuscar.addEventListener('click', () => {
        if(busca.value != '') {
            const termoBusca = busca.value.toUpperCase();
            const chapasFiltradas = chapas.filter(chapa =>
            chapa.descricao.toUpperCase().includes(termoBusca)
        );
        renderizarLinhas(chapasFiltradas, busca.value);
        } else {
            alert('Digite um valor para busca!');
        }
    });

    botaoLimpaBusca.addEventListener('click', () => {
        renderizarLinhas(chapas);
        busca.value = '';
    });

    // Adiciona a tabela completa à div 'principal'
    conteiner1.appendChild(tabela);

    botaoChapas.disabled = true;
    botaoResetListas.disabled = false;
}