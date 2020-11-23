module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  let evet = "";
  let hayir = "";
  if (!author.permissions.has("MANAGE_ROLES") && !author.roles.cache.get(cfg.roles.jailH)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({timeout: 5000}));
  if (uye.roles.cache.get(cfg.roles.jailH) && uye.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Jail yetkisine sahip birisini jaile atamazsın.**").then(m => m.delete({timeout: 5000}));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  if (author.roles.highest.position <= uye.roles.highest.position) return msg.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  function GaripBirAdamımEvet(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
  const reason = args.slice(1).join(" ") || "Sebep Girilmedi.";
  const sicil = db.get(`sicil_${uye.id}`) || [];
  if (!uye.roles.cache.get(cfg.roles.jail)) {
    await uye.roles.set(uye.roles.cache.has(cfg.roles.booster) ? [cfg.roles.jail, cfg.roles.booster] : [cfg.roles.jail]).catch();
    await msg.channel.send(client.nrmlembed(`${uye} adlı üye ${author} tarafından **${reason}** sebebiyle jaile atıldı.`)).then(m => m.delete({ timeout: 5000})).catch();
  } else {};
};

module.exports.help = {
  name: "jail",
  alias: ["ceza"]
};