
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

btn.addEventListener('click', (e)=>{
    n1 = e.target.textContent;
    if(n1==".") countPoint++;
    if(countPoint>1) return;
    if(operators.includes(n1)){ countOp++; countPoint=0;}
    else if(justCalculated){
        display.value = "";
        justCalculated = false;
    }
    if(countOp==2){
        equate();
    }
    if(operators.includes(n1)) justCalculated = false;
    if((operators.includes(n1) || n1==".") && display.value=="") display.value = "0"+n1;
    else display.value += n1;
})

clearbtn.addEventListener('click', () =>{
    display.value = ""
})

eval.addEventListener('click', equate);

del.addEventListener('click', ()=>{
    let s = display.value;
    s = s.slice(0, -1);
    display.value = s;
})
