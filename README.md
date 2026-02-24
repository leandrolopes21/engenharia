# Cálculo de Engenharia e Gerenciamento de Materiais

Uma aplicação web desenvolvida para auxiliar em cálculos de engenharia, estimativa de materiais (peso, área, tinta) e consulta de códigos de matérias-primas (chapas e tintas).

## 📋 Sobre o Projeto

Este projeto é uma ferramenta utilitária para engenharia e produção. Ele permite calcular rapidamente o peso teórico, a área superficial e a quantidade de tinta necessária para peças com base em suas dimensões e material. Além disso, a aplicação possui funcionalidades avançadas como importação de dados via PDF, geração de relatórios e um sistema de busca para códigos de cadastro de chapas e tintas.

**Desenvolvedor:** Leandro Lopes
**Ano:** 2025

## 🚀 Funcionalidades Principais

### 1. Calculadora de Engenharia
*   **Cálculos Automáticos:** Calcula Metro Quadrado ($m^2$), Peso Total ($kg$) e consumo de Tinta ($kg$).
*   **Materiais Suportados:**
    *   Aço Carbono (Densidade: 8.0)
    *   Alumínio (Densidade: 2.7)
    *   Galvanizado (Densidade: 8.1)
    *   Inox 304 (Densidade: 8.2)
    *   Inox 430 (Densidade: 8.2)
*   **Sugestão de Chapas:** Ao calcular, o sistema sugere automaticamente o código da chapa cadastrada compatível com o material e espessura informados.

### 2. Automação com PDF
*   **Importação de PDF (`pdf.js`):** Capacidade de ler arquivos PDF técnicos (desenhos), extrair automaticamente o nome da peça (`.ipt`), identificar o material e capturar as dimensões (comprimento, largura e espessura).
*   **Exportação de Relatório (`jspdf`):** Gera um relatório em PDF contendo a lista de todas as peças calculadas, somatórios totais e data do sistema.

### 3. Consulta de Cadastros
*   **Listas Dinâmicas:** Visualização de chapas e tintas cadastradas no sistema.
*   **Busca Inteligente:** Filtro em tempo real por descrição ou código.
*   **Copiar Código:** Funcionalidade de clique para copiar o código do item para a área de transferência.

## 🛠️ Tecnologias Utilizadas

*   **HTML5:** Estrutura semântica.
*   **CSS3:** Estilização responsiva, variáveis CSS (`:root`), fontes Google (Poppins).
*   **JavaScript (ES6+):** Lógica de manipulação do DOM, cálculos e eventos.
*   **Bibliotecas Externas:**
    *   jsPDF: Para geração de arquivos PDF.
    *   PDF.js: Para leitura e extração de texto de arquivos PDF.

## 📂 Estrutura de Arquivos

*   `index.html`: Página principal da aplicação (Cálculo de Engenharia).
*   `tintas.html`: Página dedicada ao gerenciamento/visualização de tintas.
*   `chapas.html`: Página dedicada à visualização de chapas.
*   `css/`: Contém os arquivos de estilo (`estilo.css`, `tintas.css`).
*   `javascript/`: Contém a lógica da aplicação (`aplicacao.js`, `tintas.js`, etc).
*   `logos/` & `favicon/`: Imagens e ícones.

## ⚙️ Como Usar

1.  **Abrir a Aplicação:** Execute o arquivo `index.html` em seu navegador.
2.  **Entrada de Dados:**
    *   *Manual:* Digite o nome da peça, quantidade, selecione o material e insira as dimensões (mm).
    *   *Automática:* Clique em "Selecionar PDF" e escolha um arquivo técnico compatível. O sistema preencherá os campos.
3.  **Calcular:** Pressione "Enter" no último campo ou clique em "Calcular".
4.  **Resultados:**
    *   O item será adicionado à lista de resultados.
    *   Os totais (Peso, Área, Tinta) serão atualizados.
    *   Uma sugestão de chapa aparecerá se houver correspondência no cadastro.
5.  **Consultas:** Utilize os botões "Lista de chapas" ou "Lista de tintas" para abrir as tabelas de busca.
6.  **Finalização:**
    *   Clique em "Finalizar Dados" para preparar o relatório.
    *   Insira o nome do arquivo e clique em "Exportar PDF" para baixar o relatório.

## 📝 Fórmulas Utilizadas

*   **Área ($m^2$):** $(Comprimento_{mm} / 1000) \times (Largura_{mm} / 1000)$
*   **Peso ($kg$):** $Area \times Espessura_{mm} \times Densidade$
*   **Tinta ($kg$):** $(Area \times 2) / 3.6$ *(Considerando rendimento específico configurado na aplicação)*

---
&copy; 2025 Leandro Lopes - Todos os direitos reservados.