module.exports.operate = async ({client, msg, args, author, uye, cfg}) => {
  if (!author.permissions.has("MANAGE_ROLES")) return;
  if (uye.roles.cache.get(cfg.roles.botc) || || uye.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Bir yetkiliyi unregistere atamazsın.**").then(m => m.delete({ timeout: 5000 }));
};

module.exports.help = {
  name: "unreg",
  alias: ["unregister"]
};