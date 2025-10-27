const campoPrincipal = document.getElementById('principal');
const botaoChapas = document.getElementById('btnChapas');
botaoChapas.addEventListener('click', mostrarChapas);

let chapas = [ // Coleção de objetos
    // Aço Carbono
    { material: 'Aco', espessura: 0.60, codigo: '8010130011', descricao: 'CHAPA FF 0,60X1200X3000MM'}, // Índice 0
    { material: 'Aco', espessura: 1.20, codigo: '8010130002', descricao: 'CHAPA FF 1,20X1500X3000MM' }, // Índice 1
    { material: 'Aco', espessura: 1.50, codigo: '8010130006', descricao: 'CHAPA FF 1,50X1500X3000MM' }, // Índice 2
    { material: 'Aco', espessura: 1.90, codigo: '8010130007', descricao: 'CHAPA FF 1,90X1500X2220MM' }, // Índice 3
    { material: 'Aco', espessura: 2.65, codigo: '8010110001', descricao: 'CHAPA DCO 2,65X1500X2220MM' }, // Índice 4 
    { material: 'Aco', espessura: 3.00, codigo: '8010110003', descricao: 'CHAPA DCO 3,00X1500X3000MM' }, // Índice 5
    { material: 'Aco', espessura: 6.35, codigo: '8010100005', descricao: 'CHAPA GROSSA 6,30X1200X3000MM'}, // Índice 6
    { material: 'Aco', espessura: 7.94, codigo: '8010100001', descricao: 'CHAPA GROSSA 7,94X1200X3000MM'}, // Índice 7
    { material: 'Aco', espessura: 9.53, codigo: '8010100002', descricao: 'CHAPA GROSSA 9,53X1500X3000MM'}, // Índice 8
    { material: 'Aco', espessura: 12.70, codigo: '8010100003', descricao: 'CHAPA GROSSA 12,70X1500X3000MM'}, // Índice 9

    // Alumínio
    { material: 'Aluminio', espessura: 0.50, codigo: '8012100023', descricao: 'CHAPA ALUMINIO 0,50X1250X3000MM H14' }, // Índice 10
    { material: 'Aluminio', espessura: 2.00, codigo: '8012100003', descricao: 'CHAPA ALUMINIO 2,00X1250X3000MM H14' }, // Índice 11
    { material: 'Aluminio', espessura: 2.50, codigo: '8012100004', descricao: 'CHAPA ALUMINIO 2,50X1250X3000MM H14' }, // Índice 12
    { material: 'Aluminio', espessura: 3.00, codigo: '8012100025', descricao: 'CHAPA ALUMINIO 3,00X1500X3000MM H14' }, // Índice 13
    { material: 'Aluminio', espessura: 4.00, codigo: '8012100006', descricao: 'CHAPA ALUMINIO 4,00X1250X3000MM H14' }, // Índice 14

    // Galvanizado
    { material: 'Galvanizado', espessura: 0.65, codigo: '8010150021', descricao: 'CHAPA GALV CRISTAIS NORMAIS 0,65X1500X3000MM' }, // Índice 15
    { material: 'Galvanizado', espessura: 0.95, codigo: '8010150017', descricao: 'CHAPA GALV CRISTAIS NORMAIS 0,95X1250X2000MM' }, // Índice 16
    { material: 'Galvanizado', espessura: 1.25, codigo: '8010150002', descricao: 'CHAPA GALV CRISTAIS NORMAIS 1,25X1200X3000MM' }, // Índice 17
    { material: 'Galvanizado', espessura: 1.55, codigo: '8010150025', descricao: 'CHAPA GALV CRISTAIS NORMAIS 1,55X1500X3000MM' }, // Índice 18
    { material: 'Galvanizado', espessura: 1.95, codigo: '8010150013', descricao: 'CHAPA GALV CRISTAIS NORMAIS 1,95X1500X3000MM' }, // Índice 19
    { material: 'Galvanizado', espessura: 2.70, codigo: '8010150011', descricao: 'CHAPA GALV CRISTAIS NORMAIS 2,70X1500X3000MM' }, // Índice 20

    // Inox 304
    { material: 'Inox304', espessura: 1.00, codigo: '8011110016', descricao: 'CHAPA INOX 304 1,00X1250X2000MM' }, // Índice 21
    { material: 'Inox304', espessura: 1.20, codigo: '8011110014', descricao: 'CHAPA INOX 304 1,20X1200X3000MM' }, // Índice 22
    { material: 'Inox304', espessura: 1.50, codigo: '8011110017', descricao: 'CHAPA INOX 304 1,50X1250X3000MM' }, // Índice 23
    { material: 'Inox304', espessura: 2.00, codigo: '8011110018', descricao: 'CHAPA INOX 304 2,00X1250X3000MM' }, // Índice 24
    { material: 'Inox304', espessura: 2.50, codigo: '8011110006', descricao: 'CHAPA INOX 304 2,50X1200X3000MM' }, // Índice 25
    { material: 'Inox304', espessura: 3.00, codigo: '8011110023', descricao: 'CHAPA INOX 304 3,00X1500X3000MM' }, // Índice 26

    // Inox 430
    { material: 'Inox430', espessura: 1.00, codigo: '8011150016', descricao: 'CHAPA INOX 430 PVC 1,00X1000X2000MM' }, // Índice 27
    { material: 'Inox430', espessura: 1.20, codigo: '8011150001', descricao: 'CHAPA INOX 430 PVC 1,20X1250X3000MM' }, // Índice 28
    { material: 'Inox430', espessura: 1.50, codigo: '8011150013', descricao: 'CHAPA INOX 430 PVC 1,50X1200X3000MM' }, // Índice 29
    { material: 'Inox430', espessura: 2.00, codigo: '8011150019', descricao: 'CHAPA INOX 430 PVC 2,00X1250X3000MM' }, // Índice 30
    { material: 'Inox430', espessura: 2.50, codigo: '8011150009', descricao: 'CHAPA INOX 430 PVC 2,50X1200X3000MM' }, // Índice 31
    { material: 'Inox430', espessura: 3.00, codigo: '8011150000', descricao: 'CHAPA INOX 430 PVC 3,00X1200X3000MM' } // Índice 32
];

function mostrarChapas() {

    campoPrincipal.innerHTML = '';

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
    campoPrincipal.appendChild(tabela);

}

// let totalChapas = chapas.length;

// console.log("Total de chapas cadastradas: " + totalChapas);