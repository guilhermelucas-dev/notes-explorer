require("express-async-errors");
require("dotenv/config");

const uploadConfig = require("./configs/upload");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");


const cors = require("cors");
// importando o módulo exress, que é uma função que cira uma instância do Express
const express = require('express');

//const {usersRoutes} = require("./routes/users.routes")
const routes = require("./routes");

migrationsRun();

// chama a função express e atribui o resultado à variáves app. A variável app é um objeto que representa a aplicação web e que tem varios métodos  para configurar e executar a aplicação
const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);



app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error", 
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  });

});

// nome da porta
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

