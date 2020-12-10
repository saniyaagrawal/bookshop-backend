const express= require('express');
const bodyParser =  require('body-parser');

const bookRouter=require('./routes/bookRouter');
const addBookRouter=require('./routes/addBookRouter');
const billRouter=require('./routes/billRouter');

const app=express();
app.use(bodyParser.json());

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

app.use(express.static(path.join(_dirname, 'public')));

app.use('/', bookRouter);
app.use('/login', bookRouter);
app.use('/signup', bookRouter);
app.use('/add', addBookRouter );
app.use('/bill', billRouter );

app.listen(3000, ()=>{
    console.log('Server running at localhost:3000');
});