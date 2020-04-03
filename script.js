// exampleCombo =
// {numberArray: [1,2,3,4],
// answerArray: [1, '*', 2, '*', 3, '*', 4]
// }
const operatorArray = ['+', '-', '*', '/'];
const brackets = ['(', ')'];
const cardNum = 4;
const maxNum = 20;

function createCard(content) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerText = content;
    return card;
}

function populateOperatorCards() {
    const operatorContainer = document.querySelector("#operator-cards");
    operatorArray.forEach(operator => {
        operatorContainer.appendChild(createCard(operator))
    });
}

function populateNumberCards() {
    const currCombo = generateValidCombo();
    const numberContainer = document.querySelector("#number-cards");
    currCombo.numberArray.forEach(number => {
        numberContainer.appendChild(createCard(number))
    })
}

function calculateResult(cards) {

}

function generateAnswerContainer() {

}

window.addEventListener("load", function () {
    populateOperatorCards();
    populateNumberCards();
});

function generateNumber(min, max) {
    return Math.ceil(Math.random() * (max - min)) + min;
}

function generateValidCombo() {
    const numArray = [];
    for (let i = 0; i < cardNum; i++)
        numArray.push(generateNumber(1, maxNum));
    return findAnswerCombo(numArray, 1, [numArray[0]]) || generateValidCombo();
}

function findAnswerCombo(numberArray) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                let answerArrays = generateAnswerArray(numberArray, operatorArray[i], operatorArray[j], operatorArray[k]);
                for (let t = 0; t < 5; t++)
                    if (evaluateExpression(answerArrays[t]) === 24)
                        return {numberArray, answerArray: answerArrays[t]};
            }
        }
    }
    return false;
}

function generateAnswerArray(numberArray, o1, o2, o3) {
    return [
        ['((', numberArray[0], o1, numberArray[1], ')', o2, numberArray[2], ')', o3, numberArray[3]],
        ['(', numberArray[0], o1, '(', numberArray[1], o2, numberArray[2], '))', o3, numberArray[3]],
        ['(', numberArray[0], o1, numberArray[1], ')', o2, '(', numberArray[2], o3, numberArray[3], ')'],
        [numberArray[0], o1, '(', numberArray[1], o2, '(', numberArray[2], o3, numberArray[3], '))'],
        [numberArray[0], o1, '((', numberArray[1], o2, numberArray[2], ')', o3, numberArray[3], ')'],
    ]
}

function evaluateExpression(answerArray) {
    try {
        return Function("return " + answerArray.join(""))();
    } catch (e) {
        return false;
    }
}


