import fs from 'fs'
fs.readFile('./db.txt','utf-8',(err:any,data:any)=>{
    if(err){console.log('Errror')}
    else{
        const json = JSON.stringify(data);
        console.log(json);
    }
})