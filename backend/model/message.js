const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: null},
    room:  {type: Schema.Types.ObjectId, ref: 'Chat', required: true}
});

module.exports = mongoose.model('Message', schema);