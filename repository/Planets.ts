import { Planet, Planets } from "../models/Planet";
import Joi from "joi";
const planet =Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().alphanum().required()
});
let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];
export function getPlanets():Planets{
    return planets;
}
export function getPlanetByID(id:Number):Planet|undefined{
    const planet=planets.find(planet=>planet.id===Number(id));
    return planet;
}
export function addPlanet(np:Partial<Planet>):string{
    if(!np.name){
        return "Planet couldn't be created";
    }
    const newPlanet:Planet={id:planets[planets.length-1].id+1,name:np.name}
    const {value, error}=planet.validate(newPlanet);
    console.log(`value: ${value}`);
    if(value){
        planets.push(newPlanet);
    }

    console.log(planets);
    return "Planet created";
}
export function updatePlanet(id:number,name:string):string{
    if(name){
        planets=planets.map(p=>p.id===Number(id) ? {...p,name} : p);
    }
    console.log(planets);
    return "Planet updated";
}
export function deletePlanetByID(id:number):string{
    planets=planets.filter(p=>p.id!==Number(id));
    console.log(planets);
    return "Planet deleted";
}

