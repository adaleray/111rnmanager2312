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
    const uye = this.client.guilds.cache.get(this.sunucu).members.cache.get(this.yeni);
    const nick = uye.displayName;
    if (this.eski.username === this.yeni.username) return;
    if (this.yeni.username.includes(this.tag)) {
      if (this.eski.username.includes(this.tag)) return;
      if (this.tagsız === "") return uye.roles.add(this.tagrol).catch();
      let degisecek = nick.replace(this.tagsız, this.tag);
      await uye.roles.add(this.tagrol).catch();
      await uye.setNickname(`${degisecek}`).catch();
    } else {
      if (!this.eski.username.includes(this.tag)) return;
      if (this.tagsız === "") return uye.roles.remove(this.tagrol).catch();
      let degisecek = nick.replace(this.tag, this.tagsız);
      await uye.roles.remove(this.tagrol).catch();
      await uye.setNickname(`${degisecek}`).catch();
    };
  }
}

module.exports.event = async (oldUser, newUser, client = global.client, { roles, tag, sunucu } = require("../config.json")) =>
{ 
  new otoTag(oldUser, newUser, client, roles.tagRol, tag.taglıTag, tag.tagsızTag, sunucu).tagKontrol();
};