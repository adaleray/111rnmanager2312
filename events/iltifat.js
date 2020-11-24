module.exports.help = { name: "message" };

module.exports.event = async (msg, cfg = require("../config.json")) => {
  var iltifat = 0;
  if (msg.author.bot || msg.channel.id !== cfg.chats.gchat) return;
  iltifat++;
  if (iltifat >= 70) {
    msg.reply(iltifatSözleri[Math.floor(Math.random() * iltifatSözleri.length)]);
    iltifat = 0;
  };
};

var iltifatSözleri = [];