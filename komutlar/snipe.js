module.exports.operate = async ({msg, author, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return;
  let data = db.get(`snipe_${msg.guild.id}`) || { author: "Yok", content: "Yok", kanal: "Yok" };
  let a = data.author;
  let content = data.content;
  let channel = data.kanal;
  msg.channel.send({embed:{color:"BLACK",timestamp:new Date(),description:`**En Son Silinen Mesaj Bilgileri:**\n\n\`Mesajı Atan Kişi:\` <@${a}> - **(${a})**\n\`Silindiği Kanal:\` <#${channel}> - **(${channel})**\n\`Mesajın İçeriği:\` **${content}**`}})
};

module.exports.help = {
  name: "snipe",
  alias: []
};