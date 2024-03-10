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
function enableOperatorButton(){
  const operatorButtons = document.querySelectorAll('.operator-button');
  operatorButtons.forEach(button => {
    button.disabled = false;
  });  
}
function disableOperatorButtons(){
    const operatorButtons = document.querySelectorAll('.operator-button');
    operatorButtons.forEach(button => {
        button.disabled = true;
    });
}