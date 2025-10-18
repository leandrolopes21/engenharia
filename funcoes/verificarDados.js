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