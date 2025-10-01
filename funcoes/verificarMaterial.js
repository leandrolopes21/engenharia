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