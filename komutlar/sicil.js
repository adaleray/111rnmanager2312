module.exports.operate = async ({client, msg, args, db}) => {
  const kisi = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]) || msg.guild.member(msg.author);
  let sicil = db.get(`sicil_${kisi.id}`) || [];
}

module.exports.help = {
  name: "sicil",
  alias: []
};