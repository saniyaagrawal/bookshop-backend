const express= require('express');
const bodyParser =  require('body-parser');
var cors = require('cors');

var config = require('./config');

const loginRouter=require('./routes/loginRouter');
const signupRouter=require('./routes/signupRouter');
const bookRouter=require('./routes/bookRouter');
const addBookRouter=require('./routes/addBookRouter');
const billRouter=require('./routes/billRouter');

const app=express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/', bookRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/add', addBookRouter );
app.use('/bill', billRouter );

app.listen(3001, ()=>{
    console.log('Server running at localhost:3001');
});