const express = require('express')
const bodyParser = require('body-parser');
const db=require('../connection');

const bookRouter=express.Router();
bookRouter.use(bodyParser.json());

bookRouter.get('/', (req,res) => {
    db.query("SELECT * FROM BOOK", (err, rows, fields)=>{
        if(err) throw err;
        else {
            console.log('successful query');
            res.send(rows);
        }
    })
})
bookRouter.get('/:id', (req,res) => {
    db.query("SELECT * FROM BOOK where (book_id)=(?)",[req.params.id], (err, rows, fields)=>{
        if(err) throw err;
        else {
            res.send(rows[0]);
        }
    })
})

module.exports= bookRouter;