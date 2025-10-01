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