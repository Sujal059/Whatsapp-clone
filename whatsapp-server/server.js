import dotenv from "dotenv";
import app from "./app.js";


//config dotenv
dotenv.config();


//env variables
const PORT = process.env.PORT || 9000;


//listen server
console.log(process.env.NODE_ENV);
app.listen(PORT, console.log(`Server is running on PORT ${PORT}...`));