function sugerirChapas() {
    const materialSelecionado = document.querySelector('input[name="radmat"]:checked').id;
    const espessuraDigitada = Number(num3.value);

    const chapasSugeridas = chapas.filter(chapa =>
        chapa.material === materialSelecionado && chapa.espessura === espessuraDigitada
    );

    divSug.innerHTML = '';

    if (chapasSugeridas.length > 0) {
        chapasSugeridas.forEach(chapa => {
            // Cria um elemento div para cada resultado
            const resultadoDiv = document.createElement('div');
            resultadoDiv.className = 'divDinamica';

            /* Espaço reservado a criação dinâmica de resposta das chapas */

            // Cria o botão de copiar
            const botaoCopiar = document.createElement('button');
            botaoCopiar.textContent = 'Copiar';
            botaoCopiar.className = 'btn-copiar'; // Adiciona uma classe para estilização, se quiser
            botaoCopiar.setAttribute('data-codigo', chapa.codigo); // Armazena o código no botão

            // Adiciona um evento de clique ao botão
            botaoCopiar.addEventListener('click', () => {
                // Usa a API Clipboard para copiar o texto
                navigator.clipboard.writeText(chapa.codigo).then(() => {
                    console.log(`Código ${chapa.codigo} copiado com sucesso!`);
                    alert(`Código ${chapa.codigo} copiado para a área de transferência!`);
                }).catch(err => {
                    console.error('Erro ao copiar o texto: ', err);
                    alert('Não foi possível copiar o texto. Tente novamente.');
                });
            });

            // Adiciona o botão à div do resultado
            resultadoDiv.appendChild(botaoCopiar);

            // Adiciona o texto da chapa
            const textoChapa = document.createTextNode(`${chapa.codigo} - ${chapa.descricao}`);
            resultadoDiv.appendChild(textoChapa);

            // Adiciona a div completa à divSug
            divSug.appendChild(resultadoDiv);
        });
    } else {
        divSug.innerHTML = 'Nenhuma chapa encontrada com a espessura e material selecionados.';
    }
}