module.exports.execute = async ({msg, author, args, client, cfg, db}) => {
  if (!author.permissions.has("MANAGE_ROLES")) return;
  let sayi = 0;
  const sayTürü = db.get(`sayTuru_${msg.guild.id}`) || "emojisiz";
  const uyeSayisi = msg.guild.memberCount;
  const tagliUye = msg.guild.members.cache.filter(u => u.user.username.includes(cfg.tag.taglıTag)).size;
  const onlineUye = msg.guild.members.cache.filter(u => u.presence.status !== "offline").size;
  const boosterUye = msg.guild.members.cache.filter(u => u.roles.cache.get(cfg.roles.booster)).size || "Yok";
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
          color: Math.floor(Math.random() * (0xFFFFFF+1))
        }
      });
    } else {
      msg.channel.send(
        `**${cfg.snc.sncIsim}: ${client.emojili(uyeSayisi)}               Online: ${client.emojili(onlineUye)}**\n\n                    **${cfg.snc.tagRolIsim}: ${client.emojili(tagliUye)}**`
      );
    };
  } else if (type === "ayarla") {
    
  };
};

module.exports.help = {
  name: "say",
  alias: []
};