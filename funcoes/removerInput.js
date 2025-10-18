function removerinput() {

    if (itemInput && itemInput.parentNode === nomeArquivoDiv) {
        nomeArquivoDiv.removeChild(itemInput);
        itemInput = null;
    }
}