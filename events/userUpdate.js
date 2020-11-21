module.exports.help = { name: "userUpdate" };

class otoTag {
  consturctor(oldUser, newUser, client, tagrol, tag, tagsıztag, sunucu) {
    this.eski = oldUser;
    this.yeni = newUser;
    this.client = client;
    this.tagrol = tagrol;
    this.tag = tag;
    this.tagsız = tagsıztag;
    this.sunucu = sunucu;
  }
  
  async tagKontrol() {
    const uye = this.client.guilds.cache.get(this.sunucu);
    const nick = uye.displayName;
    if (this.eski.username === this.yeni.username) return;
    if (this.yeni.username.includes(this.tag)) {
      let degisecek = nick.replace(this.tagsız, this.tag);
      if (this.eski.username.includes(this.tag)) return;
      await uye.roles.add(this.tagrol).catch();
      await uye.setNickname(`${degisecek}`).catch();
    } else {
      let degisecek = nick.replace(this.tag, this.tagsız);
      if (!this.eski.username.includes(this.tag)) return;
      await uye.roles.remove(this.tagrol).catch();
      await uye.setNickname(`${degisecek}`).catch();
    };
  }
}

module.exports.event = (
  oldUser,
  newUser,
  client = global.client,
  { roles, tag, sunucu } = require("../config.json")
) => {};