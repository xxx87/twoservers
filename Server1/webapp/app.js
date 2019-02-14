let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let app = express();
let jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public"));
// получение списка данных
app.get("http://localhost/api/users", function(req, res){
    let content = fs.readFileSync(__dirname + "/users.json", "utf8");
    let users = JSON.parse(content);
    res.send(users);
});

let port = 3000;

app.listen(port, function(){
    console.log("Сервер ожидает подключения на порту: ", port);
});
