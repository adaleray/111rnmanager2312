module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  const isimler = db.get(`isimler_${uye.id}`) || ["Kayıtlı isim yok !"];
  msg.channel.send(isimler.join(", "))
};
//sa abi as
module.exports.help = {
  name: "isimler",
  alias: ["kayıtlar"]
};