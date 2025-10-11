/* Arquivo: tintas.js
   Módulo de gerenciamento de tintas. Mantém a lógica que foi removida de `aplicacao.js`.
   - Inicialize chamando initTintas() após inserir a seção HTML e carregar este script.
   - Persistência em localStorage chave: 'listaTintas'
   - Remova/edite conforme necessário.
*/

(function(window){

    // Referências do DOM (serão nulas até a seção HTML existir)
    let btnAddTinta = null;
    let btnEditarTinta = null;
    let btnLimparTintas = null;
    let listaTintasUL = null;

    // Estado local
    let listaTintas = [];
    let tintaSelecionadaIndex = -1;

    function initElementRefs(){
        btnAddTinta = document.getElementById('bt-add-tinta');
        btnEditarTinta = document.getElementById('bt-editar-tinta');
        btnLimparTintas = document.getElementById('bt-limpar-tintas');
        listaTintasUL = document.getElementById('lista-tintas');

        if (btnAddTinta) btnAddTinta.addEventListener('click', abrirFormularioAdicionar);
        if (btnLimparTintas) btnLimparTintas.addEventListener('click', limparTintas);
        if (btnEditarTinta) btnEditarTinta.addEventListener('click', editarTintaSelecionada);
    }

    function initTintas(){
        initElementRefs();
        try {
            const raw = localStorage.getItem('listaTintas');
            if (raw) listaTintas = JSON.parse(raw) || [];
        } catch (e) {
            console.error('Erro ao ler listaTintas do localStorage', e);
            listaTintas = [];
        }
        atualizarUITintas();
        if (btnAddTinta) btnAddTinta.disabled = false;
        if (btnLimparTintas) btnLimparTintas.disabled = listaTintas.length === 0;
    }

    function salvarTintas(){
        try {
            localStorage.setItem('listaTintas', JSON.stringify(listaTintas));
        } catch(e) {
            console.error('Erro ao salvar listaTintas no localStorage', e);
        }
    }

    function atualizarUITintas(){
        if (!listaTintasUL) return;
        listaTintasUL.innerHTML = '';
        listaTintas.forEach((tinta, idx) => {
            const li = document.createElement('li');
            li.setAttribute('data-idx', idx);

            const info = document.createElement('div');
            info.className = 'info-tinta';

            const nomeEl = document.createElement('span');
            nomeEl.className = 'nome';
            nomeEl.textContent = tinta.nome;

            const codigoEl = document.createElement('span');
            codigoEl.className = 'codigo';
            codigoEl.textContent = tinta.codigo ? `Código: ${tinta.codigo}` : '';

            info.appendChild(nomeEl);
            info.appendChild(codigoEl);

            const btns = document.createElement('div');
            btns.style.display = 'flex';
            btns.style.gap = '6px';

            const btnSel = document.createElement('button');
            btnSel.className = 'btn-selecionar-tinta';
            btnSel.textContent = 'Selecionar';
            btnSel.addEventListener('click', () => selecionarTinta(idx));

            const btnRem = document.createElement('button');
            btnRem.className = 'btn-remover-tinta';
            btnRem.textContent = 'Remover';
            btnRem.addEventListener('click', () => removerTinta(idx));

            btns.appendChild(btnSel);
            btns.appendChild(btnRem);

            li.appendChild(info);
            li.appendChild(btns);
            listaTintasUL.appendChild(li);
        });
    }

    function selecionarTinta(idx){
        tintaSelecionadaIndex = idx;
        const lis = listaTintasUL.querySelectorAll('li');
        lis.forEach(li => li.classList.remove('tinta-selecionada'));
        const selecionado = listaTintasUL.querySelector(`li[data-idx="${idx}"]`);
        if (selecionado) selecionado.classList.add('tinta-selecionada');
        if (btnEditarTinta) btnEditarTinta.disabled = false;
    }

    function removerTinta(idx){
        if (idx < 0 || idx >= listaTintas.length) return;
        listaTintas.splice(idx, 1);
        salvarTintas();
        atualizarUITintas();
        if (btnLimparTintas) btnLimparTintas.disabled = listaTintas.length === 0;
    }

    function limparTintas(){
        if (!confirm('Remover todas as tintas?')) return;
        listaTintas = [];
        salvarTintas();
        atualizarUITintas();
        if (btnLimparTintas) btnLimparTintas.disabled = true;
    }

    function abrirFormularioAdicionar(){
        const container = document.getElementById('tintas');
        if (!container) return;
        const form = document.createElement('div');
        form.className = 'form-tinta';

        const inputNome = document.createElement('input');
        inputNome.type = 'text';
        inputNome.placeholder = 'Nome da tinta';

        const inputCodigo = document.createElement('input');
        inputCodigo.type = 'text';
        inputCodigo.placeholder = 'Código (opcional)';

        const btnSalvar = document.createElement('button');
        btnSalvar.textContent = 'Salvar';
        btnSalvar.addEventListener('click', () => {
            const nome = inputNome.value.trim();
            const codigo = inputCodigo.value.trim();
            if (!nome) { alert('Informe o nome da tinta'); return; }
            listaTintas.push({ nome, codigo });
            salvarTintas();
            atualizarUITintas();
            if (btnLimparTintas) btnLimparTintas.disabled = false;
            form.remove();
        });

        const btnCancelar = document.createElement('button');
        btnCancelar.textContent = 'Cancelar';
        btnCancelar.addEventListener('click', () => form.remove());

        form.appendChild(inputNome);
        form.appendChild(inputCodigo);
        form.appendChild(btnSalvar);
        form.appendChild(btnCancelar);

        const existente = container.querySelector('.form-tinta');
        if (existente) existente.remove();
        container.appendChild(form);
        inputNome.focus();
    }

    function editarTintaSelecionada(){
        if (tintaSelecionadaIndex === -1) return alert('Selecione uma tinta primeiro');
        const tinta = listaTintas[tintaSelecionadaIndex];
        const novoNome = prompt('Editar nome da tinta', tinta.nome);
        if (novoNome === null) return; // cancel
        const novoCodigo = prompt('Editar código da tinta', tinta.codigo || '');
        if (novoNome.trim() === '') return alert('Nome inválido');
        listaTintas[tintaSelecionadaIndex] = { nome: novoNome.trim(), codigo: (novoCodigo || '').trim() };
        salvarTintas();
        atualizarUITintas();
    }

    // Exporta API mínima
    window.TintasModule = {
        init: initTintas,
        add: function(nome,codigo){ listaTintas.push({nome,codigo}); salvarTintas(); atualizarUITintas(); }
    };

})(window);
