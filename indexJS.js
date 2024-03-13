const buttons = document.querySelectorAll('.calculator input[type="button"]');
const display_input = document.querySelector('.screen .input');
const display_output = document.querySelector('.screen .output');
const revSign = document.getElementById('rev-sign');
const sQr = document.getElementById('square');
const sQrt = document.getElementById('square-root');
const numberxzy = document.getElementsByClassName('btn-number');
const operatorxzy = document.getElementsByClassName('operator-button');
const dotButton = document.querySelector('.operator-button[value="."]');

let numClicked = false;
let dotClicked = false;

let input = "";

for (let btn of buttons) {
    const value = btn.value;

    if (value !== "+/-") {
        btn.addEventListener('click', () => {
            if (value === "AC") {
                input = "";
                display_input.innerHTML = "";
                display_output.innerHTML = "";
                disableOperatorButtons();
            } else if (value === "DEL") {
                input = input.slice(0, -1);
                display_input.innerHTML = input;
                if(input === ''){
                    disableOperatorButtons();
                }
            } else if (value === "=") {
                let processedInput = input.replace(/×/g, "*").replace(/÷/g, "/");
                let result = eval(perC(processedInput));
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
    display_input.innerHTML = input;
    display_output.innerHTML = result;
}
sQr.addEventListener('click', sQ);

function sqrt() {
    const inputNumber = parseFloat(input);
    const result = Math.sqrt(inputNumber);
    input = `√(${inputNumber})`;
    display_input.innerHTML = input;
    display_output.innerHTML = result;
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