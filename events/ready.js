module.exports.event = (client = global.client, { sunucu, roles } = require("../config.json"), cfg = require("../config.json"), db = require("quick.db")) => {
  
  setInterval(() => yasakliTag(client, sunucu, roles, cfg, db), client.getDate(2, "saat"));
  setInterval(() => chatEdit(client, sunucu, cfg.chats.gchat), client.getDate(30, "dakika"));
};

module.exports.help = { name: "ready" };

async function yasakliTag(client, sunucu, roles, cfg, db) {
  var yasakliTagKontrol = db.get(`yasakliTagKontrol_${sunucu}`) || "kapali";
  if (yasakliTagKontrol === "kapali") return;
  var yasakliTagRol = db.get(`yasakliTagRol_${sunucu}`) || cfg.roles.yasaklıTagRol;
  var yasakliTag = db.get(`yasakliTag_${sunucu}`) || cfg.tag.yasakliTaglar;
  let guild = client.guilds.cache.get(sunucu);
  yasakliTag.forEach(tag => {
    guild.members.cache.filter(gmember => gmember.user.username.includes(tag))
      .map(u => u.roles.cache.get(cfg.roles.booster) ? u.roles.set([cfg.roles.booster, yasakliTagRol]) : u.roles.set([yasakliTagRol]));
  });
};

async function chatEdit(client, sunucu, chat) {
  let guild = client.guilds.cache.get(sunucu);
  let channel = guild.channels.cache.get(chat);
  let sayi = 0;
  sayi = sayi + 1;
  if (sayi === 1) {
    
  }
};