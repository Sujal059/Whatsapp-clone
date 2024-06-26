import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from 'cors';
import createHttpError from 'http-errors';
import routes from './routes/index.js';

//create express app 
const app = express();


//Middleware
//morgan
if(process.env.NODE_DEV!=="production"){
    app.use(morgan("dev"));
}

//helmet
app.use(helmet());

//parse json request body
app.use(express.json());

//parse json request url
app.use(express.urlencoded({extended: true}));

//sanitize request data
app.use(ExpressMongoSanitize());

//enable cookie-parser
app.use(cookieParser());

//gizb compression
app.use(compression());

//file-upload
app.use(fileUpload({
    useTempFiles: true,
}));

//cors
// app.use(cors({
//     origin:'http://localhost:8000',    //use to set which url can access the backend
// }))
app.use(cors());



//Routes- api/v1
app.use('/api/v1', routes);






app.use(async(req, res, next)=>{
    next(createHttpError.NotFound("This route does not exists."));
})

//error handler
app.use(async(err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status: err.status || 500,
            message: err.message,
        }
    })
})


//routes
app.get("/",(req,res)=>{
    res.send("hello from server"); 
})


export default app;