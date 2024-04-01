const User = require("../models/User");
const Message = require("../models/Message");
const Chat = require("../models/Chat");
const path = require("path");
const moment = require("moment");

const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    const loggedUserId = req.person.id;
    const currentDateAndTime = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
    let file = null;
    let filTypeArr = null;
    let randomInRange = null;
    if (req.files?.allFiles) {
      file = req.files.allFiles;
      filTypeArr = file.name.split(".");
      randomInRange = Math.floor(Math.random() * 10) + 1;
      const filePath = path.join(
        __dirname,
        "../uploads/files/",
        `${randomInRange}_file.${filTypeArr[1]}`
      );
      await file.mv(filePath);
    }

    if (!content && !chatId) {
      return res
        .status(200)
        .send({ status: 400, message: "Invalid data passed into request" });
    }

    const newMessage = {
      content: content ? content : null,
      allFiles: file ? `${randomInRange}_file.${filTypeArr[1]}` : null,
      chatId: chatId,
      senderId: loggedUserId,
      createdAt: currentDateAndTime,
    };

    const message = await Message.create(newMessage);

    const populatedMessage = await Message.findByPk(message.id, {
      include: [
        {
          model: Chat,
          as: "msg",
          include: [
            {
              model: User,
              as: "chatsender",
              attributes: ["id", "name"],
            },
            {
              model: User,
              as: "receive",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: User,
          as: "sender",
          attributes: ["id", "name"],
        },
      ],
    });

    if (
      populatedMessage?.msg?.chatSenderId ||
      populatedMessage?.msg?.chatsender?.id
    ) {
      const messageSenderId = populatedMessage?.msg?.chatSenderId;
      const messageChatSenderId = populatedMessage?.msg?.chatsender?.id;

      if (loggedUserId !== messageSenderId) {
        populatedMessage.msg.personId = messageSenderId;
        populatedMessage.msg.chatSenderId = loggedUserId;
      }

      if (loggedUserId !== messageChatSenderId) {
        [populatedMessage.msg.chatsender, populatedMessage.msg.receive] = [
          populatedMessage.msg.receive,
          populatedMessage.msg.chatsender,
        ];
      }
      await populatedMessage.save();
    }

    await Chat.update(
      { createdAt: message.createdAt },
      { where: { id: chatId } }
    );

    return res.status(200).json({ status: 200, populatedMessage });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ status: 500, msg: "Internal Server Error!" });
  }
};

const allMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { chatId: req.params.chatId },
      include: [
        {
          model: Chat,
          as: "msg",
          include: [
            {
              model: User,
              as: "chatsender",
              attributes: ["id", "name"],
            },
            {
              model: User,
              as: "receive",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: User,
          as: "sender",
          attributes: ["id", "name"],
        },
      ],
    });

    for (let i = 0; i < messages.length; i++) {
      const messageSenderId = messages[i]?.senderId;
      const chatMessSenderId = messages[i].msg?.chatsender?.id;
      const chatSenderPersonId = messages[i]?.msg?.chatSenderId;

      if (messageSenderId !== chatSenderPersonId) {
        [messages[i].msg.chatSenderId, messages[i].msg.personId] = [
          messages[i].msg.personId,
          messages[i].msg.chatSenderId,
        ];
      }

      if (messageSenderId !== chatMessSenderId) {
        [messages[i].msg.chatsender, messages[i].msg.receive] = [
          messages[i].msg.receive,
          messages[i].msg.chatsender,
        ];
      }

      await messages[i].save();
    }

    return res.json(messages);
  } catch (error) {
    console.log(error);
    return res.status(200).json({ status: 500, msg: "Internal Server Error!" });
  }
};

module.exports = { allMessages, sendMessage };
