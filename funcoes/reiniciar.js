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