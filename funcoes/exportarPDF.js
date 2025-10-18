function exportarPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF('l', 'mm', 'a4');

    // String base da logo - utilizando um conversor base64 online
    const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAMAAABhTZc9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAGVUExURS9JUzFJUzJJUzRKUjVKUjhLUThLUjlERTlLUTpERTpLUTpMUTtMUTxMUT1MUT5MUD5NUT9NUD9NUUBNUEFNUEFOUEJMTUJNT0JOUENMTUNOUEROT0ROUERPUEVPUEZQT0tQT0xRTkxRT1FTTVJSTVNTTVVTTVZTTVZUTFxVTF9WS2FWS2RXSWRYSWVXSWVXSmVYSWdYSWdYSmlZSWlZSm5aSW51dm52dnVcSHZcR31eRn5fRoNgRYtiRIxiQ4xjRI9jQpFkQ5dlQptnQqBoQKJqQKNpQKVrP6ZpP6ZqP6dqP6prPqtrPqxrPq1sPq5sPa5sPq9sPa9sPq9tPrBtPbFtPbJuPrVuPbZuPbZvPLhvPLpvPLpwPLxwO7xxPL1wO75xO79xO8BxO8ByO8FyO8NyO8p0Ocx0Oc11OM92ONB3N9N3ONR3N9Z3ONl4N+h8NOl8NOp9NOt+NOx+M+5+M/SAMvWAMveBMvmBMvmCMvqCMfr6+vr7+vv6+vv7+v2CMf6DMf+DMP+DMf+EMP+FL/+GLv+GL0oSohoAAAFiSURBVCjPY6gzE5OWwwakxcxqGMw4sUsCpdnNGCRxSQKlJRlwSwKlGeTwAaCsIAcbBwcrtxSIK8MHYrOJwmUFLf3DPd3C3BWA0jJCDuFurn5R2qJwWQu3xMa2tFAlsKxddktLXqq+MJLJjCWNglxSsiCTOTSqmk1YRGXgsnIyTIWVshKyYL6IWnmTsYAMwlVyckz5pVJSEL6oalmTgZAcimxBqQySrA66bBmSbIPuYJGFuFlKVAYmKyMqLIHqXylFTVkRoI/0hORkJNS1VCRgYVUhIyEjw+WSKS8IDCtDIRkp3px6Zx6QrDAPQ0kjPys3N2NanDibWlWjETM3B19xpT1IVtjUMbK5LSk+ISW9zYfDJqOlJSs2ITm3tciKDygrYB0R4+0REBQUHBhhyuUU7eXpGxQUEBJuqwy2V4CDDZggQEmCTVCGl40VyuaFuRl3usKfJvGnZ/x5odYcZz4yrwYA9eCCzk6LdKQAAAAASUVORK5CYII=';

    // Defina as margens do documento (em mm)
    const margemSuperior = 20;
    const margemEsquerda = 20;
    const margemDireita = 20;
    const margemInferior = 20;
    const larguraPagina = doc.internal.pageSize.getWidth();
    const alturaPagina = doc.internal.pageSize.getHeight();

    // Adiciona as linhas das margens
    doc.setLineWidth(0.2); // Define a espessura da linha
    doc.setDrawColor(128, 128, 128); // Define a cor da linha
    doc.line(20, 20, larguraPagina - 20, 20); // Desenha a linha superior
    doc.line(20, alturaPagina - 20, larguraPagina - 20, alturaPagina - 20); // Desenha a linha inferior
    doc.line(20, 20, 20, alturaPagina - 20); // Desenha a linha esquerda
    doc.line(larguraPagina - 20, 20, larguraPagina - 20, alturaPagina - 20); // Desenha a linha direita

    // Largura e altura da logo em mm
    const logoLargura = 10;
    const logoAltura = 10;

    // Inserindo a logo
    // doc.addImage(imagem, formato, x, y, largura, altura)
    doc.addImage(logoBase64, 'JPG', margemDireita, margemSuperior, logoLargura, logoAltura);

    const pegaNomeArquivo = document.getElementById('nomeArquivo').value;

    // Título do Relatório (Centralizado)
    let cab = (pegaNomeArquivo);
    doc.setFontSize(21); // Tamanho da fonte para o título
    doc.setFont('helvetica', 'bold'); // Fonte em negrito
    const larguraTextoCab = doc.getTextWidth(cab);
    const posicaoXCab = (larguraPagina - larguraTextoCab) / 2; // Centraliza o texto
    doc.text(cab, posicaoXCab, margemSuperior - 5);

    // Informações resumidas
    doc.setFontSize(14); // Tamanho da fonte para o resumo
    doc.setFont('helvetica', 'normal'); // Volta para a fonte normal
    let textoResumo = `Metro² Total: ${totalMetroQuad.toFixed(3)} m²\nPeso Total: ${totalPeso.toFixed(3)} Kg\nTinta Total: ${totalTinta.toFixed(3)} Kg`;
    doc.text(textoResumo, margemEsquerda + 5, margemSuperior + 20); // Posição abaixo do título

    // Lista de Resultados
    doc.setFontSize(12); // Tamanho da fonte para a lista
    doc.setFont('helvetica', 'normal');
    let listaResultadosTexto = "";
    for (let i = 0; i < listaResultados.children.length; i++) {
        listaResultadosTexto += listaResultados.children[i].innerText + "\n\n";
    }
    doc.text(listaResultadosTexto, margemEsquerda + 5, margemSuperior + 50); // Posição abaixo do resumo

    // Rodapé (Número da página)
    const totalPaginas = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPaginas; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        const numeroPagina = `Página ${i} de ${totalPaginas}`;
        const larguraNumeroPagina = doc.getTextWidth(numeroPagina);
        const posicaoXNumeroPagina = (larguraPagina - larguraNumeroPagina) / 2;
        doc.text(numeroPagina, posicaoXNumeroPagina, alturaPagina - margemInferior + 10);
    }

    doc.save(pegaNomeArquivo || 'Relatório');
    botaoExportarPDF.disabled = true;
    itemInput.disabled = true;
    itemInput.value = "";
}