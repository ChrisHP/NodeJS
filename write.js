import * as fs from "node:fs"

fs.writeFile("./text.txt", "This is the new text",{encoding: "utf-8"},(error)=>{
  if(error){
    console.error(error);
    return;
  }
  console.log("file has succesfully been written");
});