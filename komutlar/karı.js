module.exports.operate = async ({client, msg, args, author, uye, cfg, db}) => {
  if (!author.roles.cache.get(cfg.roles.botc) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(msj => msj.delete({timeout: 5000 }));
  const isimler = db.get(`isimler_${uye.id}`);
  if (!isimler) db.set(`isimler_${uye.id}`, []);
  
  if (uye.roles.cache.get(cfg.roles.unregister)) {
    const nick = args.slice(1).join(" | ");
    const tag = uye.user.username.includes(cfg.tag.taglıTag) ? cfg.tag.taglıTag : (cfg.tag.tagsızTag === "" ? cfg.tag.taglıTag : cfg.tag.tagsızTag);
    await uye.roles.remove(cfg.roles.unregister).catch();
    await uye.roles.add(cfg.roles.kız).catch();
    await uye.setNickname(`${tag} ${nick}`).catch();
    await msg.channel.send(client.duzembed(`**${uye} adlı üyeye başarıyla <@&${cfg.roles.kız[0]}> rolü verildi.**`)).catch();
    db.push(`isimler_${uye.id}`, `**${tag} ${nick}** - (<@&${cfg.roles.kız[0]}>)`);
    db.add(`kariTeyit_${author.id}`, 1);
  } else {
    await uye.roles.remove(cfg.roles.erkek).catch();
    await uye.roles.add(cfg.roles.kız).catch();
    await msg.channel.send(client.duzembed(`**${uye} adlı üyeye başarıyla <@&${cfg.roles.kız[0]}> rolü verildi.**`)).catch();
  };
};

module.exports.help = {
  name: "kız",
  alias: ["k"]
}; 
