const url = "http://127.0.0.1:8080";
let guides = [];

const getGuide = () => {
    return fetch(`${url}/guide`, {method: "GET"}).then((res) => res.json()).catch(() => []);
}

const del = (id) => {
    return fetch(`${url}/guide?id=${id}`, {method: "DELETE"}).then((res) => res.json()).catch(() => []);
}

const post = (name, email, phone) => {
    console.log("start post");
    return fetch(`${url}/guide`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            name: name,
            email: email,
            phone: phone
        })
    }).then((res) => res.json()).catch(() => []);
}

const edit = (id, name, email, phone) => {
    return fetch(`${url}/guide?id=${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            name: name,
            email: email,
            phone: phone
        })
    }).then((res) => res.json()).catch(() => []);
}

const formElem = document.getElementById("form");
formElem.onsubmit = () => {
    console.log("click");
    const name = document.getElementById("fFIO").value;
    const email = document.getElementById("fEmail").value;
    const phone = document.getElementById("fPhone").value;
    const id = post(name, email, phone);
    console.log("end post");
    guides[id] = {
        name: name,
        email: email,
        phone: phone
    };
    console.log(guides);
    refresh();
    console.log("refresh done");
}

const editformElem = document.getElementById("editform");
editformElem.onsubmit = () => {
    const id = document.getElementById("editID").value;
    const name = document.getElementById("editFIO").value;
    const email = document.getElementById("editEmail").value;
    const phone = document.getElementById("editPhone").value;
    edit(id, name, email, phone);
    guides[id] = {
        name: name,
        email: email,
        phone: phone
    };
    refresh();
}

const createTable = (id, body) => {
    if (body !== null) {
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

        editBut.onclick = (id, name, email, phone) => {
            edit(id, name, email, phone);
            refresh();
        }

        delBut.onclick = () => {
            del(id);
            guides[id] = null;
            refresh();
        }

        butElem.append(editBut);
        butElem.append(delBut);

        idElem.innerText = id;
        nameElem.innerText = body.name;
        emailElem.innerText = body.email;
        phoneElem.innerText = body.phone;

        Elem.append(idElem);
        Elem.append(nameElem);
        Elem.append(emailElem);
        Elem.append(phoneElem);
        Elem.append(butElem);

        return Elem;
    }
    return "";
}

const refresh = () => {
    const listElem = document.getElementById("guide");
    listElem.innerHTML = "";

    for (let i=0; i<guides.length; i++) {
        listElem.append(createTable(i, guides[i]));
    }
}

getGuide().then((res) => {
    /*
    guides = [{
        name: "Andrey",
        email: "123",
        phone: "12345"
    }];
     */
    guides = res;

    console.log("get");
    console.log(guides);
    refresh();
}).catch(() => {
    console.log('err');
});