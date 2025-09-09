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
    var metroQuad = (val1/1000) * (val2/1000);
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
    listaChapas();

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