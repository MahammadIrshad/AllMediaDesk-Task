function precedence(operator) {
    if (operator === '/' || operator === '*') return 2;
    if (operator === '+' || operator === '-') return 1;
    return 0;
}

function isAlpha(character) {
    let code = character.charCodeAt(0);
    return (code > 96 && code < 123) || (code > 64 && code < 91);
}

function isNum(character) {
    let code = character.charCodeAt(0);
    return (code > 47 && code < 58);
}

function isOperator(character) {
    return precedence(character) !== 0
}

function cleanExpression(expression) {
  
    let cleaned = ""
    for (let i = 0; i < expression.length; ++i) {
        if (i < expression.length - 1 && isOperator(expression[i]) && isOperator(expression[i + 1])) {
            let c = expression[i] + expression[i + 1];
            if ((expression[i] === '-' && expression[i + 1] === '-') || (expression[i] === '+' && expression[i + 1] === '+')) c = '+';
            else if ((expression[i] === '+' && expression[i + 1] === '-') || (expression[i] === '-' && expression[i + 1] === '+')) c = '-'
            else if (expression[i] === '-' || expression[i] === '+') throw 'Error in cleaning the expression';
            cleaned += c;
            i++;
        } else if (expression[i] !== ' ') cleaned += expression[i];
    }
    return cleaned
}

function infixToPostfix(expression) {
    let query = cleanExpression(expression)
    let stack = [];
    let vector = [];
    let isNegative = false;
    let isPrevOp = true;
    for (let i = 0; i < query.length; ++i) {
        let c = query[i];
        if (isNum(c)) {
            let number = 0;
            while (i < query.length && isNum(query[i])) {
                number = (number * 10 + parseInt(query[i++]));
            }
            i--
            if (isNegative) {
                number *= -1;
                isNegative = false;
            }
            vector.push({value: number, type: "number"})
            isPrevOp = false;
        } else if (c === '(') {
            stack.push({value: '(', type: "operator"});
        } else if (c === ')') {
            let op = stack.pop();
            while (op.value !== '(') {
                vector.push(op);
                op = stack.pop();
            }
        } else if (isOperator(c)) {
            let topElement = stack[stack.length - 1]
            while (stack.length !== 0 && precedence(query[i]) <= precedence(topElement.value) && !isPrevOp) {
                vector.push(topElement);
                stack.pop();
                topElement = stack[stack.length - 1]
            }
            let pushOperator = true;
            if (c === '-' && !isNegative) {
                c = '+';
                isNegative = true;
                if (isPrevOp) {
                    pushOperator = false;
                }
            }
            if (pushOperator) {
                stack.push({value: c, type: "operator"})
            }
            isPrevOp = true;
        } else {
            throw 'Unexpected character.'
        }
    }
    while (stack.length !== 0) {
        vector.push(stack.pop());
    }
    return vector;
}

function evaluateTerms(left, right, operator) {
    if (operator.value === '+') return {value: left.value + right.value, type: 'number'};
    if (operator.value === '-') return {value: left.value - right.value, type: 'number'};
    if (operator.value === '*') return {value: left.value * right.value, type: 'number'};
    if (operator.value === '/') return {value: left.value / right.value, type: 'number'};
}

function evaluatePostfix(postfixArr) {
    let stack = [];
    for (let i = 0; i < postfixArr.length; ++i) {
        if (postfixArr[i].type === 'operator') {
            let t1 = stack.pop();
            let t2 = stack.pop();
            stack.push(evaluateTerms(t2, t1, postfixArr[i]));
        } else {
            stack.push(postfixArr[i]);
        }
    }
    if(stack.length !== 1) throw 'Error in evaluating.';
    return stack[0];
}

function solveTask1(expression){
    return evaluatePostfix(infixToPostfix(expression));
}

function Part1() {
    let input = document.getElementById("Part1Input").value;
    if (input === null || input === '') document.getElementById("part1Result").value = "";
    try {
        document.getElementById("part1Result").value = solveTask1(input).value;
    }
    catch{
        alert("Enter a Number")
    }
}
