module.exports.event = (uye, client = global.client, cfg = require("../config.json"), db = require("quick.db")) => {
  let yasakliTag = db.get(`yasakliTag_${uye.guild.id}`) || [];
  
  if (yasakliTag.includes(uye.user.username.split(""))) {
   
  };
};

module.exports.help = { name: "guildMemberAdd" };