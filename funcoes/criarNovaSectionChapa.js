function criarNovaSectionChapa() {

    const novaSection = document.createElement('section'); // Cria a nova section
    novaSection.setAttribute('id', 'secao_chapas');

    const conteiner = document.createElement('div'); // Inserir este elemento dentro da section com id=secao_chapas
    conteiner.setAttribute('id', 'header');

    const titulo = document.createElement('h2'); // Inserir este elemento dentro da div com id=header
    titulo.textContent = 'Chapas cadastradas';

    const conteiner1 = document.createElement('div'); // Inserir este elemento dentro da section com id=secao_chapas
    conteiner1.setAttribute('id', 'principal_secao_chapas');

    novaSection.appendChild(conteiner);
    novaSection.appendChild(conteiner1);
    conteiner.appendChild(titulo);
    estruturaPrincipal.appendChild(novaSection);

    // Criando a tabela
    const tabela = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Cria o cabeçalho da tabela
    thead.innerHTML = `
        <tr>
            <th>Material</th>
            <th>Espessura (mm)</th>
            <th>Código</th>
            <th>Descrição</th>
        </th>
    `;

    // Preenche as linhas da tabela com os dados do array 'chapas'
    chapas.forEach(chapa => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${chapa.material}</td>
            <td>${chapa.espessura.toFixed(2)}</td>
            <td>${chapa.codigo}</td>
            <td>${chapa.descricao}</td>
        `;
        tbody.appendChild(linha);
    });

    // Adiciona o cabeçalho e o corpo a tabela
    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    // Adiciona a tabela completa à div 'principal'
    conteiner1.appendChild(tabela);

    botaoChapas.disabled = true;

}