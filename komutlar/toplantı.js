module.exports.operate = async ({client, msg, args, author, cfg}) => {
  if (!cfg.sahipler.includes(author.id)) return;
  console.log(author.voice.channel);
  if (!author.voice.channel) return msg.channel.send("**Bu komutu kullanmak için bir kanalda olman gerek.**").then(msj => msj.delete({ timeout: 5000 }));
  let tip = args[0];
  var yetkililer = msg.guild.members.cache.filter(y => y.roles.cache.some(r => cfg.roles.yetkiliRoller.includes(r.id)) && y.voice.channel !== author.voice.channel.id);
  if (tip === "çek") {
    var kanal = author.voice.channel.id;
    var ytler = yetkililer.filter(yetkili => yetkili.voice.channel);
    if (ytler.size === 0) return msg.channel.send("**Seste çekilecek yetkili bulunmuyor.**").then(msj => msj.delete({ timeout: 5000 }));
    await msg.channel.send(`\`${ytler.size}\` üye kanala çekiliyor.`);
    ytler.map(user => user.voice.setChannel(kanal));
  };
};

module.exports.help = {
  name: "toplantı",
  alias: []
};