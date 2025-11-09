let dataAtual = document.getElementById('espaco_data_sistema');
var chapa = document.getElementById('chapa');
var peca = document.getElementById('peca');
var qtde = document.getElementById('qtde');
var num1 = document.getElementById('num1');
var num2 = document.getElementById('num2');
var num3 = document.getElementById('num3');
var divSug = document.getElementById('sugestao');
var botaoCalcular = document.getElementById('bt1');
var botaoLimpar = document.getElementById('bt2');
var botaoFinal = document.getElementById('btFinal');
var botaoExportarPDF = document.getElementById('btExportar');
var botaoReiniciar = document.getElementById('btReiniciar');
const nomeArquivoDiv = document.getElementById('arquivo');
var listaResultados = document.getElementById('lista-resultados');
var somaTinta = document.getElementById('soma-tinta');
var somaPeso = document.getElementById('soma-peso');
var somaMetroQuad = document.getElementById('soma-metroQuad');
var material = document.getElementsByName('radmat');
var densidade = 0;
var totalMetroQuad = 0;
var totalPeso = 0;
var totalTinta = 0;
let itemInput = null;

const estruturaPrincipal = document.getElementById('estrutura_principal');

const botaoChapas = document.getElementById('lista_chapa_caesa');
const botaoTintas = document.getElementById('lista_tinta_caesa');
const botaoResetListas = document.getElementById('reset_listas');

botaoLimpar.disabled = true;
botaoFinal.disabled = true;
botaoExportarPDF.disabled = true;
botaoReiniciar.disabled = true;
botaoResetListas.disabled = true;

const sectionCaesa = document.getElementById('secao');
const inputsC = sectionCaesa.querySelectorAll('input');

inputsC.forEach((input, index) => {
    input.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            evento.preventDefault();
            if (index < inputsC.length - 1) {
                inputsC[index + 1].focus();
            }
        }
    });
});

let hoje = new Date();
dataAtual.innerHTML = `${hoje.toUTCString()}`;

function verificarDados() { // É chamada ao clicar no botão Calcular

    if (peca.value.trim() === "" || num1.value <= 0 || num2.value <= 0 || num3.value <= 0 || qtde.value <= 0) {
        alert("Digite valores válidos e positivos!");
    } else if (num3.value.length < 4 || num3.value.length > 4) {
        alert("Este campo deve ter 2 casas decimais!")
    }
    else {
        verificarMaterial();
    }
}

function verificarMaterial() {

    if (material[0].checked) {
        densidade = 8;
        calcular();
    } else if (material[1].checked) {
        densidade = 2.7;
        calcular();
    } else if (material[2].checked) {
        densidade = 8.1;
        calcular();
    } else if (material[3].checked) {
        densidade = 8.2;
        calcular();
    } else if (material[4].checked) {
        densidade = 8.2;
        calcular();
    } else {
        alert("Escolha o material!")
    }
}

function calcular() { // É chamada pela função verificarDados()

    var textoPeca = peca.value;
    var quantidade = Number(qtde.value);
    var val1 = Number(num1.value);
    var val2 = Number(num2.value);
    var val3 = Number(num3.value);

    var mat = String(document.querySelector('input[name="radmat"]:checked').id);
    var metroQuad = (val1 / 1000) * (val2 / 1000);
    var peso = metroQuad * val3 * densidade;
    var tinta = (metroQuad * 2) / 3.6;

    // Lista que armazena os resultados anteriores
    var itemResultado = document.createElement('li');
    itemResultado.innerHTML = `<strong>PEÇA:</strong> ${textoPeca} - <strong>Material:</strong> ${mat} - <strong>Dimensões:</strong> ${val1}mm x ${val2}mm - <strong>Espessura:</strong> ${val3.toFixed(2)}mm - <strong>Qtde:</strong> ${quantidade}x <br> * Valores por unidade ----> <strong>Metro²:</strong> ${metroQuad.toFixed(3)} m² | <strong>Peso:</strong> ${peso.toFixed(3)} Kg | <strong>Tinta:</strong> ${tinta.toFixed(3)} Kg`;
    listaResultados.appendChild(itemResultado);

    // Atualizar as somas totais
    totalMetroQuad += (metroQuad * quantidade);
    totalPeso += (peso * quantidade);
    totalTinta += (tinta * quantidade);

    somaMetroQuad.innerHTML = `Metro² Total: ${totalMetroQuad.toFixed(3)} M²`;
    somaPeso.innerHTML = `Peso Total: ${totalPeso.toFixed(3)} Kg`;
    somaTinta.innerHTML = `Tinta Total: ${totalTinta.toFixed(3)} Kg`;

    desabilitarCampos();
    sugerirChapas(); // Nova função que substitui lista Chapas()
    /* listaChapas(); */

}

function desabilitarCampos() { // É chamada pela função calcular()

    peca.disabled = true;
    qtde.disabled = true;
    num1.disabled = true;
    num2.disabled = true;
    num3.disabled = true;
    botaoCalcular.disabled = true;
    botaoLimpar.disabled = false;
    botaoFinal.disabled = false;
    botaoReiniciar.disabled = false;

    for (let i = 0; i < material.length; i++) {
        material[i].disabled = true;
    }
}

const chapas = [ // Coleção de objetos
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

// Criando uma section dinâmica para lista de chapas
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
            <th>Código</th>
            <th>Descrição</th>
        </th>
    `;

    // Preenche as linhas da tabela com os dados do array 'chapas'
    chapas.forEach(chapa => {
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
        const tdDescricaoChapa = document.createElement('td'); // Cria td para célula
        tdDescricaoChapa.textContent = chapa.descricao;
        // Adiciona as duas céluas a linha
        linha.appendChild(tdCodigoChapa);
        linha.appendChild(tdDescricaoChapa);
        // Adiciona a linha ao corpo da tabela
        tbody.appendChild(linha);
    });

    // Adiciona o cabeçalho e o corpo a tabela
    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    // Adiciona a tabela completa à div 'principal'
    conteiner1.appendChild(tabela);

    botaoChapas.disabled = true;
    botaoResetListas.disabled = false;

}

const tintas = [ // Coleção de objetos
    // Tintas
    { codigo: '8110100004', descricao: 'TINTA LARANJA PO HIB MT BR WEG 10005551'}, // Índice 0
    { codigo: '8110100005', descricao: 'TINTA PRETO PO HIB MT 71690 FO WEG 10001306'}, // Índice 1
    { codigo: '8110100006', descricao: 'TINTA BRANCO PO HIB R LI N9,5 SF WEG 10005209'}, // Índice 2
    { codigo: '8110100007', descricao: 'TINTA PRETO PO HIB R MT72380 FO WEG 10005340'}, // Índice 3
    { codigo: '8110100008', descricao: 'TINTA BEGE TEXTURIZADO RAL 7032 (PTD001) FLEXTINTAS'}, // Índice 4
    { codigo: '8110100011', descricao: 'TINTA CINZA GRAFITE PO HIB TX BR WEG 10005402'}, // Índice 5
    { codigo: '8110100012', descricao: 'TINTA LARANJA PO HIB TX 2,5YR 6/14 BR WEG 10005419'}, // Índice 6
    { codigo: '8110100013', descricao: 'TINTA VERDE PO HIB TX BR WEG 10005439'}, // Índice 7
    { codigo: '8110100015', descricao: 'TINTA PRETO PO TEXT BR POL FLEXTINTAS RAL 9005 (PTN002) FLEXTINTAS'}, // Índice 8
    { codigo: '8110100016', descricao: 'TINTA PRETO PO HIB TEXT ISOCOAT HPL13901'}, // Índice 9
    { codigo: '8110100022', descricao: 'TINTA PRETO PO HÍBRIDO TEXT  - CÓD. HTP90.055 - KENJI'}, // Índice 10
    { codigo: '8110100023', descricao: 'TINTA PO 20R TEXT PRETO RAL 9011 S/BRILHO'}, // Índice 11
    { codigo: '8110100024', descricao: 'TINTA PRETO FOSCO TEXTURIZADO PO HIB HTN003 - FLEXTINTAS'}, // Índice 12
    { codigo: '8110100025', descricao: 'TINTA LARANJA TEXTURIZADO  2,5YR 6/14 BR (PTF004) FLEXTINTAS'}, // Índice 13
    { codigo: '8110100030', descricao: 'TINTA CINZA TEXTURIZADO RAL7016 (PTL179) FLEXTINTAS'}, // Índice 14
    { codigo: '8110100031', descricao: 'TINTA BRANCO PO POL 26 TX N9,5 BRILHANTE  WEG 13841388'}, // Índice 15
    { codigo: '8110100032', descricao: 'TP 26 R TX CINZA RAL 7032 - WEG  10005963'}, // Índice 16
    { codigo: '8110100033', descricao: 'TINTA PO POLITHERM 26 DIRETIVA ROHS RAL 7032 W CINZA W 10040 POLIESTER TEXT (COD.17981541)'}, // Índice 17
    { codigo: '8110110003', descricao: 'TINTA AMARELO PO POL LI BR WEG 10314659'}, // Índice 18
    { codigo: '8110110004', descricao: 'TINTA CINZA PO POL LI N7,25 SF WEG 11708065'}, // Índice 19
    { codigo: '8110110005', descricao: 'TINTA CINZA PO POL LI RAL 7024 FO WEG 10005895'}, // Índice 20
    { codigo: '8110110006', descricao: 'TINTA PRETO PO POL LI FO WEG 10005903'}, // Índice 21
    { codigo: '8110110007', descricao: 'TINTA BRANCO PO POL R LI RAL 9016 BR WEG 10697683'}, // Índice 22
    { codigo: '8110110008', descricao: 'TINTA CINZA PO POL R LI N6,5 BR WEG 10005718'}, // Índice 23
    { codigo: '8110110009', descricao: 'TINTA CINZA PO POL R TX N8 BR WEG 10005959'}, // Índice 24
    { codigo: '8110110010', descricao: 'TINTA CINZA PO POL R TX RAL 7035 BR WEG 10005965'}, // Índice 25
    { codigo: '8110110012', descricao: 'TINTA CINZA PO POL TX N3,5 BR WEG 10606858'}, // Índice 26
    { codigo: '8110110013', descricao: 'TINTA CINZA PO POL TX  N6.5 BR WEG 10005961'}, // Índice 27
    { codigo: '8110110014', descricao: 'TINTA CINZA PO POL TX N7,25 SF WEG 10057836'}, // Índice 28
    { codigo: '8110110015', descricao: 'TINTA CINZA PO POL TX SB WEG 10846508'}, // Índice 29
    { codigo: '8110110017', descricao: 'TINTA PRETO PO POL TX BR WEG 10005994'}, // Índice 30
    { codigo: '8110110019', descricao: 'TINTA VERDE FOLHA TEXT (PGT20130) W3'}, // Índice 31
    { codigo: '8110110021', descricao: 'TINTA CINZA PO POL TX  N6.5 (PTL022) FLEXTINTAS'}, // Índice 32
    { codigo: '8110110022', descricao: 'TINTA 26 LISO LARANJA RAL 2000'}, // Índice 33
    { codigo: '8110110023', descricao: 'TINTA POLI 20 TX AMARELO 29090 SB( WEG 8221)'}, // Índice 34
    { codigo: '8110110025', descricao: 'TINTA AMARELA PO POL LI BR RAL 1007 BR  WEG 12151300'}, // Índice 35
    { codigo: '8110110026', descricao: 'TINTA PRETO LISO SEMI BRILHO POL WEG 10005833 (COMEXI)'}, // Índice 36
    { codigo: '8110110027', descricao: 'TINTA TEXT BRANCO RAL 9003 BR POLIESTER (WEG 10057832'}, // Índice 37
    { codigo: '8110110028', descricao: 'TINTA AZUL POLIESTER TX SEMIBRILHO RAL 5019'}, // Índice 38
    { codigo: '8110110032', descricao: 'TINTA VERMELHA 26 LI 5R 4/14 POL BRILH WEG 11332392'}, // Índice 39
    { codigo: '8110110033', descricao: 'TINTA 26 R TX BRANCO RAL 9001 POL BRILHANTE - 11536149'}, // Índice 40
    { codigo: '8110110034', descricao: 'TINTA AMARELA PO POL LI 26 5Y8/12 BR WEG 10057816'}, // Índice 41
    { codigo: '8110110035', descricao: 'TINTA CINZA TX MUNSEL N8 (PTL025) FLEXTINTAS'}, // Índice 42
    { codigo: '8110110036', descricao: 'TINTA CINZA MUNSEL N3,5 ULTRA FOSCO MICROTEXTURIZADO'}, // Índice 43
    { codigo: '8110110037', descricao: 'TINTA VERMELHA RAL 3000 12217943'}, // Índice 44
    { codigo: '8110110038', descricao: 'TINTA 26 R M TX GRAFITE 19470 FOSCO 10005936'}, // Índice 45
    { codigo: '8110110039', descricao: 'TINTA BRANCO PO POLI  RAL 9016 TX  WEG - 10005440'}, // Índice 46
    { codigo: '8110110040', descricao: 'TINTA PO TEXTURIZADA CINZA RAL - ISOTRON'}, // Índice 47
    { codigo: '8110110041', descricao: 'TINTA PO 24 W-ZN LI CINZ 18260 SF - WEG 10005667'}, // Índice 48
    { codigo: '8110110043', descricao: 'TINTA 25 R LI CINZ N6,5 BR WEG 10005677 (FUNDO)'}, // Índice 49
    { codigo: '8110110046', descricao: 'TINTA CINZA PO POL TX N7,25 (PTL005) FLEXTINTAS'}, // Índice 50
    { codigo: '8110110047', descricao: 'TINTA LARANJA PO POL TX RAL 2003 (PTF002) FLEXTINTAS'}, // Índice 51
    { codigo: '8110110048', descricao: 'TINTA CINZA PO POL R LI RAL 7035BR WEG 10005722'}, // Índice 52
    { codigo: '8110110050', descricao: 'TINTA PO 26R TEXTURIZADO BRANCO RAL 9002 POLIESTER 10005992'}, // Índice 53
    { codigo: '8110110051', descricao: 'TINTA PO LISO BRANCO POLIESTER WEG 13071240'}, // Índice 54
    { codigo: '8110110052', descricao: 'TINTA PO 26 R LISO CINZA RAL 7036 POL BRILHANTE WEG 11564823'}, // Índice 55
    { codigo: '8110110053', descricao: 'TINTA CINZA N6.5 TEXT CODIGO 30011 BRASILTINTAS'}, // Índice 56
    { codigo: '8110110054', descricao: 'TINTA AMARELO TEXTURIZADO POLIÉSTER RAL1004 (PTE012) FLEXTINTAS'}, // Índice 57
    { codigo: '8110110056', descricao: 'TINTA PGS24103 – ISOCOAT PE - BEGE TEXTURIZADO RAL 7032'}, // Índice 58
    { codigo: '8110110057', descricao: 'TINTA AZUL RAL 5010 HIBRIDO TEXT 04.0145.01 - ISOLUCKS'}, // Índice 59
    { codigo: '8110110058', descricao: '10005988 - TINTA PO 26 TEXT. VERDE RAL 6011 BRILHANTE'}, // Índice 60
    { codigo: '8110110060', descricao: 'TINTA PO 26 R TX CINZ RAL 7038 WEG 10057828'}, // Índice 61
    { codigo: '8110110061', descricao: 'TINTA AZUL ROYAL POLIESTER TEXTURIZADO (PT5313) FLEXTINTAS'}, // Índice 62
    { codigo: '8110110062', descricao: 'TINTA CINZA PO POL R TX RAL 7035 (PTL003) FLEXTINTAS'}, // Índice 63
    { codigo: '8110110063', descricao: 'TINTA BRANCO TEXTURIZADO RAL 9003 (PTA015) FLEXTINTAS'}, // Índice 64
    { codigo: '8110110064', descricao: 'TINTA PRETO FOSCO POLIESTER  MICROTEXTURIZADO (PTN001) FLEXTINTAS'}, // Índice 65
    { codigo: '8110110067', descricao: 'TINTA PO 20 R TX CINZA N6,5 BR COD 10005373'}, // Índice 66
    { codigo: '8110110068', descricao: 'TINTA VERMELHO TEXTURIZADO RAL 3001 (PTG012) FLEXTINTAS'} // Índice 67
];

// Function para copiar código da tinta e da chapa
function copiarCodigoTintaChapa(texto) {

    navigator.clipboard.writeText(texto).then(() => {

        alert(`Código "${texto}" copiado para área de transferência"`);
    })
    .catch(err => {

        console.error('Falha ao copiar o código: ', err);
        alert('Não foi possível copiar o código.');
    });
}

// Criando uma section dinâmica para lista de tintas
function criarNovaSectionTinta() {

    const novaSection = document.createElement('section'); // Cria a nova section
    novaSection.setAttribute('id', 'secao_tintas');

    const conteiner = document.createElement('div'); // Inserir este elemento dentro da section com id=secao_tintas
    conteiner.setAttribute('id', 'header');

    const titulo = document.createElement('h2'); // Inserir este elemento dentro da div com id=header
    titulo.textContent = 'Tintas cadastradas';

    const conteiner1 = document.createElement('div'); // Inserir este elemento dentro da section com id=secao_tintas
    conteiner1.setAttribute('id', 'principal_secao_tintas');

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
            <th>Código</th>
            <th>Descrição</th>
        </tr>
    `;

    // Preenche as linhas da tabela com os dados do array 'tintas'
    tintas.forEach(tinta => {
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

    // Adiciona o cabeçalho e o corpo a tabela
    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    // Adiciona a tabela completa à div 'principal'
    conteiner1.appendChild(tabela);

    botaoTintas.disabled = true;
    botaoResetListas.disabled = false;

}

function sugerirChapas() {
    const materialSelecionado = document.querySelector('input[name="radmat"]:checked').id;
    const espessuraDigitada = Number(num3.value);

    const chapasSugeridas = chapas.filter(chapa =>
        chapa.material === materialSelecionado && chapa.espessura === espessuraDigitada
    );

    divSug.innerHTML = '';

    if (chapasSugeridas.length > 0) {
        chapasSugeridas.forEach(chapa => {
            // Cria um elemento div para cada resultado
            const resultadoDiv = document.createElement('div');
            resultadoDiv.className = 'divDinamica';

            /* Espaço reservado a criação dinâmica de resposta das chapas */

            // Cria o botão de copiar
            const botaoCopiar = document.createElement('button');
            botaoCopiar.textContent = 'Copiar';
            botaoCopiar.className = 'btn-copiar'; // Adiciona uma classe para estilização, se quiser
            botaoCopiar.setAttribute('data-codigo', chapa.codigo); // Armazena o código no botão

            // Adiciona um evento de clique ao botão
            botaoCopiar.addEventListener('click', () => {
                // Usa a API Clipboard para copiar o texto
                navigator.clipboard.writeText(chapa.codigo).then(() => {
                    console.log(`Código ${chapa.codigo} copiado com sucesso!`);
                    alert(`Código ${chapa.codigo} copiado para a área de transferência!`);
                }).catch(err => {
                    console.error('Erro ao copiar o texto: ', err);
                    alert('Não foi possível copiar o texto. Tente novamente.');
                });
            });

            // Adiciona o botão à div do resultado
            resultadoDiv.appendChild(botaoCopiar);

            // Adiciona o texto da chapa
            const textoChapa = document.createTextNode(`${chapa.codigo} - ${chapa.descricao}`);
            resultadoDiv.appendChild(textoChapa);

            // Adiciona a div completa à divSug
            divSug.appendChild(resultadoDiv);
        });
    } else {
        divSug.innerHTML = 'Nenhuma chapa encontrada com a espessura e material selecionados.';
    }
}

function limpar() { // É chamada ao clicar no botão Limpar Dados

    peca.disabled = false;
    qtde.disabled = false;
    num1.disabled = false;
    num2.disabled = false;
    num3.disabled = false;
    botaoCalcular.disabled = false;
    peca.value = "";
    qtde.value = "";
    num1.value = "";
    num2.value = "";
    num3.value = "";

    for (let i = 0; i < material.length; i++) {
        material[i].checked = false;
    }

    for (let i = 0; i < material.length; i++) {
        material[i].disabled = false;
    }

    botaoLimpar.disabled = true;
    botaoFinal.disabled = true;
    botaoExportarPDF.disabled = true;

    divSug.innerHTML = '';

    peca.focus();

}

function criarInput() {

    // Cria o item caixa de texto para nomear o arquivo            
    itemInput = document.createElement('input');
    itemInput.setAttribute('type', 'text');
    itemInput.setAttribute('id', 'nomeArquivo');
    itemInput.setAttribute('placeholder', 'Digite o nome do arquivo');
    itemInput.setAttribute('oninput', 'this.value = this.value.toUpperCase()');
    nomeArquivoDiv.appendChild(itemInput);
    itemInput.focus();

    peca.value = "";
    qtde.value = "";
    num1.value = "";
    num2.value = "";
    num3.value = "";
    peca.disabled = true;
    qtde.disabled = true;
    num1.disabled = true;
    num2.disabled = true;
    num3.disabled = true;
    botaoCalcular.disabled = true;
    botaoLimpar.disabled = true;
    botaoFinal.disabled = true;
    botaoExportarPDF.disabled = false;
    botaoReiniciar.disabled = false;

    for (let i = 0; i < material.length; i++) {
        material[i].disabled = true;
    }

    for (let i = 0; i < material.length; i++) {
        material[i].checked = false;
    }

    divSug.innerHTML = '';

}

function exportarPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF('l', 'mm', 'a4');

    // String base da logo - utilizando um conversor base64 online
    const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAMAAABhTZc9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAGVUExURS9JUzFJUzJJUzRKUjVKUjhLUThLUjlERTlLUTpERTpLUTpMUTtMUTxMUT1MUT5MUD5NUT9NUD9NUUBNUEFNUEFOUEJMTUJNT0JOUENMTUNOUEROT0ROUERPUEVPUEZQT0tQT0xRTkxRT1FTTVJSTVNTTVVTTVZTTVZUTFxVTF9WS2FWS2RXSWRYSWVXSWVXSmVYSWdYSWdYSmlZSWlZSm5aSW51dm52dnVcSHZcR31eRn5fRoNgRYtiRIxiQ4xjRI9jQpFkQ5dlQptnQqBoQKJqQKNpQKVrP6ZpP6ZqP6dqP6prPqtrPqxrPq1sPq5sPa5sPq9sPa9sPq9tPrBtPbFtPbJuPrVuPbZuPbZvPLhvPLpvPLpwPLxwO7xxPL1wO75xO79xO8BxO8ByO8FyO8NyO8p0Ocx0Oc11OM92ONB3N9N3ONR3N9Z3ONl4N+h8NOl8NOp9NOt+NOx+M+5+M/SAMvWAMveBMvmBMvmCMvqCMfr6+vr7+vv6+vv7+v2CMf6DMf+DMP+DMf+EMP+FL/+GLv+GL0oSohoAAAFiSURBVCjPY6gzE5OWwwakxcxqGMw4sUsCpdnNGCRxSQKlJRlwSwKlGeTwAaCsIAcbBwcrtxSIK8MHYrOJwmUFLf3DPd3C3BWA0jJCDuFurn5R2qJwWQu3xMa2tFAlsKxddktLXqq+MJLJjCWNglxSsiCTOTSqmk1YRGXgsnIyTIWVshKyYL6IWnmTsYAMwlVyckz5pVJSEL6oalmTgZAcimxBqQySrA66bBmSbIPuYJGFuFlKVAYmKyMqLIHqXylFTVkRoI/0hORkJNS1VCRgYVUhIyEjw+WSKS8IDCtDIRkp3px6Zx6QrDAPQ0kjPys3N2NanDibWlWjETM3B19xpT1IVtjUMbK5LSk+ISW9zYfDJqOlJSs2ITm3tciKDygrYB0R4+0REBQUHBhhyuUU7eXpGxQUEBJuqwy2V4CDDZggQEmCTVCGl40VyuaFuRl3usKfJvGnZ/x5odYcZz4yrwYA9eCCzk6LdKQAAAAASUVORK5CYII=';

    // Defina as margens do documento (em mm)
    const margemSuperior = 20;
    const margemEsquerda = 5;
    const margemDireita = 5;
    const margemInferior = 20;
    const larguraPagina = doc.internal.pageSize.getWidth();
    const alturaPagina = doc.internal.pageSize.getHeight();

    // Adiciona as linhas das margens
    doc.setLineWidth(0.2); // Define a espessura da linha
    doc.setDrawColor(128, 128, 128); // Define a cor da linha
    doc.line(5, 20, larguraPagina - 5, 20); // Desenha a linha superior - canto esq - canto sup - canto direito - canto sup
    doc.line(5, alturaPagina - 20, larguraPagina - 5, alturaPagina - 20); // Desenha a linha inferior - canto esq - canto inf - canto dir - canto inf
    doc.line(5, 20, 5, alturaPagina - 20); // Desenha a linha esquerda - canto esq - canto inf - canto dir - canto sup
    doc.line(larguraPagina - 5, 20, larguraPagina - 5, alturaPagina - 20); // Desenha a linha direita

    // Largura e altura da logo em mm
    const logoLargura = 10;
    const logoAltura = 10;

    // Inserindo a logo
    // doc.addImage(imagem, formato, x, y, largura, altura)
    doc.addImage(logoBase64, 'JPG', margemEsquerda, margemSuperior - 15, logoLargura, logoAltura);

    const pegaNomeArquivo = document.getElementById('nomeArquivo').value;

    // Cria o nome fixo do relatório a ser gerado
    let cabFixo = ('RELATÓRIO DE PEÇAS E CONJUNTOS CAESA');
    doc.setFontSize(18); // Tamanho da fonte para o título
    doc.setFont('Poppins', 'bold'); // Fonte em negrito
    const larguraTextoCabFixo = doc.getTextWidth(cabFixo);
    const posicaoXCabFixo = (larguraPagina - larguraTextoCabFixo) / 2; // Centraliza o texto
    doc.text(cabFixo, posicaoXCabFixo, margemSuperior - 10);

    // Título do Relatório (Centralizado)
    let cab = (pegaNomeArquivo);
    doc.setFontSize(15); // Tamanho da fonte para o título
    doc.setFont('Poppins', 'bold'); // Fonte em negrito
    const larguraTextoCab = doc.getTextWidth(cab);
    const posicaoXCab = (larguraPagina - larguraTextoCab) / 2; // Centraliza o texto
    doc.text(cab, posicaoXCab, margemSuperior - 2);

    // Informações resumidas
    doc.setFontSize(14); // Tamanho da fonte para o resumo
    doc.setFont('helvetica', 'normal'); // Volta para a fonte normal
    let textoResumo = `Metro² Total: ${totalMetroQuad.toFixed(3)} m²\nPeso Total: ${totalPeso.toFixed(3)} Kg\nTinta Total: ${totalTinta.toFixed(3)} Kg`;
    doc.text(textoResumo, margemEsquerda + 10, margemSuperior + 10); // Posição abaixo do título

    // Lista de Resultados
    doc.setFontSize(12); // Tamanho da fonte para a lista
    doc.setFont('helvetica', 'normal');
    let listaResultadosTexto = "";
    for (let i = 0; i < listaResultados.children.length; i++) {
        listaResultadosTexto += listaResultados.children[i].innerText + "\n\n";
    }
    doc.text(listaResultadosTexto, margemEsquerda + 10, margemSuperior + 40); // Posição abaixo do resumo

    // Rodapé (Número da página)
    const totalPaginas = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPaginas; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        const numeroPagina = `Página ${i} de ${totalPaginas}`;
        const larguraNumeroPagina = doc.getTextWidth(numeroPagina);
        const posicaoXNumeroPagina = (larguraPagina - larguraNumeroPagina) / 2;
        doc.text(numeroPagina, posicaoXNumeroPagina, alturaPagina - margemInferior + 10);
    }

    doc.save(pegaNomeArquivo); // Nome do arquivo
    botaoExportarPDF.disabled = true;
    itemInput.disabled = true;
    itemInput.value = "";
}

function reiniciar() {

    listaResultados.innerHTML = "";

    peca.disabled = false;
    qtde.disabled = false;
    num1.disabled = false;
    num2.disabled = false;
    num3.disabled = false;
    botaoCalcular.disabled = false;
    peca.value = "";
    qtde.value = "";
    num1.value = "";
    num2.value = "";
    num3.value = "";

    for (let i = 0; i < material.length; i++) {
        material[i].checked = false;
    }

    for (let i = 0; i < material.length; i++) {
        material[i].disabled = false;
    }

    totalMetroQuad = 0;
    totalPeso = 0;
    totalTinta = 0;
    somaMetroQuad.innerHTML = "";
    somaPeso.innerHTML = "";
    somaTinta.innerHTML = "";

    botaoLimpar.disabled = true;
    botaoFinal.disabled = true;
    botaoExportarPDF.disabled = true;
    botaoReiniciar.disabled = true;

    divSug.innerHTML = '';

    peca.focus();
    removerinput();
}

function removerinput() {

    if (itemInput && itemInput.parentNode === nomeArquivoDiv) {
        nomeArquivoDiv.removeChild(itemInput);
        itemInput = null;
    }
}

function resetListas() {
    // Encontra as sections (podem não existir) e remove com segurança
    const removerSectionChapa = document.getElementById('secao_chapas');
    const removerSectionTinta = document.getElementById('secao_tintas');

    if (removerSectionChapa && removerSectionChapa.parentNode) {
        removerSectionChapa.parentNode.removeChild(removerSectionChapa);
    } else {
        // opcional: log para depuração quando não existir
        // console.warn('secao_chapas não encontrada ao tentar resetar listas');
    }

    if (removerSectionTinta && removerSectionTinta.parentNode) {
        removerSectionTinta.parentNode.removeChild(removerSectionTinta);
    } else {
        // opcional: log para depuração quando não existir
        // console.warn('secao_tintas não encontrada ao tentar resetar listas');
    }

    // Reativa os botões que criam as listas e desativa o botão de reset
    botaoChapas.disabled = false;
    botaoTintas.disabled = false;
    botaoResetListas.disabled = true;
}