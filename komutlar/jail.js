module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.permissions.has("MANAGE_ROLES") && !author.roles.cache.get(cfg.roles.jailH)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({timeout: 5000}));
  if (uye.roles.cache.get(cfg.roles.jailH) && uye.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Jail yetkisine sahip birisini jaile atamazsın.**").then(m => m.delete({timeout: 5000}));
  
  const sicil = db.get(`sicil_${uye.id}`) || [];
  
  
};

module.exports.help = {
  name: "jail",
  alias: ["ceza"]
};