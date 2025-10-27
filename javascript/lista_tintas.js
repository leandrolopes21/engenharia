const campoPrincipal = document.getElementById('principal');
const botaoTintas = document.getElementById('btnTintas');
botaoTintas.addEventListener('click', mostrarTintas);

let tintas = [ // Coleção de objetos
    // Aço Carbono
    { codigo: '8110110003', descricao: 'TINTA AMARELO PO POL LI BR WEG 10314659'}, // Índice 0
    { codigo: '8110110004', descricao: 'TINTA CINZA PO POL LI N7,25 SF WEG 11708065'}, // Índice 1
    { codigo: '8110110005', descricao: 'TINTA CINZA PO POL LI RAL 7024 FO WEG 10005895'}, // Índice 2
    { codigo: '8110110006', descricao: 'TINTA PRETO PO POL LI FO WEG 10005903'}, // Índice 3
    { codigo: '8110110007', descricao: 'TINTA BRANCO PO POL R LI RAL 9016 BR WEG 10697683'}, // Índice 4
    { codigo: '8110110008', descricao: 'TINTA CINZA PO POL R LI N6,5 BR WEG 10005718'}, // Índice 5
    { codigo: '8110110009', descricao: 'TINTA CINZA PO POL R TX N8 BR WEG 10005959'}, // Índice 6
    { codigo: '8110110010', descricao: 'TINTA CINZA PO POL R TX RAL 7035 BR WEG 10005965'}, // Índice 7
    { codigo: '8110110012', descricao: 'TINTA CINZA PO POL TX N3,5 BR WEG 10606858'}, // Índice 8
    { codigo: '8110110013', descricao: 'TINTA CINZA PO POL TX  N6.5 BR WEG 10005961'}, // Índice 9
    { codigo: '8110110014', descricao: 'TINTA CINZA PO POL TX N7,25 SF WEG 10057836'}, // Índice 10
    { codigo: '8110110015', descricao: 'TINTA CINZA PO POL TX SB WEG 10846508'}, // Índice 11
    { codigo: '8110110017', descricao: 'TINTA PRETO PO POL TX BR WEG 10005994'}, // Índice 12
    { codigo: '8110110019', descricao: 'TINTA VERDE FOLHA TEXT (PGT20130) W3'}, // Índice 13
    { codigo: '8110110021', descricao: 'TINTA CINZA PO POL TX  N6.5 (PTL022) FLEXTINTAS'}, // Índice 14
    { codigo: '8110110022', descricao: 'TINTA 26 LISO LARANJA RAL 2000'}, // Índice 15
    { codigo: '8110110023', descricao: 'TINTA POLI 20 TX AMARELO 29090 SB( WEG 8221)'}, // Índice 16
    { codigo: '8110110025', descricao: 'TINTA AMARELA PO POL LI BR RAL 1007 BR  WEG 12151300'}, // Índice 17
    { codigo: '8110110026', descricao: 'TINTA PRETO LISO SEMI BRILHO POL WEG 10005833 (COMEXI)'}, // Índice 18
    { codigo: '8110110027', descricao: 'TINTA TEXT BRANCO RAL 9003 BR POLIESTER (WEG 10057832'}, // Índice 19
    { codigo: '8110110028', descricao: 'TINTA AZUL POLIESTER TX SEMIBRILHO RAL 5019'}, // Índice 20
    { codigo: '8110110032', descricao: 'TINTA VERMELHA 26 LI 5R 4/14 POL BRILH WEG 11332392'}, // Índice 21
    { codigo: '8110110033', descricao: 'TINTA 26 R TX BRANCO RAL 9001 POL BRILHANTE - 11536149'}, // Índice 22
    { codigo: '8110110034', descricao: 'TINTA AMARELA PO POL LI 26 5Y8/12 BR WEG 10057816'}, // Índice 23
    { codigo: '8110110035', descricao: 'TINTA CINZA TX MUNSEL N8 (PTL025) FLEXTINTAS'}, // Índice 24
    { codigo: '8110110036', descricao: 'TINTA CINZA MUNSEL N3,5 ULTRA FOSCO MICROTEXTURIZADO'}, // Índice 25
    { codigo: '8110110037', descricao: 'TINTA VERMELHA RAL 3000 12217943'}, // Índice 26
    { codigo: '8110110038', descricao: 'TINTA 26 R M TX GRAFITE 19470 FOSCO 10005936'}, // Índice 27
    { codigo: '8110110039', descricao: 'TINTA BRANCO PO POLI  RAL 9016 TX  WEG - 10005440'}, // Índice 28
    { codigo: '8110110040', descricao: 'TINTA PO TEXTURIZADA CINZA RAL - ISOTRON'}, // Índice 29
    { codigo: '8110110041', descricao: 'TINTA PO 24 W-ZN LI CINZ 18260 SF - WEG 10005667'}, // Índice 30
    { codigo: '8110110043', descricao: 'TINTA 25 R LI CINZ N6,5 BR WEG 10005677 (FUNDO)'}, // Índice 31
    { codigo: '8110110046', descricao: 'TINTA CINZA PO POL TX N7,25 (PTL005) FLEXTINTAS'}, // Índice 32
    { codigo: '8110110047', descricao: 'TINTA LARANJA PO POL TX RAL 2003 (PTF002) FLEXTINTAS'}, // Índice 33
    { codigo: '8110110048', descricao: 'TINTA CINZA PO POL R LI RAL 7035BR WEG 10005722'}, // Índice 34
    { codigo: '8110110050', descricao: 'TINTA PO 26R TEXTURIZADO BRANCO RAL 9002 POLIESTER 10005992'}, // Índice 35
    { codigo: '8110110051', descricao: 'TINTA PO LISO BRANCO POLIESTER WEG 13071240'}, // Índice 36
    { codigo: '8110110052', descricao: 'TINTA PO 26 R LISO CINZA RAL 7036 POL BRILHANTE WEG 11564823'}, // Índice 37
    { codigo: '8110110053', descricao: 'TINTA CINZA N6.5 TEXT CODIGO 30011 BRASILTINTAS'}, // Índice 38
    { codigo: '8110110054', descricao: 'TINTA AMARELO TEXTURIZADO POLIÉSTER RAL1004 (PTE012) FLEXTINTAS'}, // Índice 39
    { codigo: '8110110056', descricao: 'TINTA PGS24103 – ISOCOAT PE - BEGE TEXTURIZADO RAL 7032'}, // Índice 40
    { codigo: '8110110057', descricao: 'TINTA AZUL RAL 5010 HIBRIDO TEXT 04.0145.01 - ISOLUCKS'}, // Índice 41
    { codigo: '8110110058', descricao: '10005988 - TINTA PO 26 TEXT. VERDE RAL 6011 BRILHANTE'}, // Índice 42
    { codigo: '8110110060', descricao: 'TINTA PO 26 R TX CINZ RAL 7038 WEG 10057828'}, // Índice 43
    { codigo: '8110110061', descricao: 'TINTA AZUL ROYAL POLIESTER TEXTURIZADO (PT5313) FLEXTINTAS'}, // Índice 44
    { codigo: '8110110062', descricao: 'TINTA CINZA PO POL R TX RAL 7035 (PTL003) FLEXTINTAS'}, // Índice 45
    { codigo: '8110110063', descricao: 'TINTA BRANCO TEXTURIZADO RAL 9003 (PTA015) FLEXTINTAS'}, // Índice 46
    { codigo: '8110110064', descricao: 'TINTA PRETO FOSCO POLIESTER  MICROTEXTURIZADO (PTN001) FLEXTINTAS'}, // Índice 47
    { codigo: '8110110067', descricao: 'TINTA PO 20 R TX CINZA N6,5 BR COD 10005373'}, // Índice 48
    { codigo: '8110110068', descricao: 'TINTA VERMELHO TEXTURIZADO RAL 3001 (PTG012) FLEXTINTAS'}, // Índice 49
];

function mostrarTintas() {

    campoPrincipal.innerHTML = '';

    // Criando a tabela
    const tabela = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Cria o cabeçalho da tabela
    thead.innerHTML = `
        <tr>
            <th>Código</th>
            <th>Descrição</th>
        </th>
    `;

    // Preenche as linhas da tabela com os dados do array 'tintas'
    tintas.forEach(tinta => {
        const linha = document.createElement('tr');
        linha.innerHTML = `            
            <td>${tinta.codigo}</td>
            <td>${tinta.descricao}</td>
        `;
        tbody.appendChild(linha);
    });

    // Adiciona o cabeçalho e o corpo a tabela
    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    // Adiciona a tabela completa à div 'principal'
    campoPrincipal.appendChild(tabela);

}