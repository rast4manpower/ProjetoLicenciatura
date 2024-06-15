const express = require("express");
const app = express()

app.use(express.json());

const db = require("./models")


//routes 
const usersRouter = require("./routes/users");
app.use("/auth", usersRouter);

db.sequelize.sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Servidor iniciado na porta 3001.");
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });







//db.sequelize.sync().then(() => {
  //  app.listen(3001, () => {
     //   console.log("Servidor iniciado.");
   // });
//});





