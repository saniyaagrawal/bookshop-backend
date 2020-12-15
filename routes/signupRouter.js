const express = require('express')
const bodyParser = require('body-parser');
const db=require('../connection');

const signupRouter=express.Router();
signupRouter.use(bodyParser.json());

signupRouter.post('/', (req,res) => {
    db.query('INSERT INTO Shopkeeper(name,email,mobile_no,password) VALUES (?,?,?,?)',[req.body.name,req.body.email ,req.body.mobile_no ,req.body.password], (err, rows)=>{
        if(err) throw err;
        var shopkeeper_id=rows.insertId;
        db.query("INSERT INTO Owns(store_id,shopkeeper_id) VALUES (?,?)",[req.body.store_id,shopkeeper_id], (err, rows)=>{
            if(err) throw err;
            else {
                console.log('successful query');
                // console.log(rows);
                res.send(rows);
            }
        })
    })
})

module.exports= signupRouter;