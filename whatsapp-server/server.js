import dotenv from "dotenv";
import app from "./app.js";
import logger from "./config/logger.config.js";
import mongoose from "mongoose";


//config dotenv
dotenv.config();


//env variables
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 9000;


//mongodb connect
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,      //to accept all urls
    useUnifiedTopology: true,
}).then(()=>{
    logger.info("DB connected");
})

//listen to error and exit
mongoose.connection.on('error', (err)=>{
    logger.error(`MOngoDB connection error: ${err.message}`);
    process.exit(1);
})

//mongodb debug mode
if(process.env.NODE_ENV!=="production"){
    mongoose.set("debug", true);
}



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

