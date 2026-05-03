// ==========================================
// 1. Seleção de Elementos do DOM
// ==========================================
const shape = document.getElementById('preview-shape');
const cssOutput = document.getElementById('css-output');
const copyBtn = document.getElementById('copy-btn');

// Inputs
const colorPicker = document.getElementById('color-picker');
const colorHex = document.getElementById('color-hex');
const sizeInput = document.getElementById('size');
const radiusInput = document.getElementById('radius');
const distanceInput = document.getElementById('distance');
const intensityInput = document.getElementById('intensity');

// Displays de Valor (Labels)
const sizeVal = document.getElementById('size-val');
const radiusVal = document.getElementById('radius-val');
const distanceVal = document.getElementById('distance-val');
const intensityVal = document.getElementById('intensity-val');

// Botões de Direção da Luz
const lightBtns = document.querySelectorAll('.light-btn');

// Estado Inicial da Luz (Top-Left)
let lightX = -1;
let lightY = -1;

// ==========================================
// 2. Funções Utilitárias (Matemática das Cores)
// ==========================================

/**
 * Clareia ou escurece uma cor HEX.
 * @param {string} hex - Cor em formato hexadecimal (ex: #e0e5ec)
 * @param {number} amount - Valor para somar/subtrair dos canais RGB (-255 a 255)
 * @returns {string} - Nova cor HEX
 */
function adjustColor(hex, amount) {
    // Remove o '#' se existir
    hex = hex.replace(/^#/, '');

    // Converte para RGB
    let num = parseInt(hex, 16);

    // Ajusta o canal Red
    let r = (num >> 16) + amount;
    r = Math.max(Math.min(255, r), 0); // Mantém entre 0 e 255

    // Ajusta o canal Green
    let b = ((num >> 8) & 0x00FF) + amount;
    b = Math.max(Math.min(255, b), 0);

    // Ajusta o canal Blue
    let g = (num & 0x0000FF) + amount;
    g = Math.max(Math.min(255, g), 0);

    // Converte de volta para HEX
    return "#" + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
}

// ==========================================
// 3. Lógica Principal de Atualização
// ==========================================

function updateNeumorphism() {
    // Pega os valores atuais dos inputs
    const color = colorPicker.value;
    const size = sizeInput.value;
    const radius = radiusInput.value;
    const distance = parseInt(distanceInput.value);
    const intensity = parseFloat(intensityInput.value);

    // Atualiza os textos dos labels na UI
    sizeVal.textContent = size;
    radiusVal.textContent = radius;
    distanceVal.textContent = distance;
    intensityVal.textContent = intensity;
    colorHex.value = color;

    // Atualiza a variável CSS global para mudar o fundo da página
    document.documentElement.style.setProperty('--base-color', color);

    // --- CÁLCULOS DO NEUMORFISMO ---
    
    // 1. Blur é sempre o dobro da distância
    const blur = distance * 2; 

    // 2. Calcula o quanto a cor vai clarear/escurecer baseado na intensidade (0.01 a 0.6)
    // Multiplicamos por 255 pois é o valor máximo de um canal RGB
    const colorOffset = Math.round(intensity * 255); 
    
    const lightColor = adjustColor(color, colorOffset);
    const darkColor = adjustColor(color, -colorOffset);

    document.documentElement.style.setProperty('--shadow-light', lightColor);
    document.documentElement.style.setProperty('--shadow-dark', darkColor);

    // NOVO: Calcula a luminosidade para mudar a cor do texto (Contraste)
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
    // Se for claro, texto escuro. Se for escuro, texto branco.
    const textColor = luminance > 128 ? '#333333' : '#e0e5ec'; 
    document.documentElement.style.setProperty('--text-color', textColor);

    // 3. Calcula a posição das sombras baseado na direção da luz
    // Sombra Escura (Fica no lado oposto da luz)
    const darkShadowX = distance * (lightX * -1);
    const darkShadowY = distance * (lightY * -1);
    
    // Sombra Clara (Fica no mesmo lado da luz)
    const lightShadowX = distance * lightX;
    const lightShadowY = distance * lightY;

    // Monta a string do box-shadow
    const boxShadow = `${darkShadowX}px ${darkShadowY}px ${blur}px ${darkColor}, 
                       ${lightShadowX}px ${lightShadowY}px ${blur}px ${lightColor}`;

    // Aplica os estilos ao elemento central
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.borderRadius = `${radius}px`;
    shape.style.boxShadow = boxShadow;

    // Atualiza a caixa de código CSS
    const cssText = `border-radius: ${radius}px;
background: ${color};
box-shadow: ${boxShadow};`;
    
    cssOutput.textContent = cssText;
}

// ==========================================
// 4. Event Listeners (Interatividade)
// ==========================================

// Escuta mudanças em todos os sliders e no color picker
const inputs = [colorPicker, sizeInput, radiusInput, distanceInput, intensityInput];
inputs.forEach(input => {
    input.addEventListener('input', updateNeumorphism);
});

// Permite digitar o HEX diretamente no input de texto
colorHex.addEventListener('input', (e) => {
    let val = e.target.value;
    if (val.length === 7 && val.startsWith('#')) {
        colorPicker.value = val;
        updateNeumorphism();
    }
});

// Lógica dos botões de Direção da Luz
lightBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove a classe 'active' de todos
        lightBtns.forEach(b => b.classList.remove('active'));
        // Adiciona no clicado
        btn.classList.add('active');
        
        // Atualiza as variáveis de direção
        lightX = parseInt(btn.getAttribute('data-x'));
        lightY = parseInt(btn.getAttribute('data-y'));
        
        updateNeumorphism();
    });
});

// Lógica do Botão de Copiar (Atualizada para botão de cor fixa)
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(cssOutput.textContent).then(() => {
        const originalText = copyBtn.textContent;
        
        // Muda o texto e o fundo para verde
        copyBtn.textContent = 'Copiado!';
        copyBtn.style.backgroundColor = '#4caf50'; 
        
        // Volta ao normal após 2 segundos
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = 'var(--primary-color)';
        }, 2000);
    });
});
// Inicializa o app com os valores padrão ao carregar a página
updateNeumorphism();