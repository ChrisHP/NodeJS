import 'dotenv/config'
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { Planet,Planets } from './models/Planet';
import { planets } from './repository/Planets';

const app = express();
const port =process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());

app.listen(port,()=>{
    console.log(`Example port: http://localhost:${port}`)
})

