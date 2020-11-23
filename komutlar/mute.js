module.exports.operate = async ({client, msg, args, author, uye, cfg, db}, ms = require("ms")) => {
  
  if (!author.roles.cache.get(cfg.roles.muteH) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  const zaman = args[1];
  const reason = args.slice(2).join(" ") || "Sebep Girilmedi.";
  if (!ms(zaman) || !zaman) return msg.channel.send("**Geçerli bir süre girmelisin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye.roles.cache.get(cfg.roles.muted)) {
    const sicil = db.get(`sicil_${uye.id}`);
    if (!sicil) db.set(`sicil_${uye.id}`, []);
    await uye.roles.add(cfg.roles.muted).catch();
    await msg.channel.send(client.nrmlembed(`${uye} adlı üye ${author} tarafından **${reason}** sebebiyle \`${zaman}\` süresince susturulmuştur. `)).then(m => m.delete({timeout: 5000})).catch();
    await db.push(`sicil_${uye.id}`, { yetkili: author.id, tip: "mute", sebep: reason, zaman: Date.now() });
    db.add(`muteAtma_${author.id}`, 1);
  } else {
    
  };
};

module.exports.help = {
  name: "mute",
  alias: ["chatmute", "cmute", "chat-mute", "tempmute"]
};