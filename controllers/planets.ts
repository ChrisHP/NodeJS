import {getPlanets,getPlanetByID,addPlanet,updatePlanet,deletePlanetByID} from '../repository/Planets.js';
import { Request,Response } from 'express';
import { Planet } from '../models/Planet.js';
const getAll =async(req:Request,res:Response)=>{
    const planets=await getPlanets()
    res.status(200).json(planets)
}
const getOneById= async (req:Request,res:Response)=>{
    const {id} =req.params;
    const planet=await getPlanetByID(Number(id));
    res.status(200).json(planet)
}
const create= async(req:Request,res:Response)=>{
    const {name}=req.body;
    const newPlanet:Partial<Planet>={name};
    const msg=await addPlanet(newPlanet);
    res.status(201).json({msg});
}
const updateById=async(req:Request,res:Response)=>{
    const {id}=req.params;
    const {name}=req.body;
    const msg=await updatePlanet(Number(id),name)
    res.status(200).json({msg});
}
const deleteById=async(req:Request,res:Response)=>{
    const {id}=req.params;
    const msg=await deletePlanetByID(Number(id));
    res.status(200).json({msg});
}
export {getAll,
    getOneById,
    create,
    updateById,
    deleteById}