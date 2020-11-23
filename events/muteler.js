module.exports.help = { name: "ready" };

class Muteler {
  constructor(client, db) {
    this.client = client;
    this.db = db;
  }
  
  chatMuteler() {
    const tempmuteler = this.db.get()
    for (let ceza of tempmuteler) {
    let uye = this.client.guilds.cache.get(this.conf.sunucuId).members.cache.get(ceza.id);
    if (Date.now() >= ceza.kalkmaZamani) {
      this.db.set("tempmute", tempmuteler.filter(x => x.id !== ceza.id));
      if (uye && uye.roles.cache.has(this.cfg.muteRolu)) uye.roles.remove(this.cfg.muteRolu).catch();
    } else {
      if (uye && !uye.roles.cache.has(this.cfg.muteRolu)) uye.roles.add(this.cfg.muteRolu).catch();
    };
  };
  }
}

module.exports.event = () => {
  return;
};