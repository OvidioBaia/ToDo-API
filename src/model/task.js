const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    nome: {type: String, required: true, max: 100}
});

module.exports = mongoose.model('Task', TaskSchema);