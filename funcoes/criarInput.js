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