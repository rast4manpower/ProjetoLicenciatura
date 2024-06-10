const express = require("express");
const mysql = require("mysql");


//Opcoes de conexao com o MySQl
const connection = mysql.createConnection({
     host : "localhost",
     user: "root",
     password: "",
     database: ""
});


const app = new express();
app.listen(3000, () =>{
    console.log("Servidor iniciado.");
})

//rotas
app.get("/",(req, res) => {
    //res.send("Ola Mundo");
    connection.query("")


})


