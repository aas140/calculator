
let n1
let n2
let op

const btn = document.querySelector(".digits");
const display = document.querySelector(".display");
const clearbtn = document.querySelector(".clear");
const eval = document.querySelector(".equal");
const del = document.querySelector(".delete");

let countOp = 0;
let countPoint = 0;
let justCalculated = false;
let operators = ["+", "-", "x", "/"];

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function division(a,b){
    return a/b;
}

function operate(n1, n2, op){
    n1 = Number(n1); n2 = Number(n2);
    let res;
    switch(op){
        case "+":
            res = n1+n2;
            break;
        case "-":
            res = n1-n2;
            break;
        case "x":
            res = n1*n2;
            break;
        case "/":
            if(n2==0) return `ERROR`;
            else res = n1/n2;
            break;
        default: return `ERROR`;
    }
    return parseFloat(res.toFixed(10));

}
function equate(){
    justCalculated = true;
    const s = display.value;
    if(s=="") return;
    let op, index = 0;
    for (let i = 0; i < s.length; i++) {
        if (operators.includes(s[i])) {
            op = s[i];
            index = i;
            break;
        }
    }
    if(index == 0){
        display.value = Number(display.value);
        return;
    }
    let n1 = s.slice(0, index);
    let n2 = s.slice(index + 1);

    let res =  operate(n1, n2, op);
    display.value = res;
    countOp--;

}

function keyfunction(k){
    if(k==".") countPoint++;
    if(countPoint>1) return;
    if(operators.includes(k)){ countOp++; countPoint=0;}
    else if(justCalculated){
        display.value = "";
        justCalculated = false;
    }
    if(countOp==2){
        equate();
    }
    if(operators.includes(k)) justCalculated = false;
    if((operators.includes(k) || k==".") && display.value=="") display.value = "0"+k;
    else display.value += k;

}

btn.addEventListener('click', (e)=>{
    n1 = e.target.textContent;
    keyfunction(n1);
    
})

clearbtn.addEventListener('click', () =>{
    display.value = ""
})

eval.addEventListener('click', equate);

del.addEventListener('click', undo);

document.addEventListener("keydown", (e) => {
    let str = "0123456789.";
    if(str.includes(e.key) || operators.includes(e.key)) keyfunction(e.key);
    else if(e.key == "Backspace") undo();
    else if(e.key == "=") equate();
})

function undo(){
    let s = display.value;
    s = s.slice(0, -1);
    display.value = s;
}