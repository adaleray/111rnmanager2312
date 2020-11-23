module.exports.help = { name: "ready" };

class CheckRoles {
  constructor(client, db, sunucu, cfg) {
    this.client = client;
    this.db = db;
    this.sunucu = sunucu;
    this.cfg = cfg;
  }
  chatMuteler() {
    const tempmuteler = this.db.get(`tempmute_${this.sunucu}`);
    for (let muteli of tempmuteler) {
      const uye = this.client.guilds.cache.get(this.sunucu).members.cache.get(muteli.id);
      if (Date.now() >= muteli.kalkmaZamani) {
        this.db.set(`tempmute_${this.sunucu}`, tempmuteler.filter(x => x.id !== muteli.id));
        if (uye && uye.roles.cache.get(this.cfg.roles.muted)) uye.roles.remove(this.cfg.roles.muted).catch();
      } else {
        if (uye && !uye.roles.cache.get(this.cfg.roles.muted)) uye.roles.add(this.cfg.roles.muted).catch();
      };
    };
  }
  
  yasakliTagKontrol() {
    var yasakliTagKontrol = this.db.get(`yasakliTagKontrol_${this.sunucu}`) || "kapali";
    if (yasakliTagKontrol === "kapali") return;
    var yasakliTagRol = this.db.get(`yasakliTagRol_${this.sunucu}`) || this.cfg.roles.yasaklıTagRol;
    var yasakliTag = this.db.get(`yasakliTag_${this.sunucu}`) || this.cfg.tag.yasakliTaglar;
    let guild = this.client.guilds.cache.get(this.sunucu);
    yasakliTag.forEach(tag => {
    guild.members.cache.filter(gmember => gmember.user.username.includes(tag) && !gmember.roles.cache.get(yasakliTagRol))
      .map(u => u.roles.cache.get(this.cfg.roles.booster) ? u.roles.set([this.cfg.roles.booster, yasakliTagRol]) : u.roles.set([yasakliTagRol]));
    });
  }
}

module.exports.event = (client = global.client, db = require("quick.db"), cfg = require("../config.json")) => {
  setInterval(() => new CheckRoles(client, db, cfg.sunucu, cfg).chatMuteler(), client.getDate(1, "dakika"));
  setInterval(() => new CheckRoles(client, db, cfg.sunucu, cfg).yasakliTagKontrol(), client.getDate(40, "dakika"));
};