function evaluateEquationWithX(equation, xValue) {
    let equationArr = Array.from(equation)
    for (let i = 0; i < equationArr.length; i++) {
        if (equationArr[i] === 'x') {
            if (i === 0) equationArr[i] = xValue;
            else if (i < equationArr.length && isOperator(equationArr[i - 1]) && isOperator(equationArr[i + 1])) equationArr[i] = xValue;
            else if (isNum(equationArr[i - 1])) equationArr[i] = '*' + xValue;
            else equationArr[i] = xValue
        }
    }
    let equationWithoutX = equationArr.join("");
    return solveTask1(equationWithoutX).value
}

function drawTask3() {
    let canvas = document.getElementById("task3Canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let equation = document.getElementById("task3Input").value;
    let firstX = 0;
    let secondX = 20;

    function getY(x) {
        let yHeight = canvas.offsetHeight;
        return yHeight - evaluateEquationWithX(equation, x);
    }

    ctx.beginPath();
    ctx.moveTo(firstX, getY(firstX));
    ctx.lineTo(secondX, getY(secondX));
    ctx.stroke();
}
