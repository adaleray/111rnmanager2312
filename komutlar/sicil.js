module.exports.operate = async ({client, msg, args, db}) => {
  const kisi = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]) || msg.guild.member(msg.author);
  let sicil = db.get(`sicil_${kisi.id}`) || [];
  let liste = sicil.length > 0 ? sicil.map((value, index) => `\`${index + 1}.\` **[${value.tip}]** ${value.zaman} tarihinde **${value.sebep}** ${msg.guild.members.cache.has(value.yetkili) ? msg.guild.members.cache.get(value.yetkili) : value.yetkili} tarafından atıldı.`).join("\n") : "Temiz!";
  /*return {
    embed: {
      author: {name: msg.guild.name, icon_url: msg.guild.iconURL({dynamic: true}) },
      color: Math.floor(Math.random() * (0xFFFFFF + 1)),
      description: `**${kisi} (\`${kisi.id}\`) adlı üyenin sicili:**\n\n`,
      timestamp: new Date()
    }
  }*/
  client.duzembed(`**${kisi} (\`${kisi.id}\`) adlı üyenin sicili:**\n\n`).then(list => {
    list.forEach(i => {
      msg.channel.send(i);
    });
  });
};

module.exports.help = {
  name: "sicil",
  alias: []
};