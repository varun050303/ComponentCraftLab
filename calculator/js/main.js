const calculator = document.querySelector('.calculator');
const outputScreen = calculator.querySelector('.calculator__output_screen').children[0]
const keys = calculator.querySelector('.calculator_keys')

const calculate = (firstValue, secondValue, operator) => {

    firstValue = parseFloat(firstValue)
    secondValue = parseFloat(secondValue)
    switch (operator) {
        case 'plus':
            return firstValue + secondValue;
            break
        case 'minus':
            return firstValue - secondValue;
            break
        case 'times':
            return firstValue * secondValue;
            break
        case 'divide':
            return firstValue / secondValue;
            break
    }
}

function handleClearKey(calculator, button) {
    const { previousButtonType } = calculator.dataset
    //If clear key press once
    outputScreen.textContent = 0;
    button.textContent = 'AC';

    //If clear key presses twice
    if (previousButtonType === 'clear') {
        delete calculator.dataset.activeOperator;
        delete calculator.dataset.firstValue;
        delete calculator.dataset.modifierValue
    }

}


function handleNumberKey(calculator, button) {
    const displayValue = getDisplayValue()
    const { previousButtonType } = calculator.dataset
    const { key } = button.dataset


    if (displayValue === '0') {
        outputScreen.textContent = key
    } else {
        outputScreen.textContent = displayValue + key
    }

    if (previousButtonType === 'operator') {
        outputScreen.textContent = key
    }

    if (previousButtonType === 'equal') {
        resetCalculator()
        outputScreen.textContent = key

    }
}

function handleDecimalKey(calculator) {
    const displayValue = getDisplayValue()
    const { previousButtonType } = calculator.dataset

    if (!outputScreen.textContent.includes('.')) {
        outputScreen.textContent = displayValue + '.'
    }

    if (previousButtonType === 'equal') {
        resetCalculator()
        outputScreen.textContent = '0.'
    }

    if (previousButtonType === 'operator') {
        outputScreen.textContent = '0.'
    }
}

function handleOperatorKey(calculator, button) {

    const { previousButtonType, firstValue, activeOperator } = calculator.dataset
    const displayValue = getDisplayValue()
    const { key } = button.dataset

    button.classList.add('is-pressed');
    const secondValue = displayValue

    if (previousButtonType !== 'operator' && previousButtonType !== 'equal' && firstValue && activeOperator) {
        const result = calculate(firstValue, secondValue, activeOperator)
        outputScreen.textContent = result
        calculator.dataset.firstValue = result
    } else {
        calculator.dataset.firstValue = displayValue;
    }

    calculator.dataset.activeOperator = key;

}


function handleEqualKey(calculator) {

    const { firstValue, activeOperator, modifierValue } = calculator.dataset
    const displayValue = getDisplayValue()
    const secondValue = modifierValue || parseFloat(displayValue)

    if (firstValue && activeOperator) {

        const result = calculate(firstValue, secondValue, activeOperator)
        outputScreen.textContent = result
        calculator.dataset.firstValue = result
        calculator.dataset.modifierValue = secondValue

    } else {
        outputScreen.textContent = parseFloat(displayValue) * 1
    }
}

keys.addEventListener('click', (evt) => {
    const button = evt.target
    const { buttonType } = button.dataset

    if (buttonType !== 'clear') {
        const clearButton = document.querySelector('[data-button-type="clear"]')
        clearButton.textContent = 'CE'
    }

    switch (buttonType) {
        case 'clear':
            handleClearKey(calculator, button)
            break;
        case 'number':
            handleNumberKey(calculator, button)
            break;
        case 'decimal':
            handleDecimalKey(calculator)
            break;
        case 'operator':
            handleOperatorKey(calculator, button)
            break;
        case 'equal':
            handleEqualKey(calculator)
            break;
    }

    calculator.dataset.previousButtonType = buttonType

})

//Test Cases to check if calculator working properly

const pressKey = (key) => {
    calculator.querySelector(`[data-key="${key}"]`).click()
}

const getDisplayValue = () => {
    return calculator.querySelector('.calculator__output_screen').children[0].textContent
}

const resetCalculator = _ => {
    pressKey('clear')
    pressKey('clear')

    console.assert(getDisplayValue() === '0', 'Calculator cleared')
    console.assert(!calculator.dataset.firstValue, 'No first value')
    console.assert(!calculator.dataset.operator, 'No operator value')
}

const pressKeys = (...keys) => {
    keys.forEach(key => pressKey(key))
}

const runTest = test => {
    pressKeys(...test.keys);
    console.assert(getDisplayValue() === test.result, test.message)
    resetCalculator()
}

const tests = [
    //Initial Expressions
    {
        message: 'Number',
        result: '4',
        keys: ['4']
    },
    {
        message: 'Number Number',
        result: '44',
        keys: ['4', '4']
    },
    {
        message: 'Number decimal',
        result: '4.',
        keys: ['4', 'decimal']
    },
    {
        message: 'Number decimal Number',
        result: '4.4',
        keys: ['4', 'decimal', '4']
    },
    // Calculations
    {
        message: 'Addition',
        keys: ['2', 'plus', '5', 'equal'],
        result: '7'
    },
    {
        message: 'Subtraction',
        keys: ['5', 'minus', '9', 'equal'],
        result: '-4'
    },
    {
        message: 'Multiplication',
        keys: ['4', 'times', '8', 'equal'],
        result: '32'
    },
    {
        message: 'Division',
        keys: ['5', 'divide', '1', '0', 'equal'],
        result: '0.5'
    },
    {
        message: 'Number Equal',
        keys: ['5', 'equal'],
        result: '5'
    },
    {
        message: 'Number Decimal Equal',
        keys: ['2', 'decimal', '4', '5', 'equal'],
        result: '2.45'
    },
    {
        message: 'Decimal key',
        keys: ['decimal'],
        result: '0.'
    },
    {
        message: 'Decimal Decimal',
        keys: ['2', 'decimal', 'decimal'],
        result: '2.'
    },
    {
        message: 'Decimal Number Decimal',
        keys: ['2', 'decimal', '5', 'decimal', '5'],
        result: '2.55'
    },
    {
        message: 'Decimal Equal',
        keys: ['2', 'decimal', 'equal'],
        result: '2'
    },
    {
        message: 'Equal',
        keys: ['equal'],
        result: '0'
    },
    {
        message: 'Equal Number',
        keys: ['equal', '2'],
        result: '2'
    },
    {
        message: 'Equal Number Equal',
        keys: ['equal', '2', 'equal'],
        result: '2'
    },
    {
        message: 'Number Equal Number',
        keys: ['2', 'equal', '3'],
        result: '3'
    },
    {
        message: 'Equal Decimal',
        keys: ['equal', 'decimal'],
        result: '0.'
    },
    {
        message: 'Number Equal Decimal',
        keys: ['5', 'equal', 'decimal'],
        result: '0.'
    },
    {
        message: 'Calculation + Operator',
        keys: ['1', 'plus', '1', 'equal', 'plus', '1', 'equal'],
        result: '3'
    },
    {
        message: 'Operator Decimal',
        keys: ['times', 'decimal'],
        result: '0.'
    },
    {
        message: 'Number Operator Decimal',
        keys: ['5', 'times', 'decimal'],
        result: '0.'
    },
    {
        message: 'Operator calculation',
        keys: ['9', 'minus', '5', 'minus'],
        result: '4'
    },
    {
        message: 'Number Operator Operator',
        keys: ['9', 'times', 'divide'],
        result: '9'
    },
    {
        message: 'Number Operator Equal Equal',
        keys: ['9', 'minus', 'equal', 'equal'],
        result: '-9'
    },
    {
        message: 'Number Operator Number Equal Equal',
        keys: ['8', 'minus', '5', 'equal', 'equal'],
        result: '-2'
    },
    {
        message: 'Operator follow-up Calculation',
        keys: ['1', 'plus', '2', 'plus', '3', 'plus', '4', 'plus', '5', 'plus'],
        result: '15'
    },
    {
        message: 'Number Operator Number Equal Number Operator Equal',
        keys: ['2', 'plus', '2', 'equal', 'plus', '6', 'equal'],
        result: '10'
    }

]

tests.forEach(test => runTest(test))

const testClearKey = _ => {
    //Before Calculation
    pressKeys('4', 'clear')
    const clearKeyText = document.querySelector('[data-button-type="clear"]').textContent

    console.assert(getDisplayValue() === '0', 'Clear before calculation')
    console.assert(clearKeyText === 'AC', 'Clear once, should show AC')

    resetCalculator()

    //After Calculation

    pressKeys('4', 'times', '5', 'equal', 'clear')
    const { firstValue, activeOperator } = calculator.dataset
    console.assert(firstValue, 'Clear once: should have first value')
    console.assert(activeOperator, 'Clear once: should have operator')

    resetCalculator()

}

testClearKey()