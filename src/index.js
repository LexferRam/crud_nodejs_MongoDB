const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//DB connection
mongoose.connect('mongodb+srv://lx_user:lfrp5894@cluster0-gsagn.mongodb.net/crud_Practica?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(db => console.log('DB connnecteed'))
    .catch(err => console.log(err));


//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Routes
app.use('/', require('./routes/taskRoutes'));

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});