const express = require('express');
const cors = require('cors');
const path = require('path');
require ('dotenv').config();

const { mongoose } = require('./database');

const app = express();

// settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json());

//routes
//app.use('/api/passes',require('./routes/pass.routes'));
app.use('/api/viewer', require('./routes/viewer'));
app.use('/api/functions', require('./routes/functions'));

//static files
app.use(express.static(path.join(__dirname,'public')));

//starting the server
async function main(){
    await app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}` );
}

main();