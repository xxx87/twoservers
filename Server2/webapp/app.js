let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let app = express();
let jsonParser = bodyParser.json();
var cors = require('cors');
app.use(cors());
// app.use(express.static(__dirname + "/public"));
// получение списка данных
app.get("/api/users", function(req, res){
    let content = fs.readFileSync(__dirname + "/users.json", "utf8");
    let users = JSON.parse(content);
    console.log(users);
    res.send(users);
});
// отправка почты
app.get("/api/send", function(req, res){
    sendMail();
});
// получение одного пользователя по id
app.get("/api/users/:id", function(req, res){
    let id = req.params.id; // получаем id
    let content = fs.readFileSync(__dirname + "/users.json", "utf8");
    let users = JSON.parse(content);
    let user = null;
    // находим в массиве пользователя по id
    for(let i=0; i<users.length; i++){
        if(users[i].id === id){
            user = users[i];
            break;
        }
    }
    // отправляем пользователя
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send("NOT FOUNDS");
    }
});
// получение отправленных данных
app.post("/api/users", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    let userName = req.body.name;
    let userAge = req.body.age;
    let user = {name: userName, age: userAge};

    let data = fs.readFileSync(__dirname + "/users.json", "utf8");
    let users = JSON.parse(data);

    // находим максимальный id
    let id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    user.id = id+1;
    // добавляем пользователя в массив
    users.push(user);
    let data1 = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync(__dirname + "/users.json", data1);
    res.send(user);
});
 // удаление пользователя по id
app.delete("/api/users/:id", function(req, res){

    let id = req.params.id;
    let data = fs.readFileSync(__dirname + "/users.json", "utf8");
    let users = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(let i=0; i<users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        let user = users.splice(index, 1)[0];
        let data = JSON.stringify(users);
        fs.writeFileSync(__dirname + "/users.json", data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});
// изменение пользователя
app.put("/api/users", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);

    let userId = req.body.id;
    let userName = req.body.name;
    let userAge = req.body.age;

    let data = fs.readFileSync(__dirname + "/users.json", "utf8");
    let users = JSON.parse(data);
    let user;
    for(let i=0; i<users.length; i++){
        if(users[i].id === userId){
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(user){
        user.age = userAge;
        user.name = userName;
        let data = JSON.stringify(users);
        fs.writeFileSync(__dirname + "/users.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

let port = 80;

app.listen(port, function(){
    console.log("Сервер ожидает подключения на порту: ", port);
});
