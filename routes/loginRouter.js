const express = require('express');
const bodyParser = require('body-parser');
const db=require('../connection');
var authenticate = require('../authenticate');
const passport = require('passport');

const loginRouter=express.Router();
loginRouter.use(bodyParser.json());

loginRouter.get('/', (req,res) => {
    db.query("SELECT email, password from Shopkeeper where (email, password) =(?,?)",[req.body.email, req.body.password], (err, rows)=>{
        if(err) throw err;
        else {
            console.log('successful query');
            // console.log(rows);
            res.send(rows);
        }
    })
})

module.exports= loginRouter;