const express= require('express');
const bodyParser =  require('body-parser');

const bookRouter=require('./routes/bookRouter');
const addBookRouter=require('./routes/addBookRouter');
const billRouter=require('./routes/billRouter');

const app=express();
app.use(bodyParser.json());

app.use('/', bookRouter);
app.use('/add', addBookRouter );
app.use('/bill', billRouter );

app.listen(3000, ()=>{
    console.log('Server running at localhost:3000');
});