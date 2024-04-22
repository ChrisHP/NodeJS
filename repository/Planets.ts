import { Planet, Planets } from "../models/Planet";
import Joi from "joi";
import pgPromise from "pg-promise";
const db = pgPromise()(
  `postgres://${process.env.DBUSER}:${process.env.DBPASSWORD}@LOCALHOST:5432/planetsDB`
);

const setupDB = async () => {
  await db.none(`
        drop table if exists planets;
        create table planets (
            id serial not null primary key,
            name text not null
        );
    `);
  await db.none(`insert into planets (name) values ('Earth')`);
  await db.none(`insert into planets (name) values ('Mars')`);
  await db.none(`insert into planets (name) values ('Jupiter')`);
  const planets = await db.manyOrNone(`select * from planets`);
  console.log(planets);
};
setupDB();
const planetSchema = Joi.object({
  name: Joi.string().alphanum().required(),
});

const getPlanets = async () => {
  const planets = await db.many(`select * from planets`);
  console.log(planets);
  return planets;
};
const getPlanetByID = async (id: Number) => {
  const planet = await db.oneOrNone(`select * from planets where id=$1`, id);
  console.log(planet);
  return planet;
};
const addPlanet = async (np: Partial<Planet>): Promise<string> => {
  if (!np.name) {
    return "Planet couldn't be created";
  }
  const { value, error } = planetSchema.validate(np);
  console.log(`value: ${value}`);
  if (error) {
    return error.message;
  }

  await db.none(`insert into planets (name) values ($1)`, np.name);
  const planets = await db.manyOrNone(`select * from planets`);

  console.log(planets);
  return "Planet created";
};
const updatePlanet = async (id: number, name: string): Promise<string> => {
  if(!name){
    return "Fields cannot be empty";
  }
  await db.none(`update planets set name=$1 where id=$2`, [name,id]);
  const planets = await db.manyOrNone(`select * from planets`);

  console.log(planets);
  return "Planet updated";
};
const deletePlanetByID=async (id: number): Promise<string> =>{
    await db.none(`delete from planets where id=$1`, id);
    const planets = await db.manyOrNone(`select * from planets`);

    console.log(planets);
  return "Planet deleted";
}
export { getPlanets, getPlanetByID, addPlanet, updatePlanet, deletePlanetByID };
