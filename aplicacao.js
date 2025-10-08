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

botaoLimpar.disabled = true;
botaoFinal.disabled = true;
botaoExportarPDF.disabled = true;
botaoReiniciar.disabled = true;

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

/* Função lista chapas desabilitada e substiuída por um array de objetos
function listaChapas() {
            
    if (material[0].checked) {
        divSug.innerHTML = '8010130002 - CHAPA FF 1,20X1500X3000MM <br> 8010130006 - CHAPA FF 1,50X1500X3000MM <br> 8010130007 - CHAPA FF 1,90X1500X2220MM <br> 8010110001 - CHAPA DCO 2,65X1500X2220MM <br> 8010110003 - CHAPA DCO 3,00X1500X3000MM';
    } else if (material[1].checked) {
        divSug.innerHTML = '8012100023 - CHAPA ALUMINIO 0,50X1250X3000MM H14 <br> 8012100003 - CHAPA ALUMINIO 2,00X1250X3000MM H14 <br> 8012100004 - CHAPA ALUMINIO 2,50X1250X3000MM H14 <br> 8012100025 - CHAPA ALUMINIO 3,00X1500X3000MM H14 <br> 8012100006 - CHAPA ALUMINIO 4,00X1250X3000MM H14';
    } else if (material[2].checked) {
        divSug.innerHTML = '8010150021 - CHAPA GALV CRISTAIS NORMAIS 0,65X1500X3000MM <br> 8010150017 - CHAPA GALV CRISTAIS NORMAIS 0,95X1250X2000MM <br> 8010150002 - CHAPA GALV CRISTAIS NORMAIS 1,25X1200X3000MM <br> 8010150025 - CHAPA GALV CRISTAIS NORMAIS 1,55X1500X3000MM <br> 8010150013 - CHAPA GALV CRISTAIS NORMAIS 1,95X1500X3000MM <br> 8010150011 - CHAPA GALV CRISTAIS NORMAIS 2,70X1500X3000MM';
    } else if (material[3].checked) {
        divSug.innerHTML = '8011110016 - CHAPA INOX 304 1,00X1250X2000MM <br> 8011110014 - CHAPA INOX 304 1,20X1200X3000MM <br> 8011110017 - CHAPA INOX 304 1,50X1250X3000MM <br> 8011110018 - CHAPA INOX 304 2,00X1250X3000MM <br> 8011110006 - CHAPA INOX 304 2,50X1200X3000MM <br> 8011110023 - CHAPA INOX 304 3,00X1500X3000MM';
    } else {
        'Sem dados para exibir!';
    }
}
*/

const chapas = [ // declarado como array de objetos (coleção de objetos)
    // Aço Carbono
    { material: 'Aco', espessura: 1.20, codigo: '8010130002', descricao: 'CHAPA FF 1,20X1500X3000MM' },
    { material: 'Aco', espessura: 1.50, codigo: '8010130006', descricao: 'CHAPA FF 1,50X1500X3000MM' },
    { material: 'Aco', espessura: 1.90, codigo: '8010130007', descricao: 'CHAPA FF 1,90X1500X2220MM' },
    { material: 'Aco', espessura: 2.65, codigo: '8010110001', descricao: 'CHAPA DCO 2,65X1500X2220MM' },
    { material: 'Aco', espessura: 3.00, codigo: '8010110003', descricao: 'CHAPA DCO 3,00X1500X3000MM' },
    { material: 'Aco', espessura: 6.35, codigo: '8010100005', descricao: 'CHAPA GROSSA 6,30X1200X3000MM'},

    // Alumínio
    { material: 'Aluminio', espessura: 0.50, codigo: '8012100023', descricao: 'CHAPA ALUMINIO 0,50X1250X3000MM H14' },
    { material: 'Aluminio', espessura: 2.00, codigo: '8012100003', descricao: 'CHAPA ALUMINIO 2,00X1250X3000MM H14' },
    { material: 'Aluminio', espessura: 2.50, codigo: '8012100004', descricao: 'CHAPA ALUMINIO 2,50X1250X3000MM H14' },
    { material: 'Aluminio', espessura: 3.00, codigo: '8012100025', descricao: 'CHAPA ALUMINIO 3,00X1500X3000MM H14' },
    { material: 'Aluminio', espessura: 4.00, codigo: '8012100006', descricao: 'CHAPA ALUMINIO 4,00X1250X3000MM H14' },

    // Galvanizado
    { material: 'Galvanizado', espessura: 0.65, codigo: '8010150021', descricao: 'CHAPA GALV CRISTAIS NORMAIS 0,65X1500X3000MM' },
    { material: 'Galvanizado', espessura: 0.95, codigo: '8010150017', descricao: 'CHAPA GALV CRISTAIS NORMAIS 0,95X1250X2000MM' },
    { material: 'Galvanizado', espessura: 1.25, codigo: '8010150002', descricao: 'CHAPA GALV CRISTAIS NORMAIS 1,25X1200X3000MM' },
    { material: 'Galvanizado', espessura: 1.55, codigo: '8010150025', descricao: 'CHAPA GALV CRISTAIS NORMAIS 1,55X1500X3000MM' },
    { material: 'Galvanizado', espessura: 1.95, codigo: '8010150013', descricao: 'CHAPA GALV CRISTAIS NORMAIS 1,95X1500X3000MM' },
    { material: 'Galvanizado', espessura: 2.70, codigo: '8010150011', descricao: 'CHAPA GALV CRISTAIS NORMAIS 2,70X1500X3000MM' },

    // Inox 304
    { material: 'Inox304', espessura: 1.00, codigo: '8011110016', descricao: 'CHAPA INOX 304 1,00X1250X2000MM' },
    { material: 'Inox304', espessura: 1.20, codigo: '8011110014', descricao: 'CHAPA INOX 304 1,20X1200X3000MM' },
    { material: 'Inox304', espessura: 1.50, codigo: '8011110017', descricao: 'CHAPA INOX 304 1,50X1250X3000MM' },
    { material: 'Inox304', espessura: 2.00, codigo: '8011110018', descricao: 'CHAPA INOX 304 2,00X1250X3000MM' },
    { material: 'Inox304', espessura: 2.50, codigo: '8011110006', descricao: 'CHAPA INOX 304 2,50X1200X3000MM' },
    { material: 'Inox304', espessura: 3.00, codigo: '8011110023', descricao: 'CHAPA INOX 304 3,00X1500X3000MM' },

    // Inox 430
    { material: 'Inox430', espessura: 1.00, codigo: '8011150016', descricao: 'CHAPA INOX 430 PVC 1,00X1000X2000MM' },
    { material: 'Inox430', espessura: 1.20, codigo: '8011150001', descricao: 'CHAPA INOX 430 PVC 1,20X1250X3000MM' },
    { material: 'Inox430', espessura: 1.50, codigo: '8011150013', descricao: 'CHAPA INOX 430 PVC 1,50X1200X3000MM' },
    { material: 'Inox430', espessura: 2.00, codigo: '8011150019', descricao: 'CHAPA INOX 430 PVC 2,00X1250X3000MM' },
    { material: 'Inox430', espessura: 2.50, codigo: '8011150009', descricao: 'CHAPA INOX 430 PVC 2,50X1200X3000MM' },
    { material: 'Inox430', espessura: 3.00, codigo: '8011150000', descricao: 'CHAPA INOX 430 PVC 3,00X1200X3000MM' }
];

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

/* Desabilitada temporáriamente - antiga function com menos ferramentas
function exportarPDF() { // É chamada ao clicar no botão Exportar PDF

    const { jsPDF } = window.jspdf;
    let doc = new jsPDF('l', 'mm', 'a4');

    const pegaNomeArquivo = document.getElementById('nomeArquivo').value;

    let cab = (pegaNomeArquivo);
            
    doc.text(cab, 10, 10);

    let texto = `Metro² Total: ${totalMetroQuad.toFixed(3)} m²\nPeso Total: ${totalPeso.toFixed(3)} Kg\nTinta Total: ${totalTinta.toFixed(3)} Kg`;

    doc.text(texto, 10, 30);

    // Formata o conteúdo da lista como texto            
    let listaResultadosTexto = "";
    for (let i = 0; i < listaResultados.children.length; i++) {
        listaResultadosTexto += listaResultados.children[i].innerText + "\n\n";
    }

    doc.text(listaResultadosTexto, 10, 60);

    doc.save(pegaNomeArquivo || 'Relatório');

    botaoExportarPDF.disabled = true;
    itemInput.disabled = true;
    itemInput.value = "";
}
*/

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