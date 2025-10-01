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