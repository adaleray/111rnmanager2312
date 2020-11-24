module.exports.operate = async ({client, msg, args, author, cfg}) => {
  if (!cfg.sahipler.includes(author.id)) return;
  let tip = args[0];
  var yetkililer = msg.guild.members.cache.filter(y => y.roles.some(r => cfg.roles.yetkiliRoller.includes(r.id)));
  if (tip === "çek") {
    var kanal = author.voice.channel.id;
    var ytler = yetkililer.filter(yetkili => yetkili.voice.channel);
    ytler.map(user => user.voice.setChannel(kanal));
    msg.channel.send()
  };
};

module.exports.help = {
  name: "toplantı",
  alias: []
};