const listElem = document.getElementById("guide");
const ref = (body) => {

const Elem = document.createElement("tr");
const idElem = document.createElement("td");
const nameElem = document.createElement("td");
const emailElem = document.createElement("td");
const phoneElem = document.createElement("td");
const butElem = document.createElement("td");
const editBut = document.createElement('button');
const delBut = document.createElement('button');

editBut.innerText = "Изменить";
editBut.className = "col-2 text-right btn btn-primary";
editBut.setAttribute("data-bs-toggle", "modal");
editBut.setAttribute("data-bs-target", "#editModal");

delBut.innerText = "Удалить";
delBut.className = "col-2 text-right btn btn-danger";

editBut.onclick = () => {
    ref();
}

delBut.onclick = () => {
    listElem.innerHTML = "";
}

butElem.append(editBut);
butElem.append(delBut);

idElem.innerText = body.id;
nameElem.innerText = body.name;
emailElem.innerText = "123";
phoneElem.innerText = "12345";

Elem.append(idElem);
Elem.append(nameElem);
Elem.append(emailElem);
Elem.append(phoneElem);
Elem.append(butElem);


listElem.append(Elem);};

ref({
    id: "283128",
    name: "Andrey"
});

//const url = "http://localhost:8080";
//const getGuide = () => {
//   return fetch(`${url}/guide`, {method: "GET", mode: 'no-cors'}).then((response) => response.json()).catch(() => []);
//}


/*
const getGuide = async () => {
    return fetch(`${url}/guide`, {
        method: "GET",
        mode: 'no-cors'
    })
        .then((response) => response.json())
        .catch(() => []);
}

console.log(getGuide());

getGuide()
    .then((response) => {
        var guides = response;
        console.log(guides);
    })
    .catch(() => {
        console.log('Error!');
    })
 */
