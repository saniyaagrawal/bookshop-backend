const express = require('express')
const bodyParser = require('body-parser');
const db=require('../connection');

const addBookRouter=express.Router();
addBookRouter.use(bodyParser.json());

addBookRouter.post('/', (req,res) => {
    db.query("INSERT INTO bookshop.book(name, store_id ,price ,genre ,description ,quantityPurchase ,quantityIssue,shelf_number,author ) VALUES (?,?,?,?,?,?,?,?,?)",[req.body.name, req.body.store_id ,req.body.price ,req.body.genre ,req.body.description ,req.body.quantityPurchase ,req.body.quantityIssue,req.body.shelf_number,req.body.author], (err, rows, fields)=>{
        if(err) throw err;
        else {
            console.log('successful query');
            res.send(rows);
        }
    })
})

module.exports= addBookRouter;