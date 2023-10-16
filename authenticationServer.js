/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const bodyParser = require("body-parser");
const express = require("express")
const fs=require('fs');
const PORT = 3000;
const app = express();
app.use(bodyParser.json())
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server
app.post('/signup',(req,resp)=>{
const obj=[{
  username:req.body[0].username,
  password:req.body[0].password,
  firstName:req.body[0].firstName,
  lastName:req.body[0].lastName
}];
fs.readFile('./db.txt','utf-8',(err,data)=>{
    if(err){
      resp.send(400);
    } else{
      if (data.length===0){
        fs.writeFile('./db.txt',JSON.stringify(obj),(err)=>{
          if(err){
            resp.status(400);
          } else{
            resp.send("DOne");
          }
        })
      } else{
      
      data=JSON.parse(data);
      let check=false;
      data.map((d)=>{
        if(d.username===obj[0].username){
          check=true;
        } 
      })
      if (check){
        resp.status(400).send("Id exists")
      } else{
      let newData=data;
      newData.push(obj[0]);
      fs.writeFile('./db.txt',JSON.stringify(newData),(err)=>{
        if(err){
          resp.status(400);
        } else{
          resp.send("DOne");
        }
      })
      }}}
})})

app.post('/login',(req,resp)=>{
  fs.readFile('./db.txt',(err,data)=>{
    if(err){
      resp.status(400).send("Error Reading File")
    } else{
        let returnObj={
          "auth":false,
          "token":req.body[0].username+req.body[0].password
        }
        data=JSON.parse(data);
        data.map((d)=>{
          if(d.username===req.body[0].username && d.password===req.body[0].password){
              returnObj.auth=true;
          }
        })
        if(returnObj.auth){
          resp.send(returnObj);
        } else{
          resp.send("gannd mara");
        }
    }
  })
})
app.get('/data',(req,resp)=>{
  fs.readFile('./db.txt',(err,data)=>{
    if(err){
      resp.status(400).send("Error Reading File")
    } else{
      resp.send(data);
    }
  })
})

app.all('*',(req,resp)=>{
  resp.send(404)
})
app.listen(PORT)

module.exports = app;
