const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definindo o esquema do chat
const chatSchema = new Schema({
    name: {
        type: String,
        required: true
      },

    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message' 
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', chatSchema);
