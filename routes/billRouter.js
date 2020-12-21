const express = require('express')
const bodyParser = require('body-parser');
const db=require('../connection');

const billRouter=express.Router();
billRouter.use(bodyParser.json());

billRouter.post('/', (req,res) => {
    db.query("Select * from Customer where (mobile_no) = (?)", [req.body.customer.mobile_no],(err,rows, fields)=>{
        if(err)throw err;
        // console.log(rows[0].customer_id);
        // res.send(rows);
        var customer_id="1";
        if(rows.length>0){
            customer_id=rows[0].customer_id;
            if(req.body.type.toLowerCase().includes('purc')){
                db.query("INSERT INTO bill(amount_to_pay,createdAt) VALUES (?,?)",[req.body.total,req.body.time] , (err, row2, fields)=>{
                    if(err) throw err;
                    var bill_id=row2.insertId;
                    db.query("INSERT INTO belongs(bill_id,customer_id) VALUES (?,?)",[bill_id,customer_id] , (err, row3, fields)=>{
                        if(err) throw err;
                        db.query("INSERT INTO generate_from(bill_id, store_id) VALUES (?,?)",[bill_id,req.body.store_id]  , (err, row4, fields)=>{
                            if(err) throw err;
                            // Array for book_bought table
                            // change for qunatity in book table
                            for(let i of req.body.books){
                                // console.log(i);
                                if(i.book_id!=null && i.quantity!=null){
                                    db.query("INSERT INTO book_bought(bill_id, book_id, quantity) VALUES (?,?,?)", [bill_id, i.book_id, i.quantity]  , (err, row5, fields)=>{
                                        if(err) throw err;
                                        db.query("UPDATE book SET quantityPurchase =(quantityPurchase-?) where (book_id)=(?)",[i.quantity,i.book_id], (err, row6, fields)=>{
                                            if(err) throw err;
                                            else res.send(row6);
                                        })
                                    })
                                }
                            }
                        })
                    })
                })
            }
            else if(req.body.type.toLowerCase().includes('issu')){
                // loop array for issued table
                // change for qunatity in book table
                for(let i of req.body.books){
                    // console.log(i);
                    db.query("INSERT INTO Issued(customer_id, book_id,security_money) VALUES (?,?,?)",[customer_id, i.book_id, i.security_money] , (err, row5, fields)=>{
                        if(err) throw err;
                        db.query("UPDATE book SET quantityIssue =(quantityIssue-1) where (book_id)=(?)",[i.book_id], (err, row6, fields)=>{
                            if(err) throw err;
                            else res.send(row5);
                        })
                    })
                }
            }
            else if(req.body.type.toLowerCase().includes('return')){
                // loop array for issued table
                // change for qunatity in book table
                for(let i of req.body.books){
                    db.query("DELETE FROM issued WHERE (customer_id,book_id) =(?,?)",[i.customer_id,i.book_id] , (err, row5, fields)=>{
                        if(err) throw err;
                        db.query("UPDATE book SET quantityIssue =(quantityIssue+1) where (book_id)=(?)",[i.book_id], (err, row6, fields)=>{
                            if(err) throw err;
                            else res.send(row6);
                        })
                    })
                }
            }
        }
        else{
            db.query("INSERT INTO Customer(name,mobile_no,email_id) VALUES (?,?,?)",[req.body.customer.name,req.body.customer.mobile_no,req.body.customer.email_id], (err, row1, fields)=>{
                if(err) throw err;
                customer_id=row1.insertId;
                if(req.body.type.toLowerCase().includes('purc')){
                    db.query("INSERT INTO bill(amount_to_pay,createdAt) VALUES (?,?)",[req.body.total,req.body.time] , (err, row2, fields)=>{
                        if(err) throw err;
                        var bill_id=row2.insertId;
                        db.query("INSERT INTO belongs(bill_id,customer_id) VALUES (?,?)",[bill_id,customer_id] , (err, row3, fields)=>{
                            if(err) throw err;
                            db.query("INSERT INTO generate_from(bill_id, store_id) VALUES (?,?)",[bill_id,req.body.store_id]  , (err, row4, fields)=>{
                                if(err) throw err;
                                // Array for book_bought table
                                // change for qunatity in book table
                                for(let i of req.body.books){
                                    // console.log(i);
                                    db.query("INSERT INTO book_bought(bill_id, book_id, quantity) VALUES (?,?,?)",
                                    [bill_id, i.book_id, i.quantity]  , (err, row5, fields)=>{
                                        if(err) throw err;
                                        db.query("UPDATE book SET quantityPurchase =(quantityPurchase-?) where (book_id)=(?)",[i.quantity,i.book_id], (err, row6, fields)=>{
                                            if(err) throw err;
                                            else res.send(row6);
                                        })
                                    })
                                }
                            })
                        })
                    })
                }
                else if(req.body.type.toLowerCase().includes('issu')){
                    // loop array for issued table
                    // change for qunatity in book table
                    for(let i of req.body.books){
                        // console.log(i);
                        db.query("INSERT INTO Issued(customer_id, book_id,security_money) VALUES (?,?,?)",[customer_id, i.book_id, i.security_money] , (err, row5, fields)=>{
                            if(err) throw err;
                            db.query("UPDATE book SET quantityIssue =(quantityIssue-1) where (book_id)=(?)",[i.book_id], (err, row6, fields)=>{
                                if(err) throw err;
                                else res.send(row5);
                            })
                        })
                    }
                }
                else if(req.body.type.toLowerCase().includes('return')){
                    // loop array for issued table
                    // change for qunatity in book table
                    for(let i of req.body.books){
                        db.query("DELETE FROM issued WHERE (customer_id,book_id) =(?,?)",[i.customer_id,i.book_id] , (err, row5, fields)=>{
                            if(err) throw err;
                            db.query("UPDATE book SET quantityIssue =(quantityIssue+1) where (book_id)=(?)",[i.book_id], (err, row6, fields)=>{
                                if(err) throw err;
                                else res.send(row6);
                            })
                        })
                    }
                }
            })
        }
    })
})

module.exports= billRouter;