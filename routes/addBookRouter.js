const express = require('express')
const bodyParser = require('body-parser');
const db=require('../connection');

const addBookRouter=express.Router();
addBookRouter.use(bodyParser.json());

addBookRouter.post('/', (req,res) => {
    db.query("SELECT * FROM BOOK", (err, rows, fields)=>{
        if(err) throw err;
        else {
            console.log('successful query');
            res.send(rows);
        }
    })
})

module.exports= addBookRouter;