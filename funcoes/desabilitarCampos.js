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