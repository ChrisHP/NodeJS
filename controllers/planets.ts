import {getPlanets,getPlanetByID,addPlanet,updatePlanet,deletePlanetByID} from '../repository/Planets.js';
import { Request,Response } from 'express';
import { Planet } from '../models/Planet.js';
const getAll =(req:Request,res:Response)=>{
    res.status(200).json(getPlanets())
}
const getOneById= (req:Request,res:Response)=>{
    const {id} =req.params;
    const planet=getPlanetByID(Number(id));
    res.status(200).json(planet)
}
const create=(req:Request,res:Response)=>{
    const {name}=req.body;
    const newPlanet:Partial<Planet>={name};
    const msg=addPlanet(newPlanet);
    res.status(201).json({msg});
}
const updateById=(req:Request,res:Response)=>{
    const {id}=req.params;
    const {name}=req.body;
    const msg=updatePlanet(Number(id),name)
    res.status(200).json({msg});
}
const deleteById=(req:Request,res:Response)=>{
    const {id}=req.params;
    const msg=deletePlanetByID(Number(id));
    res.status(200).json({msg});
}
export {getAll,
    getOneById,
    create,
    updateById,
    deleteById}