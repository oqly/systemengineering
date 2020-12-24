function insert(elem) {
    let str = document.getElementById("strinp");
    if (!(elem === "0" && str.value === "")) {
        str.value += elem;
    }
}

function op(value) {
    let str = document.getElementById("strinp");
    if (str.value === "" || str.value.indexOf("+") !== -1 || str.value.indexOf("-") !== -1 || str.value.indexOf("*") !== -1 || str.value.indexOf("/") !== -1) return;
    str.value += value;
}

function clean() {
    let str = document.getElementById("strinp");
    str.value = "";
}

function ravno() {
    let str = document.getElementById("strinp");
    if (eval(str.value) !== Infinity) {
        str.value = eval(str.value);
    }
    else {
        alert("Нельзя делить на ноль");
    }
}