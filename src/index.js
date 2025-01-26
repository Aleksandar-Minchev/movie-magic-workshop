import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import routes from './routes.js';
import showRating from './helpers/ratingHelper.js';



const app = express();

//db config
try {
    const uri = 'mongodb://localhost:27017/movie-magic-workshop'
    await mongoose.connect(uri);

    console.log('DB connected successfully');  
    
} catch (err) {
    console.error(err.message)
}


//handlebars config
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        showRating: showRating
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');


//express config
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false})); //Learn express to parse form data (on POST request)

//setup routes
app.use(routes);

//start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));
