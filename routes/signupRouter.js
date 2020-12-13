const express = require('express')
const bodyParser = require('body-parser');
const db=require('../connection');

const signupRouter=express.Router();
signupRouter.use(bodyParser.json());

signupRouter.post('/', (req,res) => {
    db.query("INSERT INTO Shopkeeper (name, email, password) VALUES (?,?,?)",[req.body.name, req.body.email, req.body.password], (err, rows)=>{
        if(err) throw err;
        else {
            console.log('successful query');
            // console.log(rows);
            res.send(rows);
        }
    })
})

module.exports= signupRouter;