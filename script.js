
let n1
let n2
let op

const btn = document.querySelector(".digits");
const display = document.querySelector(".display");
const clearbtn = document.querySelector(".clear");
const eval = document.querySelector(".equal");

let countOp = 0;
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
    switch(op){
        case "+": return Number(n1)+Number(n2);
        case "-": return n1-n2;
        case "x": return n1*n2;
        case "/":
            if(n2==0) return `ERROR`;
            else return n1/n2;
        default: return `ERROR`;
    }
}
function equate(){
    countOp--;
    const s = display.value;
    let op, index;
    for (let i = 0; i < s.length; i++) {
        if (operators.includes(s[i])) {
            op = s[i];
            index = i;
            break;
        }
    }
    let n1 = s.slice(0, index);
    let n2 = s.slice(index + 1);

    let res =  operate(n1, n2, op);
    display.value = res;
    justCalculated = true;

}

btn.addEventListener('click', (e)=>{
    n1 = e.target.textContent;
    if(operators.includes(n1)) countOp++;
    else if(justCalculated){
        display.value = "";
        justCalculated = false;
    }
    if(countOp==2){
        equate();
    }
    if(operators.includes(n1)) justCalculated = false;
    display.value += n1;
})

clearbtn.addEventListener('click', () =>{
    display.value = ""
})

eval.addEventListener('click', equate);
