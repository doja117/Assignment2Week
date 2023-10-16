import express,{Request,Response} from 'express';
import fs from 'fs';
const app=express();

app.get('/',(req:Request,resp:Response)=>{resp.send("Testing")})
app.get('/files',(req:Request,resp:Response)=>{
    fs.readdir(__dirname+'/files',(err: any,data:string[])=>{
        if (err){
            resp.send("error"+err);
        } else{
            resp.json(data);
        }
    })
})

app.get('/files/:filename',(req:Request,resp:Response)=>{
    fs.readdir(__dirname+'/files',(err: any,data:string[])=>{
        if (err){
            resp.send("error"+err);
        } else{
            console.log(__dirname+'/files/'+req.params.filename);
            fs.readFile(__dirname+'/files/'+req.params.filename,'utf-8',(err:any,data:string)=>{
                if(err){
                    resp.send(404);
                } else{
                    resp.send(data);
                }
            })
        }
    })
})

app.all('*',(req:Request,resp:Response)=>{
    resp.send(404)
})


app.listen(3000,()=>{console.log('listening on port ',3000)});