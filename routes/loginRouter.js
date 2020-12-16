const express = require('express');
const bodyParser = require('body-parser');
const db=require('../connection');
var authenticate = require('../authenticate');
const passport = require('passport');

const loginRouter=express.Router();
loginRouter.use(bodyParser.json());

loginRouter.post('/', (req,res) => {
    db.query("SELECT * from Shopkeeper where (email, password) =(?,?)",[req.body.email, req.body.password], (err, rows)=>{
        if(err) throw err;
        else if(!rows[0]){
            res.statusCode=401;
            res.send('Invalid login');
        }
        else {
            db.query("SELECT * from owns where (shopkeeper_id) =(?)",[rows[0].shopkeeper_id], (err, row)=>{
                if(err) throw err;
                res.send(row);
            })
        }
    })
})

module.exports= loginRouter;