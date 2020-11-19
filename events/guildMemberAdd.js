module.exports.event = async (uye, client = global.client, cfg = require("../config.json"), db = require("quick.db")) => {
  
  let yasakliTag = db.get(`yasakliTag_${uye.guild.id}`) || [];
  let yasakliTagRol = db.get(`yasakliTagRol_${uye.guild.id}`) || "";
  
  if (yasakliTag.includes(uye.user.username.split(""))) {
   await uye.roles.add(cfg.roles.yasakliTagRol).catch();
  };
};

module.exports.help = { name: "guildMemberAdd" };