module.exports.execute = async ({msg, author, client, cfg}) => {
  if (!author.permissions.has("MANAGE_ROLES")) return;
  let uyeSayisi = msg.guild.memberCount;
  let tagliUye = msg.guild.members.cache.filter(u => u.user.username.includes(cfg.tag.taglıTag)).size;
  let onlineUye = msg.guild.members.cache.filter(u => u.presence.status !== "offline").size;
};

module.exports.help = {
  name: "say",
  alias: []
};