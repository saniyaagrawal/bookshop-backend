const express = require('express')
const bodyParser = require('body-parser');
// const db=require('./connection');

const billRouter=express.Router();
billRouter.use(bodyParser.json());

billRouter.post('/', (req,res) => {
    
})

module.exports= billRouter;