const mongoose = require('mongoose');
//Database config
const db = require('./keys').mongoURI;

function getDatabaseUri() {
    if (process.env.NODE_ENV === 'production') return db;
    if (process.env.NODE_ENV === 'test') return 'mongodb://admin123:admin123@ds229826.mlab.com:29826/social';
    return db;
}

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(getDatabaseUri(), { useNewUrlParser: true })
    .then(() => console.log('Database connected.'))
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    });