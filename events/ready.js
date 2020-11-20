module.exports.event = (client = global.client, { sunucu, roles } = require("../config.json"), cfg = require("../config.json"), db = require("quick.db")) => {
  
};

module.exports.help = { name: "ready" };

async function yasakliTag(client, sunucu, roles, cfg, db) {
  var yasakliTag = db.get(`yasakliTag_${sunucu}`) || [];
  
  await yasakliTag.push(cfg.yasakliTaglar);
  
  let guild = client.guilds.cache.get(sunucu);
  guild.members.cache.filter(u => {
    u.user.username.includes()
  });
}