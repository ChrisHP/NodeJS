import 'dotenv/config'
import express from "express";
import "express-async-errors";
import morgan from "morgan";

const app = express();
const port =process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
type Planet={
    id:number;
    name:string;
}
let planets: Planet[]=[
    {id:1,name:"earth"},
    {id:2, name:"mars"}
]
app.get('/api/planets',(req,res)=>{
    res.status(200).json(planets)
});
app.get('/api/planets/:id',(req,res)=>{
    const {id} =req.params;
    const planet=planets.find(planet=>planet.id===Number(id))
    res.status(200).json(planet)
});
app.post('/api/planets',(req,res)=>{
    const {id,name}=req.body;
    const newPlanet:Planet={id,name};
    planets=[...planets,newPlanet];
    res.status(201).json({msg:"Planet created"});
});
app.put('/api/planets/:id',(req,res)=>{
    const {id}=req.params;
    const {name}=req.body;
    planets=planets.map(p=>p.id===Number(id) ? {...p,name} : p);

    res.status(200).json({msg:"Planet modified"});
});
app.delete('/api/planets/:id',(req,res)=>{
    const {id}=req.params;
    planets=planets.filter(p=>p.id!==Number(id));

    res.status(200).json({msg:"Planet deleted"});
});
app.listen(port,()=>{
    console.log(`Example port: http://localhost:${port}`)
})

