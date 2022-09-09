import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import {AppDataSource} from "./database/data-source";
import * as cors from "cors";
import helmet from "helmet";


//Chamando e iniciando o DB
AppDataSource.initialize()
.then(()=>{
    const app = express();

        //call middlewares
        app.use(bodyParser.json());
        app.use(cors());
        app.use(helmet());

        //chamar as rotas da pasta router
        app.use("/",routes);

        const port = process.env.PORT || 3033;

        app.listen(port,()=>{
            console.log(`Server started, running on port ${port}`);
        });
    })
    .catch((error)=> console.log(error))
