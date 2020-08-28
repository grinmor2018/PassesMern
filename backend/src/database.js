const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI 
? process.env.MONGODB_URI 
: 'mongodb://localhost/passesmern';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
//.then(db => console.log('DB is connected'))
//.catch(err => console.error(err));

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
});

module.exports = mongoose;