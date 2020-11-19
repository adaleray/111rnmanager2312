module.exports.event = async (uye, client = global.client, cfg = require("../config.json"), db = require("quick.db")) => {
  
  let yasakliTag = db.get(`yasakliTag_${uye.guild.id}`) || [];
  let yasakliTagRol = db.get(`yasakliTagRol_${uye.guild.id}`) || "";
  
  if (yasakliTag.includes(uye.user.username.split(""))) {
    if (yasakliTagRol === "") {
      await uye.roles.add(cfg.roles.unregister); 
      await uye.guild.channels.cache.get(cfg.chats.kayıtChat)
      .send(
      `${uye} adlı üye yasaklı bir tag kullanıyor fakat yasaklı tag rolü girilmediği için kayıtsız permi verdim.`
    );
  } else {
      await uye.roles.add(cfg.roles.yasakliTagRol).catch();
      await uye.guild.channels.cache.get(cfg.chats.kayıtChat).send({ embed: { description: `${uye} adlı üye isminde yasaklı tag bulundurduğu için yasaklı taga atıldı.`}});
      if (uye.roles.cache.get(cfg.roles.unregister)) uye.roles.remove(cfg.roles.unregister).catch(err => console.log(err.message));
    };
  };
  
  
};

module.exports.help = { name: "guildMemberAdd" };