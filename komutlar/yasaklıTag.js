module.exports.execute = ({client, msg, author, args, db, cfg}) => {
  if (!cfg.sahipler.includes(author.id)) return;
  
  let type = args[0];
  let rol = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[1]);
  let taglar = args.slice(2).join("").split("");
  msg.channel.send(taglar);
};

module.exports.help = {
  name: "yasaklıtag",
  alias: []
};