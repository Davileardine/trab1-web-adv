const Chat = require('../model/chat');
const User = require('../model/user');
const express = require('express');
const router = express.Router();


const createChat = async (req, res) => {
    try {
      // Cria o chat com nome
      const newChat = new Chat({
        name: req.body.name || "Nome do Chat",  // Use o nome fornecido ou um nome padrão
        participants: [], // Nenhum participante
        messages: []      // Nenhuma mensagem inicial
      });
  
      // Salva o chat no banco de dados
      const savedChat = await newChat.save();
  
      // Retorna a resposta com o chat criado
      return res.status(201).json({
        message: 'Chat criado com sucesso.',
        data: savedChat
      });
  
    } catch (error) {
      console.error('Erro ao criar chat:', error);
      return res.status(500).json({ message: 'Erro no servidor ao criar chat.' });
    }
  };
  
  router.get('/chats', async (req, res) => {
    try {
      const chats = await Chat.find();
      res.status(200).json({ message: 'Chats encontrados com sucesso.', data: chats });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor ao listar chats.' });
    }
  });
  
  // Definindo a rota POST para criar o chat
  router.post('/chats/create', createChat);
  
  

module.exports = router;
