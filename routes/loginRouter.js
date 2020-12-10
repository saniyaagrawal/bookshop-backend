const express = require('express')
const bodyParser = require('body-parser');
const db=require('../connection');

const loginRouter=express.Router();
loginRouter.use(bodyParser.json());

loginRouter.post('/', (req,res) => {
    db.query("SELECT * FROM BOOK", (err, rows, fields)=>{
        if(err) throw err;
        else {
            console.log('successful login');
        }
    })
})

module.exports= loginRouter;