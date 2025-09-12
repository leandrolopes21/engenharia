let minhaJanela = null; // Cria uma variável para armazenar a janela.

function abrirJanelaUnica() {

    // Se a janela não existe ou se foi fechada
    if (minhaJanela === null || minhaJanela.closed) {
        // Abre uma nova janela e a atribui a variável
        minhaJanela = window.open('index.html', '_blank', 'width=800, height=600');
    } else {
        // Se a janela já existe, simplesmente foca nela
        minhaJanela.focus();
    }    
}