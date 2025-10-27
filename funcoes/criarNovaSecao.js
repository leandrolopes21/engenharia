// Criando uma section dinâmica para lista de chapas
const estruturaPrincipal = document.getElementById('estrutura_principal');

function criarNovaSection() {

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
}