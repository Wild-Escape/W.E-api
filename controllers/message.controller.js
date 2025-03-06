const Message = require("../models/Message.model");

module.exports.create = async (req, res) => {
  const sender = req.currentUserId;
  const { text, chatId } = req.body;

  const message = new Message({
    chatId,
    text,
    sender,
  });

  try {
    const newMessage = await message.save();
    console.log("entro aqui=?", newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
