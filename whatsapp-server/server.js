import dotenv from "dotenv";
import app from "./app.js";
import logger from "./config/logger.config.js";


//config dotenv
dotenv.config();


//env variables
const PORT = process.env.PORT || 9000;


//listen server
logger.info(process.env.NODE_ENV);

let server;
server = app.listen(PORT, logger.info(`Server is running on PORT ${PORT}...`)); 



//handle server error

const exitHandler = ()=>{
    if(server){
        logger.info("Server closed.");
        process.exit(1);
    }else{
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error)=>{
    logger.error(error);
    exitHandler();
};
//know if we have error
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);


//SIGTERM
process.on("SIGTERM",()=>{
    if(server){
        logger.info("Server closed.");
        process.exit(1);
    }
})

