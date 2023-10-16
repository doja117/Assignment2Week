import bodyParser from "body-parser";
import express,{Request,Response} from "express";
import fs from 'fs';
const app=express();
const port=3000;
let stringarr:Object[]=[]
app.use(bodyParser.json());
app.get('/',(req:Request,resp:Response)=>{
    resp.send("Test")
})
app.post('/signup',(req:Request,resp:Response)=>{

    fs.readFile('./db.txt','utf-8',(err:any,data:Object[])=>{
        if(err){
            resp.send(401);
        } else{
            data=JSON.parse(data);
            for(let i=0;i<data.length;i++){
                if (data[i].username===obj[0].username){
                    resp.send(400);
                }
            }
            stringarr.push(obj[0]);
            
            fs.writeFile('./db.txt',JSON.stringify(stringarr),(err:any)=>{
                if(err){
                    resp.send(401);
                } else{
                    resp.status(200).send("Done")
                }
            })
        }
    })
    //stringarr.push(obj);
    
    
})

app.listen(3000);

