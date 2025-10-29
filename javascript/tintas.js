/* Arquivo: tintas.js
   Módulo de gerenciamento de tintas. Mantém a lógica que foi removida de `aplicacao.js`.
   - Inicialize chamando initTintas() após inserir a seção HTML e carregar este script.
   - Persistência em localStorage chave: 'listaTintas'
   - Remova/edite conforme necessário.
*/

(function(window){
    const STORAGE_KEY = 'listaTintas';
    const elements = {
        btnAdd: null,
        btnEdit: null,
        btnClear: null,
        list: null
    };
    
    let tintas = [];
    let tintaSelecionadaIndex = -1;

    const loadFromStorage = () => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            console.error('Erro ao ler tintas do localStorage:', e);
            return [];
        }
    };

    const initElements = () => {
        Object.assign(elements, {
            btnAdd: document.getElementById('bt-add-tinta'),
            btnEdit: document.getElementById('bt-editar-tinta'),
            btnClear: document.getElementById('bt-limpar-tintas'),
            list: document.getElementById('lista-tintas')
        });

        elements.btnAdd?.addEventListener('click', abrirFormularioAdicionar);
        elements.btnClear?.addEventListener('click', limparTintas);
        elements.btnEdit?.addEventListener('click', editarTintaSelecionada);
    };

    function initTintas() {
        initElements();
        tintas = loadFromStorage();
        atualizarUITintas();
        elements.btnAdd.disabled = false;
        elements.btnClear.disabled = !tintas.length;
    }

    const salvarTintas = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tintas));
        } catch(e) {
            console.error('Erro ao salvar tintas no localStorage:', e);
        }
    };

    const criarBotao = (texto, classe, onClick) => {
        const btn = document.createElement('button');
        btn.textContent = texto;
        btn.className = classe;
        btn.addEventListener('click', onClick);
        return btn;
    };

    function atualizarUITintas() {
        if (!elements.list) return;
        
        elements.list.innerHTML = tintas.map((tinta, idx) => `
            <li data-idx="${idx}">
                <div class="info-tinta">
                    <span class="nome">${tinta.nome}</span>
                    <span class="codigo">${tinta.codigo ? `Código: ${tinta.codigo}` : ''}</span>
                </div>
                <div style="display: flex; gap: 6px">
                    <button class="btn-selecionar-tinta" onclick="TintasModule.selecionar(${idx})">Selecionar</button>
                    <button class="btn-remover-tinta" onclick="TintasModule.remover(${idx})">Remover</button>
                </div>
            </li>
        `).join('');
    }

    const selecionarTinta = (idx) => {
        tintaSelecionadaIndex = idx;
        elements.list.querySelectorAll('li').forEach(li => li.classList.remove('tinta-selecionada'));
        elements.list.querySelector(`li[data-idx="${idx}"]`)?.classList.add('tinta-selecionada');
        elements.btnEdit.disabled = false;
    };

    const removerTinta = (idx) => {
        if (idx < 0 || idx >= tintas.length) return;
        tintas.splice(idx, 1);
        salvarTintas();
        atualizarUITintas();
        elements.btnClear.disabled = !tintas.length;
    };

    const limparTintas = () => {
        if (!confirm('Remover todas as tintas?')) return;
        tintas = [];
        salvarTintas();
        atualizarUITintas();
        elements.btnClear.disabled = true;
    };

    const abrirFormularioAdicionar = () => {
        const container = document.getElementById('tintas');
        if (!container) return;

        container.querySelector('.form-tinta')?.remove();
        
        const form = document.createElement('div');
        form.className = 'form-tinta';
        form.innerHTML = `
            <input type="text" placeholder="Nome da tinta" id="input-nome">
            <input type="text" placeholder="Código (opcional)" id="input-codigo">
        `;

        const salvar = () => {
            const nome = form.querySelector('#input-nome').value.trim();
            const codigo = form.querySelector('#input-codigo').value.trim();
            
            if (!nome) {
                alert('Informe o nome da tinta');
                return;
            }
            
            tintas.push({ nome, codigo });
            salvarTintas();
            atualizarUITintas();
            elements.btnClear.disabled = false;
            form.remove();
        };

        form.appendChild(criarBotao('Salvar', 'btn-salvar', salvar));
        form.appendChild(criarBotao('Cancelar', 'btn-cancelar', () => form.remove()));

        container.appendChild(form);
        form.querySelector('#input-nome').focus();
    };

    const editarTintaSelecionada = () => {
        if (tintaSelecionadaIndex === -1) {
            alert('Selecione uma tinta primeiro');
            return;
        }

        const tinta = tintas[tintaSelecionadaIndex];
        const novoNome = prompt('Editar nome da tinta', tinta.nome)?.trim();
        
        if (!novoNome) return;
        
        const novoCodigo = prompt('Editar código da tinta', tinta.codigo || '')?.trim() || '';
        tintas[tintaSelecionadaIndex] = { nome: novoNome, codigo: novoCodigo };
        salvarTintas();
        atualizarUITintas();
    };

    // Exporta API pública
    window.TintasModule = {
        init: initTintas,
        add: (nome, codigo) => {
            tintas.push({ nome, codigo });
            salvarTintas();
            atualizarUITintas();
        },
        selecionar: selecionarTinta,
        remover: removerTinta
    };

})(window);
