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
            console.log(rows);
            res.send(rows);
        }
    })
})

// bookRouter.put('/', (req,res) => {
//     db.query("DELETE * FROM BOOK WHERE", (err, rows, fields)=>{
//         if(err) throw err;
//         else {
//             console.log('successful query');
//             console.log(rows);
//             res.send(rows);
//         }
//     })
// })


module.exports= bookRouter;