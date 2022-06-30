function isNumberAscending(number) {
    let numberStr = number.toString()
    for (let i = 0; i < numberStr.length - 1; ++i)
        if (numberStr[i] > numberStr[i + 1]) return false;
    return true;
}



function solveTask2(numberStr) {
    let numberArr = Array.from(numberStr)
    let turning_point = numberArr.length;
    let subtract = false;
    for (let i = 1; i < numberArr.length; ++i) {
        if (turning_point !== numberArr.length) numberArr[i] = '9';
        else if (numberArr[i] < numberArr[i - 1]) turning_point = i;
    }
    let lastNonZero = 0;
    if (turning_point !== numberArr.length) {
        for (let i = turning_point; i >= 0; --i) {
            if (subtract) {
                numberArr[i] = (numberArr[i] === '0' ? '9' : numberArr[i] - '1')
                subtract = false;
            }
            if (i > 0 && numberArr[i] < numberArr[i - 1]) {
                numberArr[i] = '9';
                subtract = true;
            }
            if (numberArr[i] !== 0) lastNonZero = i
        }
    }

    return numberArr.slice(lastNonZero).join("")
}

function runTask2() {
    let input = document.getElementById("task2Input").value;
    if (input === null || input === '')  document.getElementById("task2Result").value = "";
    document.getElementById("task2Result").value = solveTask2(input);
}

