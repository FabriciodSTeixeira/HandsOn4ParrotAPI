import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import {AppDataSource} from "./data-source";


//Chamando e iniciando o DB
AppDataSource.initialize()
    .then(()=>{
        const app = express();

        //call middlewares
        app.use(bodyParser.json());


        //chamar as rotas da pasta router
        app.use("/",routes);

        app.listen(3033,()=>{
            console.log("Server started, running on port 3033");
        });
    })
    .catch((error)=> console.log(error))