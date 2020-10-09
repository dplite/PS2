const express=require('express');
const app=express();
const morgan=require('morgan');
const mongoose=require('mongoose');



const productsRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');
/*
mongodb+srv://node-shop:<password>@cluster0.e0xkf.mongodb.net/<dbname>?retryWrites=true&w=majority
*/
mongoose.connect('mongodb://localhost:27017/User',{ useNewUrlParser: true ,useUnifiedTopology: true })


app.use(morgan('dev'));
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });
  

//routes that handle req
app.use('/products',productsRoutes);
app.use('/orders',orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports=app;