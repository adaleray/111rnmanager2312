class login { constructor(client) { this.client = client; } async run() { this.client.user.setStatus("idle"); console.log(this.client.user.username); } }

module.exports.event = (client = global.client, { sunucu, roles } = require("../config.json"), cfg = require("../config.json"), db = require("quick.db")) => {
  new login(client).run();
  setInterval(() => yasakliTag(client, sunucu, roles, cfg, db), client.getDate(2, "saat"));
  setInterval(() => chatEdit(client, sunucu, cfg.chats.gchat, cfg.snc.sncIsim, cfg.snc.tagRolIsim, cfg.tag.taglıTag), client.getDate(5, "saniye"));
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

async function chatEdit(client, sunucu, chat, sncIsim, tagrolIsim, tag) {
  let guild = client.guilds.cache.get(sunucu);
  let kanal = guild.channels.cache.get(chat);
  if (!kanal) return null;
  let cookie = 0;
  let sayi = guild.memberCount;
  let taglı = guild.members.cache.filter(u => u.user.username.includes(tag)).size;
  let online = guild.members.cache.filter(u => u.presence.status !== "offline").size;
    cookie = cookie + 1;
    if (cookie === 1) {
      kanal.edit({
           topic: `**${sncIsim}: ${client.emojili(sayi)} Online: ${client.emojili(online)} ${tagrolIsim}: ${client.emojili(taglı)}**`
      });
    } else if (cookie === 2) {
      kanal.edit({
          topic: `**${sncIsim}: ${client.emojili(sayi)} Online: ${client.emojili(online)} ${tagrolIsim}: ${client.emojili(taglı)}**`
      });
    } else if (cookie === 3) {
      kanal.edit({
          topic: `**${sncIsim}: ${client.emojili(sayi)} Online: ${client.emojili(online)} ${tagrolIsim}: ${client.emojili(taglı)}**`
      });
    } else if (cookie === 4) {
      cookie = 0;
      kanal.edit({
          topic: `**${sncIsim}: ${client.emojili(sayi)} Online: ${client.emojili(online)} ${tagrolIsim}: ${client.emojili(taglı)}**`
      });
    };
};