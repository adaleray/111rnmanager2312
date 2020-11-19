module.exports.execute = async ({client, msg, author, args, db, cfg}) => {
  if (!cfg.sahipler.includes(author.id)) return;
  
  const yasakliTag = db.get(`yasakliTag_${msg.guild.id}`) || {};
  
  const rol = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[0]);
  const taglar = args.slice(1).join("").split("");
  
  
  
};

module.exports.help = {
  name: "yasaklıtag",
  alias: []
};