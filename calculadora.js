// Variables globales
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

// Obtener referencia al display
const display = document.getElementById('result');

// Función para agregar texto al display
function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Evitar múltiples puntos decimales
    if (value === '.' && currentInput.includes('.')) {
        return;
    }
    
    // Evitar múltiples operadores consecutivos
    if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
        currentInput = currentInput.slice(0, -1);
    }
    
    currentInput += value;
    display.value = currentInput;
}

// Función para limpiar todo el display
function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    display.value = '0';
    shouldResetDisplay = false;
}

// Función para limpiar la entrada actual
function clearEntry() {
    currentInput = '';
    display.value = '0';
}

// Función para eliminar el último carácter
function deleteLast() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || '0';
    }
}

// Función para manejar operadores
function handleOperator(op) {
    if (currentInput === '') return;
    
    if (previousInput !== '' && operator !== '') {
        calculate();
    }
    
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    shouldResetDisplay = true;
}

// Función principal de cálculo
function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') {
        return;
    }
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    try {
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    display.value = 'Error: División por cero';
                    resetCalculator();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        // Redondear a 10 decimales para evitar errores de precisión
        result = Math.round(result * 10000000000) / 10000000000;
        
        display.value = result;
        currentInput = result.toString();
        previousInput = '';
        operator = '';
        shouldResetDisplay = true;
        
    } catch (error) {
        display.value = 'Error';
        resetCalculator();
    }
}

// Función para resetear la calculadora
function resetCalculator() {
    currentInput = '';
    operator = '';
    previousInput = '';
    shouldResetDisplay = false;
}

// Función para manejar teclas del teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Números y punto decimal
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    }
    // Operadores
    else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
    }
    // Enter o = para calcular
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    // Escape para limpiar
    else if (key === 'Escape') {
        clearDisplay();
    }
    // Backspace para eliminar último carácter
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Función para agregar animación al display cuando hay un resultado
function animateResult() {
    display.style.transform = 'scale(1.05)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 150);
}

// Modificar la función calculate para incluir animación
const originalCalculate = calculate;
calculate = function() {
    originalCalculate();
    if (display.value !== 'Error' && display.value !== 'Error: División por cero') {
        animateResult();
    }
};

// Función para mostrar historial de operaciones (opcional)
function showHistory() {
    // Esta función se puede expandir para mostrar un historial de operaciones
    console.log('Historial de operaciones:', {
        previous: previousInput,
        operator: operator,
        current: currentInput
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    display.value = '0';
    display.focus();
});

// Función para manejar clics en operadores (modificar los onclick en HTML)
function handleOperatorClick(op) {
    handleOperator(op);
}

// Actualizar los onclick de los operadores en el HTML
document.addEventListener('DOMContentLoaded', function() {
    // Buscar todos los botones de operadores y actualizar sus onclick
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        const text = button.textContent;
        if (['+', '-', '×', '/'].includes(text)) {
            const operator = text === '×' ? '*' : text;
            button.onclick = () => handleOperator(operator);
        }
    });
});
