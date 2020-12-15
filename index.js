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

// function auth (req, res, next) {
//     console.log(req.headers);
//     var authHeader = req.headers.authorization;
//     if (!authHeader) {
//         var err = new Error('You are not authenticated!');
//         res.setHeader('WWW-Authenticate', 'Basic');
//         err.status = 401;
//         next(err);
//         return;
//     }
  
//     var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//     var user = auth[0];
//     var pass = auth[1];
//     if (user == 'admin' && pass == 'password') {
//         next(); // authorized
//     } else {
//         var err = new Error('You are not authenticated!');
//         res.setHeader('WWW-Authenticate', 'Basic');      
//         err.status = 401;
//         next(err);
//     }
//   }

// app.use(auth);

// app.use(express.static(path.join(_dirname, 'public')));

app.use('/', bookRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/add', addBookRouter );
app.use('/bill', billRouter );

app.listen(3001, ()=>{
    console.log('Server running at localhost:3001');
});