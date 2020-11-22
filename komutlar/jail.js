module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.permissions.has("MANAGE_ROLES") && !author.roles.cache.get(cfg.roles.jailH)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({timeout: 5000}));
  
};

module.exports.help = {
  name: "jail",
  alias: ["ceza"]
};