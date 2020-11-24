module.exports.operate = async ({client, msg, args, author, uye, cfg}) => {
  if (!author.roles.cache.get(cfg.roles.transport) && !author.permissions.has("ADMINISTRATOR")) return msg.channel.send('**Gerekli yetkiye sahip değilsin.**').then(m => m.delete({ timeout: 3000 }));
  const channel = args[1];
  if (channel) {
    var uyeler = msg.guild.members.cache.filter(uye => msg.guild.members.cache.get(uye.id).voice.channel.id === args[0])
  };
};

module.exports.help = {
  name: "topluçek",
  alias: []
};