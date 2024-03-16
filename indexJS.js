const buttons = document.querySelectorAll('.calculator input[type="button"]');
const display_input = document.querySelector('.screen .input');
const display_output = document.querySelector('.screen .output');
const revSign = document.getElementById('rev-sign');
const sQr = document.getElementById('square');
const sQrt = document.getElementById('square-root');
const numberxzy = document.getElementsByClassName('btn-number');
const operatorxzy = document.getElementsByClassName('operator-button');
const dotButton = document.querySelector('.operator-button[value="."]');

let historyData = [];
let expressOBJ = "";
let resultData = "";
let numClicked = false;
let dotClicked = false;

let input = "";

for (let btn of buttons) {
    const value = btn.value;

    if (value !== "+/-") {
        btn.addEventListener('click', () => {
            if (value === "C") {
                input = "";
                display_input.innerHTML = "";
                display_output.innerHTML = "";
                disableOperatorButtons();
            } else if (value === "AC"){
                input = "";
                display_input.innerHTML = "";
                display_output.innerHTML = "";
                clearHistory();
            } else if (value === "DEL") {
                input = input.slice(0, -1);
                display_input.innerHTML = input;
                if(input === ''){
                    disableOperatorButtons();
                    display_output.innerHTML = "";
                }
            } else if (value === "=") {
                let processedInput = input.replace(/×/g, "*").replace(/÷/g, "/");
                let result = eval(perC(processedInput));
                expressOBJ = processedInput;
                resultData = result; 
                historyData.push({"expression": expressOBJ,"result":resultData});
                showHistory();
                resultData = "";
                expressOBJ = "";
                display_output.innerHTML = result;
            } else {
                if (value === "×") {
                    input += "×";
                    display_input.innerHTML = input;
                } else if (value === "÷") {
                    input += "÷";
                    display_input.innerHTML = input;
                } else {
                    input += value;
                    display_input.innerHTML = input;
                }
            }
        });
    }
}

function rev(){
    if(input.charAt(0) === "-"){
        input = input.slice(1);
    }
    else{
        input = '-' + input;
    }
    display_input.innerHTML = input;
}
revSign.addEventListener('click', rev);

function sQ() {
    const inputNumber = parseFloat(input);
    const result = Math.pow(inputNumber, 2);
    input = `${inputNumber}²`;
    expressOBJ = inputNumber;
    resultData = result; 
    historyData.push({"expression": expressOBJ,"result":resultData});
    showHistory();
    display_input.innerHTML = input;
    display_output.innerHTML = result;
    resultData = "";
    expressOBJ = "";
}
sQr.addEventListener('click', sQ);

function sqrt() {
    const inputNumber = parseFloat(input);
    const result = Math.sqrt(inputNumber);
    input = `√(${inputNumber})`;
    expressOBJ = inputNumber;
    resultData = result; 
    historyData.push({"expression": expressOBJ,"result":resultData});
    showHistory();
    display_input.innerHTML = input;
    display_output.innerHTML = result;
    resultData = "";
    expressOBJ = "";
}
sQrt.addEventListener('click', sqrt);

function perC(input){
    let input_arr = input.split("");

    for(let i = 0; i < input_arr.length; i++){
        if(input_arr[i] === "%"){
            input_arr[i] = "/100";
        }
    }
    return input_arr.join("");
}

for (let i = 0; i < numberxzy.length; i++) {
    numberxzy[i].addEventListener('click', numClick);
}

for (let i = 0; i < operatorxzy.length; i++) {
    operatorxzy[i].addEventListener('click', operClick);
}

function operClick() {
    if (numClicked) {
        numClicked = false;
        dotClicked = false;
        if (!endsWithPercent(input)) {
            disableOperatorButtons();
            dotButton.disabled = false;
        }
    }
}

function numClick() {
    numClicked = true;
    if (!endsWithPercent(input)) {
        enableOperatorButton();
        if (dotClicked) {
            dotButton.disabled = true;
        }
    }
}

function endsWithPercent(str) {
    return str.charAt(str.length - 1) === '%';
}

dotButton.addEventListener('click', () => {
    dotClicked = true;
    dotButton.disabled = true;
});

function enableOperatorButton() {
    const operatorButtons = document.querySelectorAll('.operator-button, .btn-equal');
    operatorButtons.forEach(button => {
        button.disabled = false;
    });
}

function disableOperatorButtons() {
    const operatorButtons = document.querySelectorAll('.operator-button, .btn-equal');
    operatorButtons.forEach(button => {
        button.disabled = true;
    });
}

disableOperatorButtons();

function showHistory() {
    let log = document.getElementsByClassName('log');
    let string = "";

    for (let i = Object.keys(historyData).length - 1; i >= 0; i--) {
        let key = Object.keys(historyData)[i];
        string += "<span class='expression'>" + historyData[key]["expression"] + "</span><br>";
        string += "<span class='result'>" + "= " + historyData[key]["result"] + "</span><br>";
    }

    for (let i = 0; i < log.length; i++) {
        log[i].innerHTML = string;
    }
}

function clearHistory() {
    historyData = []; 
    showHistory(); 
}
 