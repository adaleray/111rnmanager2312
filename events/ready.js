module.exports.event = (client = global.client, { sunucu, roles } = require("../config.json"), cfg = require("../config.json"), db = require("quick.db")) => {
  yasakliTag(client, sunucu, roles, cfg, db);
};

module.exports.help = { name: "ready" };

async function yasakliTag(client, sunucu, roles, cfg, db) { 
  var yasakliTagKontrol = db.get(`yasakliTagKontrol_${sunucu}`) || "kapali";
  if (yasakliTagKontrol === "kapali") return;
  var yasakliTagRol = db.get(`yasakliTagRol_${sunucu}`) || cfg.roles.yasaklıTagRol;
  var yasakliTag = db.get(`yasakliTag_${sunucu}`) || cfg.tag.yasakliTaglar;
  let guild = client.guilds.cache.get(sunucu);
  yasakliTag.forEach(tag => {
    guild.members.cache.filter(gmember => gmember.user.username.includes(tag)).map(u => u.roles.cache.get(cfg.roles.booster) ? u.roles.set([cfg.roles.booster, yasakliTagRol]) : u.roles.set([yasakliTagRol]));
  });
};