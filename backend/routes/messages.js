const express = require('express');
const router = express.Router();

const Chat = require('../model/chat')
const Message = require('../model/message');
const auth = require("../middleware/auth");

// router.get('/', auth, async (req, res, next) => {
//     try {
//         //const messages = await Chat.find({id: req.params._id}).populate('message');
//         const messages = await Message.find({user: {$exists: true}}).populate('user', 'name _id');
//         res.status(200).json({
//             message: 'Messages fetched successfully!',
//             data: messages
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'An error occurred!',
//             error: err
//         });
//     }
// });
router.get('/:chatId', auth, async (req, res, next) => {
    const chatId = req.params.chatId;
    try {
        const messages = await Message.find({ room: chatId })
            .populate('user', 'name _id') 
            .populate('room', '_id'); 
        res.status(200).json({
            message: 'Messages fetched successfully!',
            data: messages
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred!',
            error: err
        });
    }
});

// router.post('/save', auth, async (req, res, next) => {
//     const newMessage = new Message(req.body);
//     try {
//         const message = await newMessage.save();
//         const messageResponse = await Message
//             .findById(message._id)
//             .populate('user', 'name _id');
//         console.log(messageResponse)
//         res.status(201).json({
//             message: 'Message saved successfully!',
//             data: messageResponse
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'An error occurred!',
//             error: err
//         });
//     }
// });
router.post('/:chatId/save', auth, async (req, res, next) => {
    const chatId = req.params.chatId;
    const { content, user } = req.body; 

    const newMessage = new Message({
        content,
        user,
        room: chatId 
    });

    try {
        const message = await newMessage.save();
        console.log(newMessage,message);
        
        
        await Chat.findByIdAndUpdate(chatId, { $push: { messages: message._id } });

        const messageResponse = await Message.findById(message._id)
            .populate('user', 'name _id')
            .populate('room', '_id');
        
        res.status(201).json({
            message: 'Message saved successfully!',
            data: messageResponse
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred!',
            error: err
        });
    }
});

// router.put('/edit/:id', auth, async (req, res, next) => {
//     const id = req.params.id;
//     const content = req.body.content;
//     try {
//         const message = await Message.findOneAndUpdate({_id: id},
//             {
//                 content: content,
//                 updatedAt: Date.now()
//             },
//         );
//         res.status(200).json({
//             message: 'Message updated successfully!',
//             data: message
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'An error occurred!',
//             error: err
//         });
//     }
// });
router.put('/edit/:id', auth, async (req, res, next) => {
    const id = req.params.id;
    const content = req.body.content;

    try {
        const message = await Message.findOneAndUpdate(
            { _id: id },
            { content: content, updatedAt: Date.now() },
            { new: true } 
        );
        res.status(200).json({
            message: 'Message updated successfully!',
            data: message
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred!',
            error: err
        });
    }
});

// router.delete('/delete/:id', auth, async (req, res, next) => {
//     const id = req.params.id;
//     try {
//         const message = await Message.findByIdAndDelete(id);
//         res.status(200).json({
//             message: 'Message deleted successfully!',
//             data: id
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'An error occurred!',
//             error: err
//         });
//     }
// });
router.delete('/:chatId/delete/:id', auth, async (req, res, next) => {
    const id = req.params.id;
    try {
        const message = await Message.findByIdAndDelete(id);

        // Remove a mensagem do array de mensagens no chat
        await Chat.findByIdAndUpdate(message.room, { $pull: { messages: id } });

        res.status(200).json({
            message: 'Message deleted successfully!',
            data: id
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred!',
            error: err
        });
    }
});


module.exports = router;