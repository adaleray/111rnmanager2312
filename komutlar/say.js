module.exports.execute = async ({msg, author, args, client, cfg, db}) => {
  if (!author.permissions.has("MANAGE_ROLES")) return;
  let sayi = 0;
  const sayTürü = db.get(`sayTuru_${msg.guild.id}`) || "emojisiz";
  const uyeSayisi = msg.guild.memberCount;
  const tagliUye = msg.guild.members.cache.filter(u => u.user.username.includes(cfg.tag.taglıTag)).size || 0;
  const onlineUye = msg.guild.members.cache.filter(u => u.presence.status !== "offline").size;
  const boosterUye = msg.guild.members.cache.filter(u => u.roles.cache.get(cfg.roles.booster)).size || "Rol Belirtilmedi";
  const type = args[0];
  msg.guild.channels.cache.filter(c => c.type === "voice").map(k => { 
    sayi += k.members.size
  });

  if (!type) {
    if (sayTürü === "emojisiz") {
      msg.channel.send({
        embed: {
          description: `• Sunucumuzda **Toplam** \`${
          uyeSayisi
        }\` Kullanıcı bulunmaktadır.\n• Şuan **Online** \`${
          onlineUye
        }\` Kullanıcı Bulunmaktadır.\n• **Tagımızda** \`${
          tagliUye
        }\` Kullanıcı bulunmaktadır.\n• Sunucumuzda \`${
          boosterUye
        }\` tane **booster** bulunmaktadır.\n• **Ses Kanallarında** \`${
          sayi
        }\` Kullanıcı bulunmaktadır.`,
          author: {
            icon_url: msg.guild.iconURL({dynamic:true}),
            name: msg.guild.name
          },
          color: Math.floor(Math.random() * (0xFFFFFF+1)),
          timestamp: new Date()
        }
      });
    } else {
      msg.channel.send(
        `**${cfg.snc.sncIsim}: ${client.emojili(uyeSayisi)}               Online: ${client.emojili(onlineUye)}**\n\n            **${cfg.snc.tagRolIsim}: ${client.emojili(tagliUye)}**`
      );
    };
  } else if (type === "ayarla") {
    let ayar = args[1];
    if (!ayar) return;
    if (ayar === "emojili") {
      if (sayTürü === "emojili") return msg.channel.send("**Say türü zaten emojili.**").then(m => m.delete({ timeout: 5000 }));
      await db.set(`sayTuru_${msg.guild.id}`, "emojili");
      msg.channel.send({embed:{author:{icon_url:msg.guild.iconURL({dynamic:true}),name:msg.guild.name},description:`**Say türü emojili olarak değiştirildi.**`, color:Math.floor(Math.random()*(0xFFFFFF+1)), timestamp:new Date()}}).then(m => m.delete({timeout:5000}));
    } else if (ayar === "emojisiz") {
      await db.set(`sayTuru_${msg.guild.id}`, "emojisiz");
      msg.channel.send({embed:{author:{icon_url:msg.guild.iconURL({dynamic:true}),name:msg.guild.name},description:`**Say türü emojisiz olarak değiştirildi.**`, color:Math.floor(Math.random()*(0xFFFFFF+1)), timestamp:new Date()}}).then(m => m.delete({timeout:5000}));
    } else return msg.channel.send("**Say türü ayarlarken sadece**\n\n`emojili` veya `emojisiz` olarak ayarlanabilir.").then(m => m.delete({timeout:5000}));
  };
};

module.exports.help = {
  name: "say",
  alias: []
};