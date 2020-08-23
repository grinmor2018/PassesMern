const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    web: String,
    user: String,
    password: String,
    email: String,
    clave: String,
    observations: String
})

module.exports = mongoose.model('Task', TaskSchema);