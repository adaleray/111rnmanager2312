module.exports.operate = ({msg, author, client}) => {
  if (!author.permissions.has("MANAGE_ROLES")) return;
  let sesli = 0;
  msg.guild.channels.cache.filter(c => c.type === "voice").map(k => {
    sesli += k.members.size
  });
  msg.channel.send(client.duzembed(`Seste **${sesli}** kullanıcı bulunmakta`)).then(m => m.delete({ timeout: 5000 }));
};

module.exports.help = {
  name: "sesli",
  alias: ["ses"]
};