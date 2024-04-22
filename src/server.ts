import 'dotenv/config'
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { Planet } from '../models/Planet.js';
import {getPlanets,getPlanetByID,addPlanet,updatePlanet,deletePlanetByID} from '../repository/Planets.js';

const app = express();
const port =process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
app.get('/api/planets',(req,res)=>{
    res.status(200).json(getPlanets())
});
app.get('/api/planets/:id',(req,res)=>{
    const {id} =req.params;
    const planet=getPlanetByID(Number(id));
    res.status(200).json(planet)
});
app.post('/api/planets',(req,res)=>{
    const {name}=req.body;
    const newPlanet:Partial<Planet>={name};
    const msg=addPlanet(newPlanet);
    res.status(201).json({msg});
});
app.put('/api/planets/:id',(req,res)=>{
    const {id}=req.params;
    const {name}=req.body;
    const msg=updatePlanet(Number(id),name)
    res.status(200).json({msg});
});
app.delete('/api/planets/:id',(req,res)=>{
    const {id}=req.params;
    const msg=deletePlanetByID(Number(id));
    res.status(200).json({msg});
});
app.listen(port,()=>{
    console.log(`Example port: http://localhost:${port}`)
})

