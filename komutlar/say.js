module.exports.execute = async ({msg, author, client, cfg, db}) => {
  if (!author.permissions.has("MANAGE_ROLES")) return;
  const sayTürü = db.get(`sayTuru_${msg.guild.id}`) || "emojisiz";
  const uyeSayisi = msg.guild.memberCount;
  const tagliUye = msg.guild.members.cache.filter(u => u.user.username.includes(cfg.tag.taglıTag)).size;
  const onlineUye = msg.guild.members.cache.filter(u => u.presence.status !== "offline").size;

  if (sayTürü === "emojisiz") {
    
  } else {
    msg.channel.send(
      `**${cfg.snc.sncIsim}: ${client.emojili(uyeSayisi)}               Online: ${client.emojili(onlineUye)}**\n\n                    **${cfg.snc.tagRolIsim}: ${client.emojili(tagliUye)}**`
    );
  };
};

module.exports.help = {
  name: "say",
  alias: []
};