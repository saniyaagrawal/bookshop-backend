const express = require('express')
const bodyParser = require('body-parser');
const db=require('../connection');

const signupRouter=express.Router();
signupRouter.use(bodyParser.json());

signupRouter.post('/', (req,res) => {
    db.query("SELECT * FROM BOOK", (err, rows, fields)=>{
        if(err) throw err;
        else {
            console.log('successful query');
            // console.log(rows);
            res.send(rows);
        }
    })
})

module.exports= signupRouter;