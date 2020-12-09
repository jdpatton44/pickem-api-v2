import db from '../sequelize';

export const addMessage = async (req, res) => {
  const { name, message } = req.body;
  try {
    const data = await db.Message.create({
      name,
      message,
    });
    res.status(200).json({ messages: data });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const messagesPage = async (req, res) => {
  try {
    const data = await db.Message.findAll();
    res.status(200).json({ messages: data });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
