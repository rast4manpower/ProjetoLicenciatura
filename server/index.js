const express = require("express");
const app = express()

const db = require("./models")

//Routers
const userRouter = require('./routes/users')
app.use("/users", userRouter);




db.sequelize.sync().then(() => {
    app.listen(3001, () =>{
        console.log("Servidor iniciado.");
    });
});





