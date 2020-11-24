module.exports.operate = async ({msg, author}) => {
 
  if (!author.permissions.has("ADMINISTRATOR")) return;
  if (!locked[msg.channel.id]) locked[msg.channel.id] = {
    lock: false
  };
  if (locked[msg.channel.id].lock === false) {
    msg.channel.send({ embed: { description: "**Kanal başarıyla kilitlendi.**", color: Math.floor(Math.random() * (0xFFFFFF + 1)), timestamp: new Date()}});
    msg.channel.updateOverwrite(msg.guild.roles.everyone, {  
      SEND_MESSAGES: false
    });   
    locked[msg.channel.id].lock = true;
  } else {
    msg.channel.send({ embed: { description: "**Kanalın kilidi başarıyla açıldı.**", color: Math.floor(Math.random() * (0xFFFFFF + 1)), timestamp: new Date()}});
    msg.channel.updateOverwrite(msg.guild.roles.everyone, {
      SEND_MESSAGES: null
    });
    locked[msg.channel.id].lock = false;
  };
};

module.exports.help = {
  name: "kanalkilit",
  alias: ["kk"]
};