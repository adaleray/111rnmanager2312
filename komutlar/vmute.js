const ms = require("ms");
module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.permissions.has("MANAGE_ROLES") && !author.roles.cache.get(cfg.roles.jailH)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({timeout: 5000}));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
  if (author.roles.highest.position <= uye.roles.highest.position) return msg.channel.send("**Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!**").then(x => x.delete({timeout: 5000}));
  const zaman = args[1];
  const reason = args.slice(2).join(" ") || "Sebep Girilmedi.";
  if (!ms(zaman) || !zaman) return msg.channel.send("**Geçerli bir süre girmelisin.**").then(m => m.delete({ timeout: 5000 }));
  const sicil = db.get(`sicil_${uye.id}`);
  if (!sicil) db.set(`sicil_${uye.id}`, []);
  if (!db.get(`vmute_${msg.guild.id}`)) db.set(`vmute_${msg.guild.id}`, []);
  await msg.channel.send(client.nrmlembed(`${uye} adlı üye ${author} tarafından **${reason}** sebebiyle jaile atıldı.`)).then(m => m.delete({ timeout: 5000})).catch();
  await db.push(`sicil_${uye.id}`, { yetkili: author.id, tip: "voicemute", sebep: reason, zaman: Date.now() });
  await db.add(`vMute_${author.id}`, 1);
  await db.push(`vmute_${msg.guild.id}`, { id: uye.id, kalkmaZamani: Date.now() + ms(zaman) });

};

module.exports.help = {
  name: "vmute",
  alias: ["v-mute", "voicemute", "voice-mute"]
};