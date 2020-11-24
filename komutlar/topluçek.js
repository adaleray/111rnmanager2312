module.exports.operate = async ({client, msg, args, author, uye, cfg}) => {
  if (!author.roles.cache.get(cfg.roles.transport) && !author.permissions.has("ADMINISTRATOR")) return msg.channel.send('**Gerekli yetkiye sahip değilsin.**').then(m => m.delete({ timeout: 3000 }));
  
};

module.exports.help = {
  name: "topluçek",
  alias: []
};