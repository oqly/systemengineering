const http = require("http");
const url = require('url');

let guide = [];
let last_id = 0;

const requestListener = function (req, res) {
    let ur = url.parse(req.url);
    let path = ur.pathname.slice(1).split("/");

    /*
    if (ur.query !== null) {
        var searchParams = new URLSearchParams(ur.query);

        for (let p of searchParams) {
            console.log(p);
        }
        console.log(searchParams.get("name"));

        var id = searchParams.get("id");
    }
    if (path[0] !== "guide") {
        res.statusCode = 400;
        res.end("Bad request");
    }
    else {
        res.setHeader("Content-Type", "application/json");
        switch (req.method) {
            case "GET": get(id, res); break;
            case "POST": post(searchParams, res); break;
            case "PUT": put(id, searchParams, res); break;
            case "DELETE": del(id, res); break;
            default: res.end(); return;
        }
    }
    */

    if (ur.query !== null){
        let quer = ur.query.split("=");
        if (quer[0] === "id") {
            var id = quer[1];
        }
    }
    if (path[0] !== "guide") {
        res.statusCode = 400;
        res.end("Bad request");
    }
    else {
        res.setHeader("Content-Type", "application/json");
        switch (req.method) {
            case "GET": get(id, res); break;
            case "POST": post(req, res); break;
            case "PUT": put(id, req, res); break;
            case "DELETE": del(id, res); break;
            default: res.end(); return;
        }
    }

}

function get(id, res) {
    if (id !== undefined) {
        if (id !== "null") {
            if (guide[id] !== undefined) {
                res.statusCode = 200;
                res.end(JSON.stringify(guide[id]));
            }
            else {
                res.statusCode = 400;
                res.end("Bad request 2");
            }
        }
    }
    else {
        getAll(res);
    }
}

function getAll(res) {
    console.log("getAll done");
    res.statusCode = 200;
    res.end(JSON.stringify(guide));
}

function post(req, res) {
    let body = "";
    let idnew = last_id++;

    req.on("data", (data) => {
        body += data;
    });
    req.on("end", ()=>{
        /*guide.push(JSON.parse(body));*/
        guide[idnew] = JSON.parse(body);
    });
    console.log(guide);
    res.statusCode = 200;
    res.end(JSON.stringify(idnew));
}

function put(id, req, res) {
    if (guide[id] !== undefined) {
        let body = "";
        req.on("data", (data) => {
            body += data;
        });
        req.on("end", ()=>{
            guide[id] = (JSON.parse(body));
        });
        res.statusCode = 200;
        const done = {"status": "done"};
        res.end(JSON.stringify(done));
    }
    else {
        res.statusCode = 400;
        res.end("Bad request");
    }
}

function del(id, res) {
    if (guide[id] !== undefined) {
        guide[id] = null;
        res.statusCode = 200;
        const done = {"status": "done", "idremove": id};
        res.end(JSON.stringify(done));
    }
    else {
        res.statusCode = 400;
        res.end("Bad request");
    }
}

const server = http.createServer(requestListener);
server.listen(8080);