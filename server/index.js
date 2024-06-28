const express = require("express");
const app = express()
const cors = require("cors");

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(express.json());
app.use(cors(corsOptions));

const db = require("./models")


//routes 
const usersRouter = require("./routes/users");
app.use("/auth", usersRouter);

const productsRouter = require("./routes/products")
app.use("/products", productsRouter );


db.sequelize.sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Servidor iniciado na porta 3001.");
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });











