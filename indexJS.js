let numClicked = false;
let display = document.getElementById('display');

function handleNumClick(value){
    display.value += value;
    numClicked = true;
    enableOperatorButton();
}
function handleOperatorClick(value){
    if(numClicked){
        display.value += value;
        numClicked = false;
        disableOperatorButtons();
    }
}
function acButton(){
    display.value = '';
    disableOperatorButtons();
}
function equalButton(){
    if(display.value.trim() === ''){
        disableOperatorButtons();
    }
    else{
        display.value = eval(display.value)
    }
}
function enableOperatorButton(){
  const operatorButtons = document.querySelectorAll('.operator-button, .btn-equal');
  operatorButtons.forEach(button => {
    button.disabled = false;
  });  
}
function disableOperatorButtons(){
    const operatorButtons = document.querySelectorAll('.operator-button, .btn-equal');
    operatorButtons.forEach(button => {
        button.disabled = true;
    });
}